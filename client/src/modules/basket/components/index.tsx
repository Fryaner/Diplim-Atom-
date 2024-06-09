import { useEffect, useState } from "react";
import { 
    useGetBasketDeviceIdQuery, 
    useGetBasketDeviceQuery,
    useDeleteBasketDeviceMutation,
    useAddBasketDeviceMutation,
    useReduceBasketDeviceMutation,
 } from "../api/basketApi";
import {Spinner } from "@radix-ui/themes";
import { useGetBrandDevicesQuery, useGetTypeDevicesQuery } from "../../catalog/api/catalogApi";
import { Input } from "../../../UI/Input";
import { Button } from "../../../UI/Button";
import CardBasketDevice from "./cardBasketDevice";
import { useDispatch } from "react-redux";
import { basketDeviceCountMinus, totalAmountBasketMinus } from "../../../store/basketSlice";
import { ChevronDown, ChevronUp, RussianRuble } from "lucide-react";

const Basket = () => {
    const basketId = Number(localStorage.getItem('basketId'));
    const { data: devicesId, isLoading, isError, refetch } = useGetBasketDeviceIdQuery({basketId});
    const { data: devices } = useGetBasketDeviceQuery();
    const { data: dataBrands } = useGetBrandDevicesQuery();
    const { data: dataTypes } = useGetTypeDevicesQuery();
    const [deleteDevice, {data: deleteDataDevice}] = useDeleteBasketDeviceMutation();
    const [reduceDevice, {data: reduceBasketDevice}] = useReduceBasketDeviceMutation();
    const [addDevice, {data: addDataDevice}] = useAddBasketDeviceMutation();
    const [isActive, isSetActive] = useState(false);
    const dispatch = useDispatch();

    const handlerDeleteDevice = (deviceId: number) => {
        deleteDevice({
            basketId,
            deviceId,
        })
    }

    const handlerReduceDevice = (basketDeviceId: number) => {
        reduceDevice({
            id: basketDeviceId,
            basketId
        })
    }

    const handlerAddDevice = (deviceId: number) => {
         addDevice({
            basketId,
            deviceId,
        })
    }

    useEffect(() => {
        if (localStorage.getItem('isAuth') === 'false') {
            return;
        }
        if (!devicesId || devicesId.length === 0) {
            localStorage.setItem('totalAmount', String(0))
        }
        localStorage.setItem('counts', String(devicesId?.length))
        dispatch(totalAmountBasketMinus(1))
        dispatch(basketDeviceCountMinus(1))
        refetch()
    }, [deleteDataDevice, reduceBasketDevice, addDataDevice, devicesId]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <p className="px-4">Ошибка при загрузке данных</p>;
    }

    if (!devicesId || devicesId.length === 0) {
        return <p className="font-bold flex justify-center items-center px-4 text-center h-dvh">Корзина пустая. Для добавления товаров перейдите в каталог.</p>;
    }

    if (!dataBrands || !dataTypes) {
        return <Spinner />;
    }

    // Создаем объект, чтобы подсчитать количество каждого устройства
    const deviceCountMap: { [key: number]: number } = devicesId.reduce((acc, deviceIdObj) => {
        acc[deviceIdObj.deviceId] = (acc[deviceIdObj.deviceId] || 0) + 1;
        return acc;
    }, {} as { [key: number]: number });

    // Создаем маппинг брендов и типов
    const brandMap = dataBrands.reduce((acc, brand) => {
        acc[brand.id] = brand;
        return acc;
    }, {} as { [key: number]: { id: number; name: string } });

    const typeMap = dataTypes.reduce((acc, type) => {
        acc[type.id] = type;
        return acc;
    }, {} as { [key: number]: { id: number; name: string } });

    
    // Массив с устройствами и их количеством
    const mergedDevices = devices?.rows
        .filter(device => deviceCountMap[device.id])
        .map(device => {
            const deviceIdObj = devicesId.find(item => item.deviceId === device.id);
            const id = deviceIdObj ? deviceIdObj.id : 0;
            return {
            ...device,
            count: deviceCountMap[device.id],
            brandName: brandMap[device.brandId]?.name || 'Unknown Brand',
            typeName: typeMap[device.typeId]?.name || 'Unknown Type',
            basketDeviceId: id
            }
        });

        const totalAmount = mergedDevices?.reduce((total, device) => {
            if (device.price && device.count) {
                total += device.price * device.count;
                localStorage.setItem('totalAmount', String(total))
            } 
            return total;
        }, 0);


    return (
        <div className="flex flex-col gap-6 px-4">
            <h2 className="font-bold text-[18px] mt-4">Корзина</h2>
            <div className="flex gap-4 max-lg:flex-col">
                <div className="flex flex-col gap-12 w-[70%] max-lg:w-full">
                    {mergedDevices?.map(device => (
                    <CardBasketDevice 
                    basketDeviceId={device.basketDeviceId}
                    deviceBrandMane={device.brandName} 
                    deviceCount={device.count} 
                    deviceId={device.id}
                    deviceImage={device.image}
                    deviceModel={device.model}
                    devicePrice={device.price}
                    deviceTypeName={device.typeName}
                    handlerDeleteDevice={handlerDeleteDevice}
                    handlerAddDevice={handlerAddDevice}
                    handlerReduceDevice={handlerReduceDevice}
                    />
                    ))}
                </div>
                <div className="h-full flex flex-col flex-1 bg-[#F7F7F7] rounded-lg lg:sticky lg:top-[10px]">
                    <div className="p-4 flex flex-col gap-2">
                        <p className="font-bold">В крозине</p>
                        <p className="text-[13px]">Товаров в корзине: {devicesId.length}</p>
                        <div className="flex flex-col gap-2">
                            <Button className="p-0 h-[auto] flex items-center gap-1 justify-start" variant="link" onClick={() => isActive ? isSetActive(false) : isSetActive(true)}>
                                <p>Промокод</p>
                                {isActive ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                                </Button>
                            {isActive ?                 
                                <div className="flex flex-1">
                                    <Input className="rounded-none rounded-l-lg" type="text"/>
                                    <Button className="rounded-none rounded-r-lg">Активировать</Button>
                                </div> : <></>}
                        </div>
                        <p className="flex">{totalAmount}<RussianRuble className="w-4"/></p>
                    </div>
                    <Button className="bg-[#8761D9] rounded-none rounded-b-lg">Оформить заказ</Button>
                </div>
            </div>
        </div>
    );
};

export default Basket;