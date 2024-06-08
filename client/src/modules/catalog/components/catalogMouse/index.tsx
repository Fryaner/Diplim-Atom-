import { Spinner } from "@radix-ui/themes"
import { Input } from "../../../../UI/Input"
import { Separator } from "../../../../UI/Separator"
import CardDevice from "../../../../components/CardDevice"
import { 
    useGetMouseDevicesQuery, 
    useGetBrandDevicesQuery,
    useGetTypeDevicesQuery
 } from "../../api/catalogApi"

const CatalogMouse = () => {
    const {data, isLoading, isError} = useGetMouseDevicesQuery();
    const {data: dataBrands} = useGetBrandDevicesQuery();
    const {data: dataTypes} = useGetTypeDevicesQuery();
    return (
        <div className="flex gap-4 px-4">
            <div className="w-[20%]">
                <div>
                    <div>
                        <h4>Фильтрация</h4>
                        <Input type="text" placeholder="Бренд"/>
                        <div className="flex">
                        <Input type="text" placeholder="От"/>
                        <p>-</p>
                        <Input type="text" placeholder="До"/>
                        </div>
                        <Input type="text" placeholder="Цвет"/>
                    </div>
                    <div>
                        <h4>Сортировка</h4>
                        <Input type="text" placeholder="Бренд"/>
                    </div>
                </div>
            </div>
            <div>
                <Separator orientation="vertical" className="h-full"/>
            </div>
            <div className="w-full">
                <h3>Игровые мышки</h3>
                <div className="flex flex-wrap gap-4">
                    {isLoading ? <Spinner/> : isError ? <p>Err</p> : data?.rows.map((device) => 
                        dataBrands?.filter((brand) => brand.id === device.brandId).map((brand) => 
                            dataTypes?.filter((types) => types.id === device.typeId).map((types) => 
                            <CardDevice rating={device.rating} image={device.image} model={device.model} price={device.price} brand={brand.name} type={types.name}/>
                        )
                        )
                    )}
                </div>  
            </div>
        </div>
    )
}

export default CatalogMouse;