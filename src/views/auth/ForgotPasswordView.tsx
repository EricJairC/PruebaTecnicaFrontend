import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { ForgotPasswordForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    usuarioEmail: ''
  }
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        reset()
    }
  })
  
  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    mutate(formData)
  }


  return (
    <>
      <div className=" flex flex-col bg-white px-3 py-6 items-center rounded-lg shadow-md">
        <h1 className="font-bold text-orange-500 text-2xl mb-1">Reestablecer password</h1>
        
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="space-y-4 w-full px-4"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold"
              htmlFor="email"
            >Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              {...register("usuarioEmail", {
                required: "El Email de registro es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.usuarioEmail && (
              <ErrorMessage>{errors.usuarioEmail.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Enviar Instrucciones'
            className="bg-orange-500 hover:bg-orange-600 w-full py-1 px-4 text-white font-semibold cursor-pointer transition-colors rounded text-center"
          />
        </form>

        <nav className=" mt-5 flex flex-col space-y-1">
          <Link
            to='/'
            className="text-center text-gray-500 font-normal"
          >
            ¿Ya tienes cuenta? <span className=" font-semibold">Iniciar Sesión</span>
          </Link>

          <Link
            to='/auth/register'
            className="text-center text-gray-500 font-normal"
          >
            ¿No tienes cuenta? <span className=" font-semibold">Crea una</span>
          </Link>
        </nav>
      </div>
    </>
  )
}