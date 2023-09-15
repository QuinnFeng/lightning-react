import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import appConstants from "./constants/constant";
import {Provider} from "react-redux";
import {rootReducer} from "./reducers/root.reducer";
import {applyMiddleware, createStore} from 'redux';

import reduxPromise from 'redux-promise';
import {Login} from "./login/Login";
import Restaurants from "./restaurants/Restaurants";
import Categories from "./categories/Categories";
import Menus from "./menus/Menus";
import RestaurantsByCategory from "./restaurants/RestaurtantsByCategory";
import MenuItemsByRestaurantIdAndCategory from "./menus/MenuByCategory";
import Cart from "./cart/Cart";
import Main from "./screens/Main";




// use js to add h1 hello world under root

const root = document.getElementById('root');
// const h1 = document.createElement('h1');
// const textNode = document.createTextNode('hello world1');
// h1.appendChild(textNode);
// root?.appendChild(h1);

// /////
// const h1React = React.createElement('h1', null, 'hello react 1' );
// ReactDOM.render(
//     h1React,
//     root
// );
//
// const h1React2 = <h1>Hello React 2</h1>;
// ReactDOM.render(
//     h1React2,
//     root
// );
//
//
// // @ts-ignore
// const d = document.querySelector("div")
//     .appendChild(
//         document.createElement("h1")
//     ).appendChild(
//         document.createTextNode('hello world3')
//     );

// const addName = (newName: string) => {
//     names.push(newName);
//     // this.forceUpdate();
// };

// create a method here
const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);     // applyMiddleware imported from redux

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path={appConstants.restaurantsRoute} component={Restaurants}/>
                    <Route path={appConstants.categoriesRoute} component={Categories}/>
                    <Route path={`${appConstants.restaurantMenuItemsRoute}/:restaurantId`} component={Menus}/>
                    <Route path={`${appConstants.restaurantsByCategoryRoute}/:c`} component={RestaurantsByCategory}/>
                    <Route path={appConstants.menuItemsByCategoryRoute} component={MenuItemsByRestaurantIdAndCategory}/>
                    <Route path={appConstants.loginRoute} component={Login}/>
                    <Route path={appConstants.cartRoute} component={Cart}/>
                    <Route path={appConstants.main} component={Main}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    ,
    root
);


reportWebVitals();
