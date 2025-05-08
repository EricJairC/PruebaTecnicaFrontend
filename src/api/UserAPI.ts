import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { userDashboardArraySchema, userDashboardSchema, type User } from "../types"

export async function getUsers(){
    try {
        const { data } = await api.get('/auth')
        // Validamos que concuerda con nuestro schema
        const response = userDashboardArraySchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        // Forzamos a que el error sea de axios
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) 
        }       
    }
}

// Obtiene un proyecto por id
export async function getUserById(idUsuario : User['idUsuario']){
    try {
        const { data } = await api.get(`/auth/user/${idUsuario}`)
        const response = userDashboardSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        // Forzamos a que el error sea de axios
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) 
        }       
    }
}

type UserAPIType = {
    formData: FormData;
    idUsuario: number;
};

export async function updateUser({ formData, idUsuario }: UserAPIType) {
    try {
        const { data } = await api.patch<string>(
            `/auth/user/${idUsuario}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}