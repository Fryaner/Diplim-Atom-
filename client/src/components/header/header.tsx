import { RussianRuble} from "lucide-react";
import CatalogPopUp from "./catalogPopUp";
import MediaQuery from 'react-responsive'
import InputSearch from "../../UI/InputSearch";
import Logo from "../../UI/Logo";
import Favorite from "../../UI/Favorite";
import Basket from "../../UI/Basket";
import User from "../../UI/User";
import Mobileheader from "./mobileHeader";
import HeaderTop from "./headerTop";

const Header = () => {
    return (
        <>
            <MediaQuery minWidth={768}>
                <header>
                    <HeaderTop/>
                    <div className="flex items-center max-w-[1440px] m-auto gap-[35px] py-[21px] px-[16px]">
                        <div className="flex gap-[4px]">
                            <Logo/>
                        </div>
                        <div className="flex items-center gap-[16px] flex-auto">
                            <CatalogPopUp/>
                            <InputSearch/>
                        </div>
                        <div className="flex items-center gap-[16px]">
                            <div className="flex gap-[24px]">
                                <User/>
                                <div className="flex gap-[16px]">
                                    <Favorite/>
                                    <Basket/>
                                </div>
                            </div>
                            <div className="flex items-center gap-[3px]">
                                <p className="whitespace-nowrap">39 999</p>
                                <RussianRuble className="w-[16px] h-[16px]"/>
                            </div>
                        </div>
                    </div>
                </header>
            </MediaQuery>
            <MediaQuery maxWidth={768}>
                <Mobileheader/>
            </MediaQuery>
        </>
    )
}

export default Header;