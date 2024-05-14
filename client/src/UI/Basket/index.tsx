import { Button } from "../../UI/Button";
import {ShoppingBasket} from "lucide-react";

const Basket = () => {
    return (
        <Button className="w-[24px] h-[24px]" variant="link" size="icon">
            <ShoppingBasket/>
        </Button> 
    )
}

export default Basket;