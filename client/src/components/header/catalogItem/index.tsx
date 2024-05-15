import {Link } from "react-router-dom";
import { FC } from "react";

interface CatalogSectionProps {
    title: string;
    image: string;
}

const CatalogSection:FC<CatalogSectionProps> = ({image, title}) => {
    return (
        <li className="flex flex-col gap-[8px] w-[21%]">
            <Link to="">
                <img className="hover:opacity-[0.5] p-[10px] w-[100%] h-[150px] object-contains rounded-md border-2 border-[#8761D9]" src={image} alt={title}/>
            </Link>
            <Link to="" className="text-center hover:text-[#8761D9]">{title}</Link>
        </li>
    )
}

export default CatalogSection;