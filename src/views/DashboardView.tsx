import { getUsers } from "@/api/UserAPI"
import { useAuth } from "@/hooks/useAuth"
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { useQuery } from "@tanstack/react-query"
import { Fragment } from 'react'
import { Link } from "react-router-dom"

export default function DashboardView() {

  const { data: userAuth, isLoading: authLoading } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  if (isLoading && authLoading) return 'Cargando'

  // Si tenemos información en data retorna
  if (data && userAuth) return (
    <>
      <h1 className=" text-2xl text-orange-500 font-bold">Gestión de usuarios</h1>
      <p className=" text-lg my-3 font-semibold">Bienvenido <span className="text-orange-500 font-bold">{` ${userAuth.usuarioNombre}`}</span></p>
      {data ? (
        <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 mb-24">
          {data.map((user) => (
            <li
              key={user.idUsuario}
              className="flex flex-col justify-between px-5 py-5 bg-white shadow-md rounded-md h-[250px]"
            >
              <div className="relative flex justify-center items-center">
              {(userAuth.idUsuario === user.idUsuario || userAuth.admin) && (
                <Menu as="div" className="absolute inset-0 z-10">
                  <Menu.Button className="absolute top-2 right-0 p-0 text-orange-600 hover:text-orange-700">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-6 w-6" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-10 w-36 md:w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      
                        <Menu.Item>
                          <Link
                            to={`/user/${user.idUsuario}/edit`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900 font-semibold"
                          >
                            Editar usuario
                          </Link>
                        </Menu.Item>
                      
                    </Menu.Items>
                  </Transition>
                </Menu>
                )} 
                <div className="relative z-0">
                {user.usuarioImagen ? (
                  <img
                  src={`${import.meta.env.VITE_API_URL_UPLOADS}${user.usuarioImagen}`}
    alt={`Avatar de ${user.usuarioNombre}`}
    className="w-20 h-20 object-cover rounded-full"
                />
                ):(
                  <UserCircleIcon className="h-20 w-20 text-orange-500" />
                )}
                </div>
              </div>
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <div className=" mb-2">

                  </div>
                  {(userAuth.idUsuario === user.idUsuario || userAuth.admin) ? (
                  <Link to={`/user/${user.idUsuario}/edit`}
                    className="text-gray-600 cursor-pointer block hover:underline text-2xl font-bold truncate overflow-hidden whitespace-nowrap"
                  >{user.usuarioNombre}</Link>
                  ) : (
                    <p className="text-gray-600 block text-2xl font-bold truncate overflow-hidden whitespace-nowrap"
                    >{user.usuarioNombre}</p>
                  )} 
                  
                  <p className="text-sm text-gray-400">
                    Alias: {user.usuarioAlias}
                  </p>
                  <p className="text-sm text-gray-400 truncate overflow-hidden whitespace-nowrap">
                    Email: {user.usuarioEmail}
                  </p>
                </div>
              </div>

            </li>
          ))}
        </ul>
      ) : (
        <p className=" text-center py-20">
          No hay usuarios aún {' '}
        </p>
      )}
    </>
  )
}
