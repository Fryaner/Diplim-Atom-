import { Aperture, Circle, CircleUserRound, RussianRuble, Search, ShoppingBasket, Star, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
  } from "../../UI/Dialog/index"  
import { ScrollArea } from "../../UI/Scroll";
import _mouse from '../../mouse.jpg';


const Header = () => {
    return (
        <header>
            <div className="bg-[#8761D9]/[50%]">
                <div className="flex max-w-[1440px] m-auto justify-between py-[10px] px-[16px]">
                    <nav>
                        <ul className="flex gap-[24px]">
                            <li><NavLink to="about" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>О нас</NavLink></li>
                            <li><NavLink to="contact" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Контакты</NavLink></li>
                            <li><NavLink to="delivery" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Доставка</NavLink></li>
                            <li><NavLink to="trade" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Обмен и возврат</NavLink></li>
                        </ul>
                    </nav>
                    <div className="flex gap-[8px]">
                        <p>Доставка с 8:00 до 23:00</p>
                        <p>+7 (924) 218 33 76</p>
                    </div>

                </div>
            </div>
            <div className="flex items-center max-w-[1440px] m-auto gap-[35px] py-[21px] px-[16px]">
                <div className="flex gap-[4px]">
                    <Aperture/>
                    <h3>Fryaner</h3>
                </div>
                <div className="flex items-center gap-[16px] flex-auto">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-[150px]">
                            <div className="inline-flex bg-[#8761D9] items-center gap-[9px] rounded-md p-[16px]">
                                <div className="flex flex-col gap-[2px]">
                                    <div className="w-[16px] h-[2px] bg-[#FFFFFF]"></div>
                                    <div className="w-[16px] h-[2px] bg-[#FFFFFF]"></div>
                                    <div className="w-[16px] h-[2px] bg-[#FFFFFF]"></div>
                                </div>
                                <p className="text-[#FFFFFF] font-bold tracking-[5px]">Каталог</p>
                            </div>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="DialogContent">
                        <DialogHeader>
                            <DialogTitle>Каталог</DialogTitle>
                            <DialogDescription>На данной стианичке представлен полный каталог товаровfgfdddddddddddddd</DialogDescription>
                        </DialogHeader>
                        <nav>
                        <ScrollArea className="flex h-[300px]">
                            <ul className="flex flex-wrap gap-[8px]">
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border"> 
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>
                                <li className="border">
                                    <div className="w-[100px]">
                                        <img src={_mouse}/>
                                    </div>
                                    Игровые мышки
                                </li>

                            </ul>
                            </ScrollArea>
                        </nav>
                    </DialogContent>        
                </Dialog>
                    <div className="flex flex-auto">
                        <Input type="search" placeholder="Найти" className="rounded-r-none"/>
                        <Button className="bg-[#8761D9] rounded-l-none" type="submit"><Search/></Button>
                    </div>
                </div>
                <div className="flex items-center gap-[16px]">
                    <div className="flex gap-[24px]">
                        <Button className="w-[24px] h-[24px]" variant="link" size="icon">
                            <CircleUserRound/>
                        </Button>
                        <div className="flex gap-[16px]">
                            <Button className="w-[24px] h-[24px]" variant="link" size="icon">
                                 <Star/>
                            </Button>
                            <Button className="w-[24px] h-[24px]" variant="link" size="icon">
                                <ShoppingBasket/>
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-[3px]">
                        <p className="whitespace-nowrap">39 999</p>
                        <RussianRuble className="w-[16px] h-[16px]"/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;