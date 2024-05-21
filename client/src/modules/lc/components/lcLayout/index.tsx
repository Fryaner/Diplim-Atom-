import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../../../authorization/api/authorizationApi";
import { useDispatch } from "react-redux";
import { isSetAuth } from "../../../../store/authSlice";
import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, LogOut, Trash2 } from "lucide-react";
import { Button } from "../../../../UI/Button";
import { Separator } from "../../../../UI/Separator";
import MediaQuery from "react-responsive";

const LkLayout = () => {
    const [logoutUser] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isActiveMenuLc, isSetActiveMenuLc] = useState(false);
    const logoutFunction = () => {
        dispatch(isSetAuth(false));
        localStorage.setItem('isAuth', 'false');
        localStorage.removeItem('user');
        logoutUser();
        localStorage.removeItem('token');
        navigate('/auth');
    }

    return (
        <>
        <MediaQuery maxWidth={768}>
            <div className="flex flex-1 w-full bg-[#E6E6E6] py-2 px-4">
                <Button onClick={() => isActiveMenuLc ? isSetActiveMenuLc(false) : isSetActiveMenuLc(true)} variant="link" className="hover:no-underline no-underline flex flex-1 justify-between p-0 h-full">            
                    <p>Личный кабинет</p>
                    {isActiveMenuLc ? <ChevronUp/> : <ChevronDown/>}
                </Button>
            </div>
        </MediaQuery>
        <div className="flex gap-4 p-4 max-md:p-0 max-md:flex-col">
        <MediaQuery minWidth={768}>
            <nav className="flex flex-col justify-between gap-4">
                <ul className="flex flex-col gap-2">
                <li>
                        <NavLink to="history" className={({isActive}) => isActive ? 'ml-2 flex' : 'flex'}>
                            <ChevronRight className="w-5"/>
                            История покупок
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="" className={({isActive}) => isActive ? 'ml-2 flex' : 'flex'}>
                            <ChevronRight className="w-5"/>
                            Данные о пользователе
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="syls" className={({isActive}) => isActive ? 'ml-2 flex' : 'flex'}>
                            <ChevronRight className="w-5"/>
                            Купоны
                        </NavLink>
                    </li>
                </ul>
                <div className="flex flex-col gap-2">
                    <Button className="bg-[red] flex gap-2">Удалить аккаунт<Trash2 className="w-5"/></Button>
                    <Button className="bg-[#5129A5] flex gap-2" onClick={logoutFunction}>Выйти<LogOut className="w-5"/></Button>
                </div>
            </nav>
        </MediaQuery> 
        <MediaQuery maxWidth={768}>
        {
        isActiveMenuLc ?
            <nav className="flex flex-col gap-4 max-md:bg-[#F6F6F6] max-md:p-4 max-md:border-b-4">
                <ul className="flex flex-col gap-2">
                <li>
                        <NavLink to="history" className={({isActive}) => isActive ? 'ml-2 flex' : 'flex'}>
                            <ChevronRight className="w-5"/>
                            История покупок
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="" className={({isActive}) => isActive ? 'ml-2 flex' : 'flex'}>
                            <ChevronRight className="w-5"/>
                            Данные о пользователе
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="syls" className={({isActive}) => isActive ? 'ml-2 flex' : 'flex'}>
                            <ChevronRight className="w-5"/>
                            Купоны
                        </NavLink>
                    </li>
                </ul>
                <div className="flex flex-col gap-2">
                <Button className="bg-[red] flex gap-2">Удалить аккаунт<Trash2 className="w-5"/></Button>
                    <Button className="bg-[#5129A5] flex gap-2" onClick={logoutFunction}>Выйти<LogOut className="w-5"/></Button>
                </div>
            </nav>
        :<></>
        }
        </MediaQuery>     
            <div className="flex">
                <Separator className="h-full" orientation="vertical"/>
            </div>
            <div className="p-4 flex-1">
                    <Outlet/> 
            </div>
        </div>
        </>
    )
}

export default LkLayout;