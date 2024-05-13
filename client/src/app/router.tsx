import { createBrowserRouter } from "react-router-dom";
import Contacts from '../components/Contacts';
import Layout from "../components/layout/layout";
import App from "../app/index";
import StartPage from "../pages/startPage";
export const router = createBrowserRouter([
    {
        path: '',
        element: <App/>,
        children: [
            {
                path: 'contact',
                element: <StartPage/>, 
            }
        ]
    }
])