import mainApi from '../../../store/mainApi';
import { Device } from '../../../models/deviceModel';
import { BrandModel } from '../../../models/brandModel';
import { TypeModel } from '../../../models/typeModel';

const catalogApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getMouseDevices: build.query<Device, void>({
             query: () => 'device'
        }),
        getBrandDevices: build.query<BrandModel[], void>({
            query: () => 'brand'
       }),
       getTypeDevices: build.query<TypeModel[], void>({
        query: () => 'type'
   }),
    }),
})

export const { 
    useGetMouseDevicesQuery, 
    useGetBrandDevicesQuery,
    useGetTypeDevicesQuery 
    } = catalogApi;