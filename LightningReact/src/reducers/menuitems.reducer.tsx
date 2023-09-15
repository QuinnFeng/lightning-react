import appConstants from "../constants/constant";
import {AxiosResponse} from "axios";
import {MenuItemModel} from "../models/menuItem.model";

export const menuItemsReducer = (
    state: MenuItemModel[] | null=null,
    action: MenuItemsReducerAction
) => {

    switch (action.type) {
        case appConstants.GET_MENU_ITEMS:
            //console.log(action.payload.data);
            return (action.payload as AxiosResponse).data;
        default:
            return state;
    }
};

interface MenuItemsReducerAction{
    type: string;
    // payload: ProductModel;
    payload: AxiosResponse;
}