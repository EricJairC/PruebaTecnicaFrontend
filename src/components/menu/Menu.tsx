import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        navigate('/')
    }

    return (
        <>
            <header className="w-full flex justify-center mt-6 z-30 relative">
                <div className="w-11/12 md:w-10/12 lg:w-8/12 lg:min-w-[750px] flex justify-between items-center">
                    <Link to="/dashboard" className="text-orange-500 font-bold text-2xl">
                        Usuarios
                    </Link>
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link className="font-semibold text-gray-800 hover:text-colorPrimario" to="/profile">
                            Mi Perfil
                        </Link>
                        <span
                            className="font-semibold text-gray-800 hover:text-orange-600 cursor-pointer"
                            onClick={logout}
                        >
                            Cerrar Sesión
                        </span>
                    </nav>
                </div>
            </header>
        </>
    )
}
