import { Device } from '../../../models/deviceModel';
import mainApi from '../../../store/mainApi';

const basketApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getBasketDeviceId: build.query<{id: number, deviceId: number}[], {basketId: number | undefined}>({
            query: (body) => `basket/basketDevice/${body.basketId}`
        }),
        deleteBasketDevice: build.mutation<{}, {basketId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'basket/deleteDevice',
                method: 'DELETE',
                body,
            })
        }),
        reduceBasketDevice: build.mutation<{}, {id: number | undefined, basketId: number | undefined}>({
            query: (body) => ({
                url: 'basket/reduceDevice',
                method: 'DELETE',
                body,
            })
        }),
        addBasketDevice: build.mutation<{}, {basketId: number | undefined, deviceId: number | undefined}>({
            query: (body) => ({
                url: 'basket/addDevice',
                method: 'POST',
                body,
            })
        }),
        getBasketDevice: build.query<Device, void>({
            query: () => `device`,
        }),
    }),
})

export const { 
    useGetBasketDeviceIdQuery,
    useGetBasketDeviceQuery,
    useDeleteBasketDeviceMutation,
    useAddBasketDeviceMutation,
    useReduceBasketDeviceMutation,
} = basketApi;