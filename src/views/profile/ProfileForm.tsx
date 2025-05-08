import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { type User, type UserUpdateForm } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data } : ProfileFormProps) {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<UserUpdateForm>({ defaultValues: data })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
            navigate('/dashboard')
        }
    })

    const handleEditProfile = (formData : UserUpdateForm) => {
        mutate(formData)
    }

    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="font-bold text-orange-500 text-2xl mb-1">Mi Perfil</h1>
                <p className="text-xl font-light text-gray-500 mt-2 mb-5">Aquí puedes actualizar tu información</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" bg-white shadow-lg p-5 rounded-md w-full"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-base font-semibold"
                            htmlFor="usuarioNombre"
                        >Nombre</label>
                        <input
                            id="usuarioNombre"
                            type="text"
                            placeholder="Tu nombre"
                            className="w-full p-2 text-base border border-gray-300 rounded-md"
                            {...register("usuarioNombre", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                        />
                        {errors.usuarioNombre && (
                            <ErrorMessage>{errors.usuarioNombre.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-base font-semibold"
                            htmlFor="usuarioAlias"
                        >Alias</label>
                        <input
                            id="usuarioAlias"
                            type="text"
                            placeholder="Tu alias"
                            className="w-full p-2 text-base border border-gray-300 rounded-md"
                            {...register("usuarioAlias", {
                                required: "El alias de usuario es obligatoro",
                            })}
                        />
                        {errors.usuarioNombre && (
                            <ErrorMessage>{errors.usuarioNombre.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value='Guardar cambios'
                        className="bg-orange-500 hover:bg-orange-600 w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center"
                    />
                </form>
            </div>
        </>
    )
}