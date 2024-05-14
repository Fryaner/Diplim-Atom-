import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
  } from "../../UI/Dialog/index"  
import CatalogLists from "./catalogLists";
import { Button } from "../../UI/Button";
import { useState } from "react";
import Burger from "../../UI/Burger";


const CatalogPopUp = () => {
    const [isActive, isSetActive] = useState(false);
    return (
        <Dialog onOpenChange={() => isActive ? isSetActive(false) : isSetActive(true)}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-[150px]">
                    <div className="inline-flex bg-[#8761D9] items-center gap-[9px] rounded-md p-[16px]">
                        <Burger isActive={isActive}/>
                        <p className="text-[#FFFFFF] font-bold tracking-[5px]">Каталог</p>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogOverlay className="DialogOverlay">
                <DialogContent className="DialogContent">
                    <DialogHeader>
                        <DialogTitle>Каталог</DialogTitle>
                        <DialogDescription>На данной стианичке представлен полный перечень товаров на сайте</DialogDescription>
                    </DialogHeader>
                    <nav>
                        <CatalogLists/>
                    </nav>
                </DialogContent>   
            </DialogOverlay>     
        </Dialog>
    )
}

export default CatalogPopUp;