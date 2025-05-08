import { isAxiosError } from "axios";
import { type UpdateCurrentUserPasswordForm, type UserUpdateForm } from "../types";
import api from "@/lib/axios";


export async function updateProfile(formData : UserUpdateForm) {
    try {
        const { data } = await api.patch<string>('/auth/profile', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function changePassword(formData : UpdateCurrentUserPasswordForm) {
    try {
        const { data } = await api.post<string>('/auth/updated-password', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}