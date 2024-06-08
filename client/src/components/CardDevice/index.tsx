import { FC } from "react";
import { Button } from "../../UI/Button";
import { RussianRuble, ShoppingBasket, Star } from "lucide-react";
import { NavLink } from "react-router-dom";
interface CardDeviceProps {
    model?: string;
    brand?: string;
    type?: string;
    image?: string;
    descriptionImage?: string;
    rating?: number;
    price?: number;
}


const CardDevice:FC<CardDeviceProps> = ({model, image, descriptionImage, rating = 5, price , brand, type}) => {

    const starElements = Array.from({ length: 5 }, (_, index) => index < rating);

    return (
            <div className="flex flex-col w-[23%] max-xl:w-[31%] border p-4 gap-4 rounded justify-between">
                <div>
                    <div className="relative">
                        <NavLink to="">
                            <img src={`http://localhost:8000/${image}`} alt=""/>
                            </NavLink>
                        <Button className="w-[24px] h-[24px] absolute top-0 right-0" variant="link" size="icon">
                            <Star className="hover:fill-[orange]"/>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <NavLink to="">
                            <p className="font-bold">{type}/{model}/{brand}</p>
                            </NavLink>
                        <p className="flex items-center">{price} <RussianRuble className="w-4 h-4"/></p>
                        <div className="flex">
                        {starElements.map((isFilled, index) => (
                            <Star key={index} className={isFilled ? "fill-[orange]" : "fill-[white]"} />
                            ))}
                        </div>
                    </div>
                </div>
                <Button className="bg-[#5129A5] flex gap-2 items-center">
                    <p>Добавить в корзину</p>
                    <ShoppingBasket className="w-5"/>
                </Button>
            </div>
    )
}

export default CardDevice;