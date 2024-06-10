import CardFavoriteDevice from "../../../../components/CardFavoriteDevice";
// import { useGetFavoriteQuery, useDeleteDeviceMutation, useGetFavoriteDevicesQuery } from "../../api/apiFavorite";
// import { useGetDevicesQuery } from "../../../catalog/api/catalogApi";
const FavoritePage = () => {
    // const favoriteId = Number(localStorage.getItem('favoriteId'));
    // const {data: dataDevices} = useGetFavoriteDevicesQuery({id: favoriteId});
    // const {data: dataAllDevices} = useGetDevicesQuery();

    // if(!dataDevices) {
    //     return <></>;
    // }

    // console.log(dataDevices);
    return (
        <div>
            {/* {dataDevices.length === 0 ? <p className="text-cenetr font-bold text-[18px] flex jusitfy-center items-center px-4">Избранное пусто. Добавьте товары из каталога.</p> :
            <>
            <h3>Избранное</h3>
            {dataDevices?.map((deviceId) => 
                    dataAllDevices?.rows.map((device) =>                
                         deviceId.deviceId === device.id ? 
                        <CardFavoriteDevice
                        id={device.id}
                        image={device.image}
                        model={device.model}
                        price={device.price}
                        raiting={device.rating}
                        /> : <></>
                )
            )}
            </>
    } */}
        </div>
    )
}

export default FavoritePage;