import mainApi from '../../../store/mainApi';

const apiFavorite = mainApi.injectEndpoints({
    endpoints: (build) => ({
    //     getFavoriteDevices: build.query<{id: number, deviceId: number}[], {id: number | undefined}>({
    //          query: (body) =>  `favorite/${body.id}`
    //     }),
    //     getFavorite: build.query<{}, {userid: number}>({
    //         query: () =>  `favorite`
    //    }),
    //     deleteDevice: build.mutation<{}, {favoriteId: number | undefined, deviceId: number | undefined}>({
    //         query: (body) => ({
    //             url: 'favorite/deleteDevice',
    //             method: 'DELETE',
    //             body,
    //         })
    //     }),
    }),
})

export const { 
    // useDeleteDeviceMutation,
    // useGetFavoriteDevicesQuery,
    // useGetFavoriteQuery,
    } = apiFavorite;