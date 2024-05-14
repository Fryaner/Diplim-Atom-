import { NavLink } from "react-router-dom";
import {Aperture} from "lucide-react";

const Logo = () => {
    return (
        <NavLink to="/" className="flex gap-[4px]">
            <Aperture/>
            Fryaner
        </NavLink>
    )
}

export default Logo;