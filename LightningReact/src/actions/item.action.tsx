import {ItemModel} from "../models/item.model";
import appConstants from "../constants/constant";

export const deleteItem = (item:ItemModel) => {
    return {
        type: appConstants.DELETE_ITEM,
        payload: item
    }
}
export const editQuantity= (item:ItemModel) => {
    return {
        type: appConstants.EDIT_QUANTITY,
        payload: item
    }
}

export const addItem = (item:ItemModel) => {
    return {
        type: appConstants.ADD_ITEM,
        payload: item
    }
}
