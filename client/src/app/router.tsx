import { createBrowserRouter } from "react-router-dom";
import App from "./app";
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