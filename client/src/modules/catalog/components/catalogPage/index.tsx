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
    useAddFavoriteDeviceMutation,
    useGetFavoriteDeviceIdQuery,
    useDeleteFavoriteDeviceMutation,
 } from "../../api/catalogApi"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { basketDeviceCountMinus, totalAmountBasketMinus } from "../../../../store/basketSlice"
import { favoriteDeviceCountMinuse } from "../../../../store/favoriteSlice"

const CatalogMouse = () => {
    const {id} = useParams();
    const dispath = useDispatch();

    const basketId = Number(localStorage.getItem('basketId'));
    const favoriteId = Number(localStorage.getItem('favoriteId'));

    const {data: dataDevices } = useGetDevicesQuery();

    const {data: dataDevicesId, refetch: refetchBasket} = useGetBasketDeviceIdQuery({basketId});
    const {data: dataDevicesIdFavorite, refetch: refetchFavorite} = useGetFavoriteDeviceIdQuery({favoriteId});

    const {data: dataBrands} = useGetBrandDevicesQuery();
    const {data: dataTypes} = useGetTypeDevicesQuery();

    const [addDevice, {data: dataAddDevice}] = useAddBasketDeviceMutation();
    const [addFavorite, {data: dataAddDeviceFavorite}] = useAddFavoriteDeviceMutation();
    const [deleteFavorite, {data: dataDeleteDeviceFavorite}] = useDeleteFavoriteDeviceMutation();

    const needDevices = dataDevices?.rows.filter((device) => device.typeId === Number(id));

    const handlerAddDevice = (deviceId: number, devicePrice: number) => {
        addDevice({
            basketId,
            deviceId
        })
        if (!dataDevicesId) {
            return;
        } 
        localStorage.setItem('totalAmount', String(Number(localStorage.getItem('totalAmount')) + devicePrice))
    }

    const handlerControllerFavorite = (deviceId: number, isFavorite: boolean | undefined) => {
        if (isFavorite) {
            deleteFavorite({ favoriteId, deviceId });
            return;
        } 
            addFavorite({ favoriteId, deviceId });
  
    };

    useEffect(() => {
        refetchBasket();
    }, [dataAddDevice])

    useEffect(() => {
        refetchFavorite();
    }, [dataAddDeviceFavorite, dataDeleteDeviceFavorite])

    useEffect(() => {
        if (!dataDevicesId || dataDevicesId.length === 0) {
            return;
        }
        localStorage.setItem('counts', String(dataDevicesId?.length))
        dispath(basketDeviceCountMinus(1));
        dispath(totalAmountBasketMinus(1));

    }, [dataDevicesId])

    useEffect(() => {
        if (!dataDevicesIdFavorite) {
            return;
        }
        localStorage.setItem('countsFavorite', String(dataDevicesIdFavorite?.length))
        dispath(favoriteDeviceCountMinuse(1));
    }, [dataDevicesIdFavorite])

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
                                    dataDevicesIdFavorite={dataDevicesIdFavorite} 
                                    handlerControllerFavorite={handlerControllerFavorite}
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