export interface DeviceModel {
    model: string;
    image: string;
    rating: number;
    price: number;
    brandId: number;
    typeId: number;

}

export interface Device {
    count: number;
    rows: DeviceModel[];
}