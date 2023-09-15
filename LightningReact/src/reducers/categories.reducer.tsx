import appConstants from "../constants/constant";
import {AxiosResponse} from "axios";
import {CategoryModel} from "../models/category.model";

export const categoriesReducer = (
    state: CategoryModel[] | null=null,
    action: CategoriesReducerAction
) => {

    switch (action.type) {
        // bonus addProduct to the server and fix logic below
        case appConstants.GET_CATEGORIES:
            console.log(action.payload);
            return (action.payload as AxiosResponse).data;
        default:
            return state;
    }
};

interface CategoriesReducerAction{
    type: string;
    payload: AxiosResponse;
}