import { Button } from "../../UI/Button";
import {Star} from "lucide-react";

const Favorite = () => {
    return (
        <Button className="w-[24px] h-[24px]" variant="link" size="icon">
            <Star/>
        </Button>
    )
}

export default Favorite;