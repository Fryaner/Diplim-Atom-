import { Button } from "../../UI/Button";
import {CircleUserRound} from "lucide-react";

const User = () => {
    return (
        <Button className="w-[24px] h-[24px]" variant="link" size="icon">
            <CircleUserRound/>
        </Button>
    )
}

export default User;