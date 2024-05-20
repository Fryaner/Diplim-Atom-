import { Button, Separator } from "@radix-ui/themes"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../../../authorization/api/authorizationApi";
import { useDispatch } from "react-redux";
import { isSetAuth } from "../../../../store/authSlice";

const LkLayout = () => {
    const [logoutUser] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutFunction = () => {
        dispatch(isSetAuth(false));
        localStorage.setItem('isAuth', 'false');
        localStorage.removeItem('user');
        logoutUser();
        localStorage.removeItem('token');
        navigate('/auth');
    }

    return (
        <div className="flex flex-1 gap-4 p-4">
            <nav className="flex flex-col gap-4">
                <ul className="flex flex-col gap-2">
                    <li><NavLink to="history">История покупок</NavLink></li>
                    <li><NavLink to="" className={({isActive}) => isActive ? 'px-2 underline' : ''}>Данные о пользователе</NavLink></li>
                    <li><NavLink to="sails">Купоны</NavLink></li>
                </ul>
                <div className="flex flex-col gap-2">
                    <Button color="red">Удалить аккаунт</Button>
                    <Button onClick={logoutFunction}>Выйти</Button>
                </div>
            </nav>
            <div className="flex">
                <Separator size="4" orientation="vertical"/>
            </div>
            <Outlet/>
        </div>
    )
}

export default LkLayout;