import { Navigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getUserById } from "@/api/UserAPI"
import EditUserForm from "@/components/user/EditUserForm"
import Spinner from "@/components/spinner/Spinner"

export default function EditUserView() {
    // Obtenemos el id de la ruta
    const params = useParams()
    const idUsuario = Number(params.idUsuario!)
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editUsuario', idUsuario], 
        queryFn: () => getUserById(idUsuario),
        retry: false
    })
    if(isLoading) return <Spinner/>
    if(isError) return <Navigate to='/404'/>
    if(data) return <EditUserForm data={data} idUsuario={idUsuario}/>
}