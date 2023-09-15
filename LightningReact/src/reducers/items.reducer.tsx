import {MenuItemModel} from "../models/menuItem.model";
import appConstants from "../constants/constant";
import {AxiosResponse} from "axios";
import {ItemModel} from "../models/item.model";
export const cart = [
    {action:"",
available:true,
comment:"",
description:"clear chicken broth with mixed vegetables (carrots, cabbage, baby corn, mushroom, snow peas) with tofu pieces",
id:1662799472546,
menuItemId:8,
    name:"Garden Vegetable Soup with Tofu",
    placedOrderId :   0,
    price   :  6,
    quantity   :  4}] as ItemModel[];



export const ItemsReducer = (
    state: ItemModel[] = cart,
    action: ItemsReducerAction
) => {

    switch (action.type) {
        case appConstants.EDIT_QUANTITY:
            //console.log(action.payload.data);
            // state.forEach((e) => {
            //     if (e.id === action.payload.id)
            //         e.quantity = action.payload.quantity;
            // })
            state[state.findIndex(element=>element.id===action.payload.id)].quantity=action.payload.quantity;
            console.log(state);
            return state;
        case appConstants.DELETE_ITEM:
            //console.log(action.payload.data);
            // const index = state.findIndex(element=>element.id===action.payload.id);
            // console.log(index);
            //state.splice(index);
            //console.log(state);
            // return  [...state.slice(0, index),...state.slice(index)];
            //console.log(state);
            state.splice(state.findIndex(element=>element.id===action.payload.id));
            return state;
        case appConstants.ADD_ITEM:
            //console.log(state);
            console.log(action.payload);
            return [...state, action.payload];
        default:
            return state;
    }
};

interface ItemsReducerAction{
    type: string;
    payload: ItemModel;
}