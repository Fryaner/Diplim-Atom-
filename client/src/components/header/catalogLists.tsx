import { FC } from "react";
import { ScrollArea } from "../../UI/Scroll";
import CatalogSection from "./catalogItem";
import {    
    Corpus,
    Keybourd,
    Monitor,
    Ram,
    Videocarta,
    Mouse,
    Block
} from '../../assets/images/index';

const ListsNameProducts = [
    {id: 1,   name: 'Игровая мышка', image: Mouse},
    {id: 2,   name: 'Монитор', image: Monitor},
    {id: 3,   name: 'Клавиатура', image: Keybourd},
    {id: 4,   name: 'Блок питания', image: Block},
    {id: 5,   name: 'Корпус', image: Corpus},
    {id: 6,   name: 'Оперативная память', image: Ram},
    {id: 7,   name: 'Видеокарта', image: Videocarta},
]

const CatalogLists:FC = () => {
    return (
            <ScrollArea className="h-[300px]">
                <ul className="flex flex-wrap gap-[32px]">
                    {ListsNameProducts.map((item) =>  <CatalogSection title={item.name} key={item.id} image={item.image}/>)}
                </ul>
            </ScrollArea>
    )
}

export default CatalogLists;