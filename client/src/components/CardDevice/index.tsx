import { FC } from "react";
import { Button } from "../../UI/Button";
import { RussianRuble, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
interface CardDeviceProps {
    id: number;
    model?: string;
    brand?: string;
    type?: string;
    image?: string;
    descriptionImage?: string;
    rating?: number;
    price: number;
    handlerAddDevice: (deviceId: number, devicePrice: number) => void;
}


const CardDevice:FC<CardDeviceProps> = ({
    id, 
    model, 
    image, 
    descriptionImage,
     rating = 5, 
     price, 
     brand, 
     type,
    handlerAddDevice,}) => {

    const starElements = Array.from({ length: 5 }, (_, index) => index < rating);

    return (
            <div className="flex flex-col w-[31%] max-lg:w-[48%]  max-md:w-full border p-4 gap-4 rounded justify-between">
                <div>
                    <div className="relative">
                        <Link to={`/device/${id}`}>
                            <img src={`http://localhost:8000/${image}`} alt={descriptionImage}/>
                            </Link>
                        <Button className="w-[24px] h-[24px] absolute top-0 right-0" variant="link" size="icon">
                            <Star className="hover:fill-[orange]"/>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link to={`/device/${id}`}>
                            <p className="font-bold">{type}/{model}/{brand}</p>
                            </Link>
                        <p className="flex items-center">{price} <RussianRuble className="w-4 h-4"/></p>
                        <div className="flex">
                        {starElements.map((isFilled, index) => (
                            <Star key={index} className={isFilled ? "fill-[orange]" : "fill-[white]"} />
                            ))}
                        </div>
                    </div>
                </div>
                <Button onClick={() => handlerAddDevice(id, price)} className="bg-[#5129A5] flex gap-2 items-center">
                    <p>Добавить в корзину</p>
                    <ShoppingBag className="w-5"/>
                </Button>
            </div>
    )
}

export default CardDevice;