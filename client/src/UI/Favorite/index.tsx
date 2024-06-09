import {Star} from "lucide-react";
import { Link } from "react-router-dom";
const Favorite = () => {
    return (
        <div className="h-[24px]">
            <Link to="favorite"><Star/></Link>
        </div>
    )
}

export default Favorite;