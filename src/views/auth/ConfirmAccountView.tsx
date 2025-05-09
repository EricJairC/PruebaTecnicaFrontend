import { confirmAccount } from "@/api/AuthAPI";
import type{ ConfirmToken } from "@/types/index";
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    }
  })

  const [token, setToken] = useState<ConfirmToken['token']>('')

  const handleChange = (token : ConfirmToken['token']) => {
    setToken(token)
  }

  const handleComplete = (token : ConfirmToken['token']) => {
    mutate({token})
  }

  return (
    <>
      <div className=" flex flex-col bg-white px-3 py-6 items-center rounded-lg shadow-md">
        <h1 className="font-bold text-orange-500 text-2xl mb-1">Confirma tu Cuenta</h1>
        <p className="font-light text-lg mb-3">
          Ingresa el código que recibiste por {''}
          <span className=" text-orange-500 font-bold"> e-mail</span>
        </p>
        <form
          className="space-y-4 w-full px-4"
        >
          <div className=" flex justify-center gap-3">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
              <PinInputField className=" w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
              <PinInputField className=" w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
              <PinInputField className=" w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
              <PinInputField className=" w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
              <PinInputField className=" w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
              <PinInputField className=" w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            </PinInput>
          </div>
        </form>
      </div>
    </>
  )
}