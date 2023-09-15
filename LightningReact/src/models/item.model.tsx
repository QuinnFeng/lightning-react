import {MenuItemModel} from "./menuItem.model";

export interface ItemModel {
    id: number;
    name:string;
    description:string;
    placedOrderId: number;
    menuItemId: number;
    quantity: number;
    price: number;
    comment: string;
    available:boolean;
    action:string;
}