import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import StartPage from "../pages/startPage";
import { RegisterForm } from "../modules/register";
import { AuthorizationForm } from "../modules/authorization";
import LkLayout from "../modules/lc/components/lcLayout";
import Redirect from "../modules/redirect";
import LcUser from "../modules/lc/components/lcUser";
import LcResetPassword from "../modules/lc/components/lcResetPassword";
import CatalogMouse from "../modules/catalog/components/catalogMouse";


export const router = createBrowserRouter([
    {
        path: '',
        element: <App/>,
        children: [
            {
                path: 'contact',
                element: <StartPage/>, 
            },
            {
                path: 'register',
                element: <RegisterForm/>
            },
            {
                path: 'auth',
                element: <AuthorizationForm/>
            },
            {
                path: 'lc',
                element: <Redirect><LkLayout/></Redirect>,
                children: [
                    {
                        path: '',
                        element: <LcUser/>
                    }
                ]
            }, 
            {
                path: 'resetPassword',
                element: <LcResetPassword/>
            },
            {
                path: 'test',
                element: <CatalogMouse/>
            }
        ]
    }
])