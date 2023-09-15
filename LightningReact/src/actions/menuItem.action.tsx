import axios from "axios";
import appConstants from "../constants/constant";


// export const getMenus = () => {
//
//     const getMenusPromise = axios.get(
//         'http://localhost:8080/menu_items/restaurant/21/Side  Orders'
//         //'http://localhost:8080/restaurants'
//     );
//
//     return {
//         type: appConstants.GET_MENU_ITEMS,
//         payload: getMenusPromise
//         // when promise is resolved, it will return axiosResponse, which contains data, which is product array
//     };
//
// }

export const getMenuItemsByRestaurantIdAndCategory = (category:string,restaurantId:number) => {

    const getMenuItemsByRestaurantAndCategoryPromise = axios.get(
        'http://localhost:8080/menu_items/restaurant/'+restaurantId+'/'+category
        //'http://localhost:8080/restaurants'
    );

    return {
        type: appConstants.GET_MENU_ITEMS,
        payload: getMenuItemsByRestaurantAndCategoryPromise
    };

}

export const getMenuItemsByRestaurantId = (restaurantId:number) => {

    const getMenuItemsByRestaurantIdPromise = axios.get(
        'http://localhost:8080/menu_items/restaurant/'+restaurantId
        //'http://localhost:8080/restaurants'
    );

    return {
        type: appConstants.GET_MENU_ITEMS,
        payload: getMenuItemsByRestaurantIdPromise
        // when promise is resolved, it will return axiosResponse, which contains data, which is product array
    };

}