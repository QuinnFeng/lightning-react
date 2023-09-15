
import {combineReducers} from "redux";
import {namesReducer} from "./names.reducer";
import {authReducer} from "./auth.reducer";
import {restaurantsReducer} from "./restaurants.reducer";
import {categoriesReducer} from "./categories.reducer";
import {menuItemsReducer} from "./menuitems.reducer";
import {ItemsReducer} from "./items.reducer";


// root reducer contains key-value pairs
export const rootReducer = combineReducers({
    names: namesReducer , // do not call, just pass reference
    user: authReducer,
    restaurants:restaurantsReducer,
    categories:categoriesReducer,
    menuItems:menuItemsReducer,
    cart:ItemsReducer
});