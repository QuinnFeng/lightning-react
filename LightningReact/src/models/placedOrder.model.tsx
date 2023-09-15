import {ItemModel} from "./item.model";

export interface PlacedOrderModel {
    id:number;
    orderTime:Date;
    estimatedPickUpTime: Date;
    actualPickUpTime: Date;
    deliveryAddress: string;
    payment: number;
    comment: string;
    customerName: string;
    type: "delivery"|"pickup";
    discount: number;
    restaurantId: number;
    customerId: number;
    order: ItemModel[];
    status:string;
}