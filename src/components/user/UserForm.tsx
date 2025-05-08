import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import { type UserUpdateForm } from '@/types/index';

type UserFormProps = {
    register: UseFormRegister<UserUpdateForm>
    errors: FieldErrors<UserUpdateForm>
}

export default function UserForm({ errors, register }: UserFormProps) {
    return (
        <>
            <div className="mb-3 space-y-2">
                <label htmlFor="usuarioNombre" className="text-base font-semibold">
                    Nombre del usuario
                </label>
                <input
                    id="usuarioNombre"
                    className="w-full p-2 text-base border border-gray-200 rounded-md"
                    type="text"
                    placeholder="Ej. Roberto"
                    {...register("usuarioNombre", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />

                {errors.usuarioNombre && (
                    <ErrorMessage>{errors.usuarioNombre.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-3 space-y-2">
                <label htmlFor="usuarioAlias" className="text-base font-semibold">
                    Alias del usuario
                </label>
                <input
                    id="usuarioAlias"
                    className="w-full p-2 text-base border border-gray-200 rounded-md"
                    type="text"
                    placeholder="Ej. Pepito"
                    {...register("usuarioAlias", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.usuarioAlias && (
                    <ErrorMessage>{errors.usuarioAlias.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
