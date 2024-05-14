import {
    Search, 
    ShoppingBasket,
    X,
    } from "lucide-react";
import { NavLink } from "react-router-dom";
import InputSearch from "../../UI/InputSearch";
import { Button } from "../../UI/Button";
import Burger from "../../UI/Burger";
import Logo from "../../UI/Logo";
import Favorite from "../../UI/Favorite";
import User from "../../UI/User";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/themes";
import HeaderTop from "./headerTop";

const Mobileheader = () => {
    const [isActiveMenu, isSetActiveMenu] = useState(true);
    const [isActiveSearch, isSetActiveSearch] = useState(false);

    useEffect(() => {
        if (isActiveMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [isActiveMenu]);

    return (
        <header>
            <div className="flex justify-between items-center bg-[#8761D9]/[50%] px-[16px]">
                <Button className="p-[0]" variant="link" onClick={() => isActiveMenu ? isSetActiveMenu(false) : isSetActiveMenu(true)}>
                    <Burger isActive={isActiveMenu}/>
                </Button>
                <Logo/>
                <Button className="w-[24px] h-[24px]" variant="link" size="icon">
                    <ShoppingBasket/>
                </Button> 
            </div>
                <div className={`absolute bg-white w-[100%] h-lvh left-[0px] ease-in duration-300 flex flex-col gap-[16px] ${isActiveMenu ? "" : 'left-[-1000px]'}`}>
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
                            <div className="flex gap-[16px]">                         
                                <User/>
                                <Favorite/>
                            </div>
                            <Button className="w-[24px] h-[24px] p-0" onClick={() => isSetActiveSearch(true)} variant="link">
                                <Search/>
                            </Button>
                        </div>
                        }
                    </nav>
                    <nav className="flex flex-col gap-[16px] px-[16px]">
                        <h3 className="font-bold">Каталог</h3>
                        <ul className="flex flex-col gap-[8px]">
                            <Separator size="4"/>
                            <li><NavLink to="">Игровые шыки</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink to="">Клавиатуры</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink to="">Корпуса</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink to="">Оперативная память</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink to="">Блок питания</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink to="">Видеокарта</NavLink></li>
                            <Separator size="4"/>
                            <li><NavLink to="">Мониторы</NavLink></li>
                        </ul>
                    </nav>
                    <nav>
                        <HeaderTop/>
                    </nav>
                </div>
        </header>
    )
}

export default Mobileheader;