import { Link, useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import { type User, type UserUpdateForm } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser } from "@/api/UserAPI";
import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/20/solid";

type EditProjectFormProps = {
    data: UserUpdateForm,
    idUsuario: User['idUsuario']
}

export default function EditUserForm({data, idUsuario} : EditProjectFormProps) {

    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        usuarioNombre: data.usuarioNombre,
        usuarioAlias: data.usuarioAlias,
    }})

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateUser,
        
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['users']})
            queryClient.invalidateQueries({queryKey: ['editUsuario', idUsuario]})
            toast.success(data)
            navigate('/dashboard')
        }
    })

    const handleForm = (formData: UserUpdateForm) => {
        const body = new FormData();
    
        body.append("usuarioNombre", formData.usuarioNombre);
        body.append("usuarioAlias", formData.usuarioAlias);
        
        if (formData.imagen?.[0]) {
            body.append("imagen", formData.imagen[0]);
        }
    
        const data = {
            formData: body,
            idUsuario
        };
    
        mutate(data);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileType = file.type;
            if (!["image/jpeg", "image/png", "image/jpg"].includes(fileType)) {
                setError("Solo se permiten imágenes .jpg, .jpeg o .png");
                setPreview(null);
                return;
            }

            setError(null); 
            const url = URL.createObjectURL(file);
            setPreview(url); 
        }
    };

    return (
        <>
            <div className=" max-w-3xl mx-auto flex flex-col">
                <div>
                    <h1 className=" text-2xl text-orange-500 font-bold">Editar usuario</h1>
                    <p className=" text-xl font-light text-gray-500 mt-2">Llena el siguiente formulario para editar el usuario</p>
                    <nav className=" flex my-5">
                        <Link 
                            className=" bg-orange-500 hover:bg-orange-600 py-1 px-4 text-white text font-semibold cursor-pointer transition-colors rounded"
                            to='/dashboard'
                        >
                        Volver a usuarios
                        </Link>
                    </nav>
                </div>
                <form 
                    className=" bg-white shadow-lg p-5 rounded-md w-full"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <div className=" flex flex-col justify-center items-center">
                        <div className=" h-40 flex flex-col justify-center items-center">
                        {preview ? (
                            <>
                                <p className="text-sm text-gray-500 mb-1">Vista previa de la imagen:</p>
                                <img src={preview} className="w-32 h-32 object-cover rounded-md border" />
                            </>
                        ) : (
                            <div className="w-32 h-32 bg-gray-200 rounded opacity-80 flex justify-center items-center">
                              {data.usuarioImagen ? (
                                <img
                                  src={`${import.meta.env.VITE_API_URL_UPLOADS}${data.usuarioImagen}`}
                                  alt={`Avatar de ${data.usuarioNombre}`}
                                  className="w-32 h-32 object-cover rounded-full"
                            />
                            ) : (
                                <div className="w-32 h-32 bg-gray-200 rounded flex justify-center items-center">
                                    <UserCircleIcon className="h-20 w-20 text-orange-600" />
                                </div>
                            )}
                            </div>
                        )}
                        </div>
                        <input
                          className=" mt-4 font-semibold rounded file:cursor-pointer file:my-2 file:mx-3 file:bg-orange-500 file:border-none file:rounded file:text-white file:font-semibold"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          {...register("imagen" as any)}
                          onChange={handleFileChange} 
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                    <UserForm
                        register={register}
                        errors={errors}
                    />
                    
                    <div className=" flex gap-3">
                        <Link 
                            className=" text-center bg-orange-500 hover:bg-orange-600 w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded"
                            to={'/dashboard'}
                        >Cancelar</Link>
                        <input type="submit"
                            value="Guardar Cambios"
                            className=" bg-orange-500 hover:bg-orange-600 w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded" 
                        />
                        </div>
                </form>
            </div>
        </>
    )
}