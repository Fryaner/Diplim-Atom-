import { NavLink } from "react-router-dom";
import { Button } from "../../UI/Button";
import {CircleUserRound} from "lucide-react";

const User = () => {
    return (
        <Button className="w-[24px] h-[24px]" variant="link" size="icon">
            <NavLink to="register">
                <CircleUserRound/>
            </NavLink>
        </Button>
    )
}

export default User;