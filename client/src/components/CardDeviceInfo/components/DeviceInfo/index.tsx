import { useParams } from "react-router-dom";
import { useGetDeviceOneQuery, useGetBrandQuery, useGetTypeQuery, useAddDeviceToBasketMutation, useGetBasketDeviceIdQuery } from "../../api/apiDevice";
import { ShoppingBag, Star } from "lucide-react";
import { Button } from "../../../../UI/Button";
import { Separator } from "../../../../UI/Separator";
import { Spinner } from "@radix-ui/themes";
import { useDispatch } from "react-redux";
import { basketDeviceCountMinus, totalAmountBasketMinus } from "../../../../store/basketSlice";
import { useEffect } from "react";

const DeviceInfo = () => {
    const basketId = Number(localStorage.getItem('basketId'));
    const {id} = useParams();

    const {data: dataDeviceInfo} = useGetDeviceOneQuery({id: Number(id)});
    const {data: dataBrand} = useGetBrandQuery();
    const {data: dataType} = useGetTypeQuery();
    const [addDevice, {data: dataAddDevice, isLoading: isAddDeviceLoading}] = useAddDeviceToBasketMutation();
    const {data: dataDeviceId, refetch} = useGetBasketDeviceIdQuery({basketId})
    const dispath = useDispatch();

    useEffect(() => {
        if (!dataDeviceId) {
            return;
        }
        refetch()
    }, [dataAddDevice])

    useEffect(() => {
        if (!dataDeviceId) {
            return;
        }        
        if(!dataDeviceInfo) {
            return;
        }
        localStorage.setItem('counts', String(dataDeviceId?.length))
        localStorage.setItem('totalAmount', String(Number(localStorage.getItem('totalAmount')) + dataDeviceInfo.price))
        dispath(basketDeviceCountMinus(1));
        dispath(basketDeviceCountMinus(1));
    }, [dataDeviceId])

    if (!dataDeviceInfo) {
        return <></>;
    }

    const handlerAddDevice = () => {
        addDevice({
            basketId,
            deviceId: dataDeviceInfo.id
        })
    }
    const nameBrandDevice = dataBrand?.find((brand) => brand.id === dataDeviceInfo?.brandId);
    const nameTypeDevice = dataType?.find((type) => type.id === dataDeviceInfo?.typeId);
    const starElements = Array.from({ length: 5 }, (_, index) => index < dataDeviceInfo?.rating);
    return (
        <div className="flex flex-col gap-12 px-4 pt-6">
            <div className="flex gap-12 max-md:flex-col">
                <div className="w-[50%] max-md:w-full flex justify-center items-center">
                    <img src={`http://localhost:8000/${dataDeviceInfo?.image}`} alt={`${dataDeviceInfo?.model}/${nameBrandDevice?.name}/${nameTypeDevice?.name}`}/>
                </div>
                <div className="flex flex-col justify-center w-[50%] gap-6 max-md:w-full">
                    <div className="flex flex-col gap-4">
                        <p className="flex items-center font-bold text-[24px]">
                            {dataDeviceInfo?.model}/{nameBrandDevice?.name}/{nameTypeDevice?.name}
                            <Button className="p-0 h-full" variant="link" size="icon"><Star className="hover:fill-[orange]"/></Button>
                        </p>
                        <div className="flex gap-2">
                            <div className="flex">
                            {starElements.map((isFilled, index) => (
                                <Star key={index} className={`w-4 ${isFilled ? "fill-[orange]" : "fill-[white]"}`} />
                            ))}
                            </div>
                            <p>-</p>
                            <p>{dataDeviceInfo.rating}</p>
                        </div> 
                        <Separator/>
                        <p className="flex">Доступно в рассрочку от {(Math.round((dataDeviceInfo.price/6) * 10)/10).toFixed(0)} ₽/мес.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-[24px] font-bold flex items-center">{dataDeviceInfo?.price} ₽</p>
                        <div className="flex flex-1 items-end">
                            <Button onClick={() => handlerAddDevice()} className="flex flex-1 bg-[#8761D9]">
                                {isAddDeviceLoading ? <Spinner/> : <p className="flex flex-1 justify-center gap-2">Добавить в корзину<ShoppingBag className="w-5"/></p>}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-[32px] font-bold">Характеристики</p>
                {dataDeviceInfo.info.length === 0 ? <p>Характеристики товара ещё не были указаны. Приносим извинения.</p> :
                <ul>
                    {dataDeviceInfo?.info.map((info) =>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center pt-6">
                            <li className="flex-1 font-bold">{info.title}</li>
                            <li className="flex-1">{info.description}</li>
                        </div>
                        <Separator/>
                    </div>
                    )}
                </ul>
                }
            </div>
        </div>
    )
}

export default DeviceInfo;