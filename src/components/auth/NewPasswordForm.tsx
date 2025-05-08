import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

export default function NewPasswordForm({token} : NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        usuarioPassword: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/')
        }
    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('usuarioPassword');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="mt-3 space-y-4 w-full px-3"
                noValidate
            >

                <div className="flex flex-col gap-2">
                    <label
                        className="text-base font-semibold"
                    >Password nuevo</label>

                    <input
                        id="usuarioPassword"
                        type="password"
                        placeholder="Password nuevo"
                        className="w-full p-2 text-base border border-gray-300 rounded-md"
                        {...register("usuarioPassword", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.usuarioPassword && (
                        <ErrorMessage>{errors.usuarioPassword.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="text-base font-semibold"
                    >Confirmación de password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirma tu password"
                        className="w-full p-2 text-base border border-gray-300 rounded-md"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Establecer password'
                    className=" bg-orange-500 hover:bg-orange-600 w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center"
                />
            </form>
        </>
    )
}