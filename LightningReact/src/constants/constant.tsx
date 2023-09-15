import {RestaurantModel} from "../models/restaurant.model";
import {CategoryModel} from "../models/category.model";
import {MenuItemModel} from "../models/menuItem.model";
import {ItemModel} from "../models/item.model";

export const appConstants = {

    // routes
    namesRoute: '/names',
    addNameRoute: '/add-name',
    restaurantsRoute:'/restaurants',
    loginRoute: '/login',
    categoriesRoute: '/categories',
    restaurantMenuItemsRoute:'/menu-items',
    restaurantsByCategoryRoute:'/restaurant-by-category',
    menuItemsByCategoryRoute: '/menu-items-by-category',
    cartRoute:'/cart',
    main:'/main',


    // actions
    ADD_NAME: 'ADD_NAME',
    GET_RESTAURANTS: "GET_RESTAURANTS",
    GET_RESTAURANT_CATEGORIES:"GET_RESTAURANT_CATEGORIES",
    LOGIN: 'LOGIN',  // LOGIN_ACTION
    CHECK_LOGIN: 'CHECK_LOGIN',
    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_MENU_ITEMS: 'GET_MENU_ITEMS',
    EDIT_QUANTITY:'EDIT_QUANTITY',
    DELETE_ITEM:'DELETE_ITEM',
    ADD_ITEM:'ADD_ITEM',
    SIGN_UP:'SIGN_UP',
    ADD_USER_DETAIL:'ADD_USER_DETAIL',
    ROLE_LOG_IN:'ROLE_LOG_IN'
};

export interface ReduxState {
    names: string[];
    // reduxState: any,
    user: { username: string };
    restaurants: RestaurantModel[];
    categories:CategoryModel[];
    menuItems:MenuItemModel[];
    cart:ItemModel[];

}

export default appConstants;
