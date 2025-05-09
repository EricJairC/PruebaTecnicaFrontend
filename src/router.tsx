import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/auth/LoginView'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import EditUserView from './views/user/EditUserView'
import ProfileLayout from './layouts/ProfileLayout'
import ProfileView from './views/profile/ProfileView'
import ChangePasswordView from './views/profile/ChangePasswrodView'

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/' element={<LoginView/>} index/>
                    <Route path='/auth/register' element={<RegisterView/>}/>    
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView/>}/>   
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView/>}/> 
                    <Route path='/auth/new-password' element={<NewPasswordView/>}/> 
                </Route>
                <Route element={<AppLayout />}>
                    <Route path='/dashboard' element={<DashboardView/>}/>
                    <Route path='/user/:idUsuario/edit' element={<EditUserView/>}/>
                    <Route element={<ProfileLayout/>}>
                        <Route path='/profile' element={<ProfileView/>}/>
                        <Route path='/profile/password' element={<ChangePasswordView/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}