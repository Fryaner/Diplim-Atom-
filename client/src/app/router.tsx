import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import StartPage from "../pages/startPage";
import { RegisterForm } from "../modules/register";
import { AuthorizationForm } from "../modules/authorization";
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
            }
        ]
    }
])