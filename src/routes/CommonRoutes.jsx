import { lazy } from 'react';

// project imports
import Loadable from 'component/Loadable';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const CommonRoutes = {
    path: '/',
    children: [
        {
            path: '/pages/login/login',
            element: <AuthLogin />
        },
        {
            path: '/pages/register/register',
            element: <AuthRegister />
        }
    ]
};

export default CommonRoutes;
