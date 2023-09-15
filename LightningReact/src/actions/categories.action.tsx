import axios from "axios";
import appConstants from "../constants/constant";

export const getCategories = () => {

    const getCategoriesPromise = axios.get(
        'http://localhost:8080/categories'
    );

    return {
        type: appConstants.GET_CATEGORIES,
        payload: getCategoriesPromise,
    };

}
