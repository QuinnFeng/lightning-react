import axios from "axios";
import appConstants from "../constants/constant";

export const getRestaurants = () => {

    const getRestaurantsPromise = axios.get(
         'http://localhost:8080/restaurants'
    );

    return {
        type: appConstants.GET_RESTAURANTS,
        payload: getRestaurantsPromise,
    };

}

export const getRestaurantsByCategory = (category:string) => {

    const getRestaurantsByCategoryPromise = axios.get(
        'http://localhost:8080/restaurants/'+category
        //'http://localhost:8080/menu_items/restaurant/21/soup'
    );

    return {
        type: appConstants.GET_RESTAURANTS,
        payload: getRestaurantsByCategoryPromise,
    };

}

// export const getRestaurantMenuCategories = (restaurantId:number) =>{
//     const getRestaurantMenuCategoriesPromise = axios.get(
//       'http://localhost:8080/menu_items/categories/'+restaurantId
//     );
//
//     return {
//         type: appConstants.GET_RESTAURANT_CATEGORIES,
//         payload: getRestaurantMenuCategories
//     };
//
// }