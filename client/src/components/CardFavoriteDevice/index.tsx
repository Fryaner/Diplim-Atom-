import { FC } from "react";
import { Button } from "../../UI/Button";
import { RussianRuble, ShoppingBag, Star } from "lucide-react";

interface CardFavoriteDeviceProps {
    id: number;
    model: string;
    raiting: number;
    image: string;
    price: number;
}

const CardFavoriteDevice:FC<CardFavoriteDeviceProps> = ({id, model, raiting, image, price}) => {
    return (
        <div>
            <div className="w-[33%] relative">
                <img src={`http://localhost:8000/${image}`} alt={model}/>
                <Star className="absolute top-0 right-0"/>
            </div>
            <div>
                <div>
                    <p>{model}</p>
                    <p>{price}<RussianRuble/></p>   
                </div>
                <Button>Добавить в корзину<ShoppingBag/></Button>
            </div>
        </div>
    )
}

export default CardFavoriteDevice;