import React, {Component, SyntheticEvent, useEffect, useMemo, useRef, useState} from "react";
import Header from "./header/Header";
import {connect} from "react-redux";
import {checkLogin} from "./actions/auth.action";
import Restaurants from "./restaurants/Restaurants";
import RestaurantsByCategory from "./restaurants/RestaurtantsByCategory";
import axios, {Axios, AxiosResponse} from "axios";
import Menus from "./menus/Menus";
import CustomPopup from "./util/CustomPopup";
import {SignUp} from "./SignUp/SignUp";
import qs from "qs";
import {UserModel} from "./models/user.model";
import CheckOut from "./screens/CheckOut";
//import GoogleMapReact from 'google-map-react';
import {Map} from 'googlemaps';
import Test, {GG} from "./test";
import Main from "./screens/Main";
import Categories from "./categories/Categories";
import {LandingPage} from "./screens/LandingPage";
import Cart from "./cart/Cart";
import {Login} from "./login/Login";
import MoreBoxes from "./screens/Boxes";

//import PlacesAutocomplete from 'react-places-autocomplete';


class App extends Component<any, any> {

    componentDidMount() {
        // console.log(localStorage.getItem('address'));
        // localStorage.setItem('address','');
    }


    render() {
        return (
            <>
                <LandingPage/>
                <Cart/>
                <Login/>
                {/*<MoreBoxes/>*/}
                <main>
                    {
                        this.props.children
                    }
                </main>
            </>
        )
    }

    ;
}



export default connect(null, {checkLogin})(App);

