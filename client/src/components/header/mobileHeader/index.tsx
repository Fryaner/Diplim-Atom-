import {
    CircleUserRound,
    Home,
    Search, 
    ShoppingBasket,
    Star,
    X,
    } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import InputSearch from "../../../UI/InputSearch";
import { Button } from "../../../UI/Button";
import Burger from "../../../UI/Burger";
import Logo from "../../../UI/Logo";
import Favorite from "../../../UI/Favorite";
import User from "../../../UI/User";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/themes";
import Basket from "../../../UI/Basket";

const Mobileheader = () => {
    const [isActiveMenu, isSetActiveMenu] = useState(false);
    const [isActiveSearch, isSetActiveSearch] = useState(false);

    useEffect(() => {
        if (isActiveMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [isActiveMenu]);

    return (
        <div>
        <div>
            <div className="flex justify-between items-center bg-[#8761D9]/[50%] px-[16px]">
                <Button className="p-[0]" variant="link" onClick={() => isActiveMenu ? isSetActiveMenu(false) : isSetActiveMenu(true)}>
                    <Burger isActive={isActiveMenu}/>
                </Button>
                <Logo/>
                <Button className="w-[24px] h-[24px]" variant="link" size="icon">
                    <Basket/>
                </Button> 
            </div>
                <div className={`z-10 overflow-auto absolute bg-white w-[100%] h-lvh ease-in duration-300 flex flex-col gap-[16px] ${isActiveMenu ? "left-[0px]" : 'left-[-1000px]'}`}>
                    <nav className="bg-[#F7F7F7] flex justify-between py-[16px] items-center px-[16px]">
                        {
                        isActiveSearch ?  
                        <div className="flex flex-1 gap-[16px] items-center">
                            <InputSearch/>
                            <Button className="w-[24px] h-[24px] p-0" onClick={() => isSetActiveSearch(false)} variant="link">
                                <X/>
                            </Button>
                        </div> : 
                        <div className="flex flex-1 justify-between">
                            <div className="flex gap-2">                         
                                <User/>
                                <Favorite/>
                            </div>
                            <Button className="w-[24px] h-[24px] p-0" onClick={() => isSetActiveSearch(true)} variant="link">
                                <Search/>
                            </Button>
                        </div>
                        }
                    </nav>
                    <nav className="flex flex-col gap-[16px] px-[16px] flex-1">
                        <h3 className="font-bold">Каталог</h3>
                        <ul className="flex flex-col gap-[8px] flex-1 flex-1">
                            <Separator size="4"/>
                            <li><NavLink onClick={() => isSetActiveMenu(false)} to="">Игровые шыки</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink onClick={() => isSetActiveMenu(false)} to="">Клавиатуры</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink onClick={() => isSetActiveMenu(false)} to="">Корпуса</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink onClick={() => isSetActiveMenu(false)} to="">Оперативная память</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink onClick={() => isSetActiveMenu(false)} to="">Блок питания</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink onClick={() => isSetActiveMenu(false)} to="">Видеокарта</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink onClick={() => isSetActiveMenu(false)} to="">Мониторы</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink onClick={() => isSetActiveMenu(false)} to="">Охлаждение (-)</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink onClick={() => isSetActiveMenu(false)} to="">Микрофон (-)</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink onClick={() => isSetActiveMenu(false)} to="">Коврики (-)</NavLink></li>
                            <Separator size="4"/>
                        </ul>
                    </nav>
                    <nav>
                    <div className="bg-[#8761D9]/[50%]">
        <div className="flex max-md:flex-col max-w-[1440px] m-auto justify-between py-[10px] px-[16px]">
            <nav>
                <ul className="flex gap-[24px] max-md:flex-col  max-md:gap-[16px]">
                    <li><NavLink onClick={() => isSetActiveMenu(false)} to="about" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>О нас</NavLink></li>
                    <li><NavLink onClick={() => isSetActiveMenu(false)} to="contact" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Контакты</NavLink></li>
                    <li><NavLink onClick={() => isSetActiveMenu(false)} to="delivery" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Доставка</NavLink></li>
                    <li><NavLink onClick={() => isSetActiveMenu(false)} to="trade" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Обмен и возврат</NavLink></li>
                </ul>
            </nav>
            <div className="flex max-md:flex-col gap-[16px]">
                <p className="text-zinc-600">Доставка с 8:00 до 23:00</p>
                <p>+7 (924) 218 33 76</p>
            </div>
        </div>
    </div>  
                    </nav>
                </div>
        </div>
        <div className="flex w-[100%] fixed bottom-[0px] bg-white border-t justify-around py-4">
                        <div>
                            <Link className="flex flex-col items-center gap-[3px]" to="/">
                                <Home/>
                                <p>Главная</p>
                            </Link>
                        </div>
                        <div>
                            <Link className="flex flex-col items-center gap-[3px]" to="/">
                                <Search/>
                                <p>Поиск</p>
                            </Link>
                        </div>
                        <div>
                            <Link className="flex flex-col items-center gap-[3px]" to="basket">
                                <Basket/>
                                <p>Корзина</p>
                            </Link>
                        </div>
                        <div>
                            <Link className="flex flex-col items-center gap-[3px]" to="/">
                                <Star/>
                                <p>Избранное</p>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center gap-[3px]">
                            <Link className="flex flex-col items-center gap-[3px]" to="/lc">
                                <CircleUserRound/>
                                <p>Профиль</p>
                            </Link>
                        </div>
        </div>
        </div>
    )
}

export default Mobileheader;