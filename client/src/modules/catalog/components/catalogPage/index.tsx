import { useEffect } from "react"
import { Input } from "../../../../UI/Input"
import { Separator } from "../../../../UI/Separator"
import CardDevice from "../../../../components/CardDevice"
import { 
    useGetDevicesQuery, 
    useGetBrandDevicesQuery,
    useGetTypeDevicesQuery,
    useAddBasketDeviceMutation,
    useGetBasketDeviceIdQuery,
 } from "../../api/catalogApi"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { basketDeviceCountMinus, totalAmountBasketMinus } from "../../../../store/basketSlice"

const CatalogMouse = () => {
    const {id} = useParams();
    const dispath = useDispatch();

    const basketId = Number(localStorage.getItem('basketId'));
    const {data: dataDevices } = useGetDevicesQuery();
    const {data: dataDevicesId, refetch} = useGetBasketDeviceIdQuery({basketId});
    const {data: dataBrands} = useGetBrandDevicesQuery();
    const {data: dataTypes} = useGetTypeDevicesQuery();
    const [addDevice, {data: dataAddDevice}] = useAddBasketDeviceMutation();

    const needDevices = dataDevices?.rows.filter((device) => device.typeId === Number(id));
    console.log(needDevices)
    const handlerAddDevice = (deviceId: number, devicePrice: number) => {
        addDevice({
            basketId,
            deviceId
        })
        if (!dataDevicesId || dataDevicesId.length === 0) {
            return;
        }
        localStorage.setItem('totalAmount', String(Number(localStorage.getItem('totalAmount')) + devicePrice))
    }

    useEffect(() => {
        refetch();
    }, [dataAddDevice])


    useEffect(() => {
        if (!dataDevicesId || dataDevicesId.length === 0) {
            return;
        }
        localStorage.setItem('counts', String(dataDevicesId?.length))
        dispath(basketDeviceCountMinus(1));
        dispath(totalAmountBasketMinus(1));

    }, [dataDevicesId])

    if (!needDevices || needDevices.length === 0) {
        return <p className="px-4 flex justify-center items-center font-bold h-dvh text-center">Данные товары ещё не появились на площадке. Приносим свои извинения</p>;
    }
    const nameType = dataTypes?.find((type) => type.id === Number(id));
    return (
        <div className="flex gap-4 px-4 max-md:flex-col">
            <div className="w-[20%] max-md:w-full">
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
            <div className="w-full flex flex-1 w-full flex-col gap-4">
                <p className="text-[18px] font-bold">{nameType?.name}</p>
                <div className="flex flex-1 w-full flex-wrap gap-4 justify-between">
                    {needDevices.map((device) => 
                        dataBrands?.map((brand) => 
                            brand.id === device.brandId ?
                                dataTypes?.map((type) =>   
                                    type.id === device.typeId ?                     
                                <CardDevice 
                                    handlerAddDevice={handlerAddDevice}
                                    id={device.id}
                                    brand={brand.name} 
                                    image={device.image} 
                                    model={device.model} 
                                    price={device.price} 
                                    type={type.name}
                                    rating={device.rating} 
                                    key={device.id} 
                                    descriptionImage={type.name}/>
                                    : <></>)
                            : <></>) 
                    )}
                </div>  
            </div>
        </div>
    )
}

export default CatalogMouse;