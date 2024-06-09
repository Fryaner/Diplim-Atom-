import { FC } from "react";
import { Input } from "../../../../UI/Input";
import { Separator } from "../../../../UI/Separator";
import { Minus, Plus, RussianRuble, Star, Trash } from "lucide-react";
import { Button } from "../../../../UI/Button";
import MediaQuery from "react-responsive";

interface CardBasketDeviceProps {
    deviceModel: string;
    basketDeviceId: number;
    deviceId: number;
    deviceBrandMane: string;
    deviceTypeName: string;
    devicePrice: number;
    deviceCount: number;
    deviceImage: string;
    handlerDeleteDevice: (deviceId: number) => void;
    handlerAddDevice: (deviceId: number) => void;
    handlerReduceDevice: (basketDeviceId: number) => void;
}

const CardBasketDevice: FC<CardBasketDeviceProps> = ({
    deviceBrandMane,
    deviceId,deviceModel, 
    deviceImage, 
    deviceTypeName, 
    deviceCount, 
    handlerDeleteDevice, 
    devicePrice,
    handlerAddDevice,
    basketDeviceId,
    handlerReduceDevice,
}) => {
    return (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-1 gap-4">
                            <div className="flex items-center">
                                <img alt="" width="200px" src={`http://localhost:8000/${deviceImage}`}/>
                            </div>
                            <div className="flex flex-col flex-1 max-md:gap-4">
                                <div className="flex justify-between max-md:flex-col max-md:gap-2">
                                    <p key={deviceId}>
                                        {deviceTypeName}/{deviceModel}/{deviceBrandMane}
                                    </p>
                                    <p className="flex font-bold">{devicePrice * deviceCount}<RussianRuble className="w-4"/></p>
                                </div>
                                <div className="flex flex-1 items-end justify-between gap-4 max-lg:gap-4 max-md:items-start max-md:flex-col-reverse">
                                    <div className="flex gap-2">
                                        <Button variant="link" className="h-full p-0 flex gap-2"><Star color="orange" className="w-4 h-4"/><p>В избранное</p></Button>
                                        <Button onClick={() => handlerDeleteDevice(deviceId)} variant="link" className="h-full p-0 flex gap-2"><Trash color="red" className="w-4 h-4"/><p>Удалить</p></Button>
                                    </div>
                                    <MediaQuery maxWidth={768}>
                                        <Separator/>
                                    </MediaQuery>
                                    <div className="flex justify-end max-md:justify-start">
                                        <Button onClick={() => handlerReduceDevice(basketDeviceId)} className="rounded-none rounded-l-lg bg-[white] border-solid border-2 border-[#F7F7F7] hover:bg-[#F7F7F7]"><Minus color="red" className="w-4"/></Button>
                                        <Input className="rounded-none text-center w-[25%] bg-[#F7F7F7]" type="text" value={deviceCount}/>
                                        <Button onClick={() => handlerAddDevice(deviceId)} className="rounded-none rounded-r-lg bg-[white] border-solid border-2 border-[#F7F7F7] hover:bg-[#F7F7F7]"><Plus color="green" className="w-4"/></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <Separator/>
            </div>
    );
};

export default CardBasketDevice;