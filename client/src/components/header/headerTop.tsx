import { NavLink } from "react-router-dom";

const HeaderTop = () => {
    return (
        <div className="bg-[#8761D9]/[50%]">
        <div className="flex max-md:flex-col max-w-[1440px] m-auto justify-between py-[10px] px-[16px]">
            <nav>
                <ul className="flex gap-[24px] max-md:flex-col  max-md:gap-[16px]">
                    <li><NavLink to="about" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>О нас</NavLink></li>
                    <li><NavLink to="contact" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Контакты</NavLink></li>
                    <li><NavLink to="delivery" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Доставка</NavLink></li>
                    <li><NavLink to="trade" className={({isActive}) => isActive ? 'font-bold' : 'text-[black]'}>Обмен и возврат</NavLink></li>
                </ul>
            </nav>
            <div className="flex max-md:flex-col gap-[16px]">
                <p className="text-zinc-600">Доставка с 8:00 до 23:00</p>
                <p>+7 (924) 218 33 76</p>
            </div>
        </div>
    </div>
    )
}

export default HeaderTop;