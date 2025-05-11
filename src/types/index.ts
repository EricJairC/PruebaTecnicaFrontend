import { z } from 'zod'

/* Creación de usuarios */
const authSchema = z.object({
    usuarioNombre: z.string(),
    usuarioAlias: z.string(),
    usuarioEmail: z.string().email(),
    current_password: z.string(),
    usuarioPassword: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

// Usuarios
export const userSchema = authSchema.pick({
    usuarioNombre: true,
    usuarioEmail: true,
    usuarioAlias: true
}).extend({
    idUsuario: z.number(),
    admin: z.boolean()
})

export const userDashboardSchema = authSchema.pick({
    usuarioNombre: true,
    usuarioAlias: true,
    usuarioEmail: true,
}).extend({
    idUsuario: z.number(),
    usuarioEstado: z.string().nullable(),
    usuarioConectado: z.string().nullable(),
    usuarioUltimaConexion: z.string().nullable(),
    usuarioImagen: z.string().nullable()
})

export const userDashboardArraySchema = z.array(userDashboardSchema);

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'usuarioEmail' | 'usuarioPassword'>

export type UserRegistrationForm = Pick<Auth, 'usuarioNombre' | 'usuarioAlias' | 'usuarioEmail' | 'usuarioPassword' | 'password_confirmation'>

export type ConfirmToken = Pick<Auth, 'token'>

export type ForgotPasswordForm = Pick<Auth, 'usuarioEmail'>

export type NewPasswordForm = Pick<Auth, 'usuarioPassword' | 'password_confirmation'>

export type User = z.infer<typeof userSchema>

export type UserUpdateForm = {
    usuarioNombre: string;
    usuarioAlias: string;
    imagen?: FileList; 
    imagenActual?: string | null;
    usuarioImagen?: string | null;
  }

export type UpdateCurrentUserPasswordForm = Pick<Auth, 'usuarioPassword' | 'current_password' | 'password_confirmation'>

