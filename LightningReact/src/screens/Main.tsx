import React, {Component, LegacyRef, useEffect, useRef, useState} from "react";
import Categories from "../categories/Categories";
import Restaurants from "../restaurants/Restaurants";
import Restaurant from "../restaurants/restaurant/Restaurant";
import Header from "../header/Header";
import {NavLink, useHistory} from "react-router-dom";
import css from "./screens.module.scss";
import {GiLightningFrequency} from "react-icons/gi";
import {Autocomplete} from "@react-google-maps/api";
import {LandingPage, setAddress} from "./LandingPage";
import RestaurantsByCategory from "../restaurants/RestaurtantsByCategory";
import appConstants from "../constants/constant";
import {AxiosResponse} from "axios";
import {connect} from "react-redux";
import {getCategories} from "../actions/categories.action";
import {AiOutlineShoppingCart} from "react-icons/ai";

class Main extends Component<any, any> {
    //inputRef: <> | undefined;
    inputRef: React.RefObject<HTMLInputElement>|null;

    constructor(props:any) {
        super(props);
        this.inputRef=React.createRef();
        this.state={address:localStorage.getItem('address')}

    }

    assignAddress(){
        let geocoder = new google.maps.Geocoder();
        const places=((this.inputRef)!.current! as HTMLInputElement).value;
        geocoder.geocode( { 'address': places}, (results, status) => {
            if (status == 'OK') {
                const geocodes = results![0].geometry.location.toJSON();
                setAddress(geocodes.lat.toString(), geocodes.lng.toString(), ((this.inputRef)!.current! as HTMLInputElement).value);
                this.setState({address:((this.inputRef)!.current! as HTMLInputElement).value});

            }
            else{
                alert('Geocode was not successful for the following reason: ' + status);
            }
        }).then();
    }

    render() {
        return <>
            <div>
                <div>
                    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                        <a href="/" className="navbar-brand"><GiLightningFrequency/>LightningForce</a>
                        {/*<ul className="nav navbar-nav">*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <NavLink className="nav-link" to={appConstants.categoriesRoute}>*/}
                        {/*            Categories*/}
                        {/*        </NavLink>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                    </nav>
                    {/*<span><button>Delivery</button></span>*/}
                    {/*<span><button>pickup</button></span>*/}
                    <details><summary> {'to '+this.state.address}
                        <Autocomplete onPlaceChanged={() =>this.assignAddress()}>
                            <input type='text' placeholder='Address' ref={this.inputRef}/>
                        </Autocomplete>
                    </summary></details>
                    <button><AiOutlineShoppingCart/></button>

                    {/*<form target={"_target"} method={"post"}>*/}
                    {/*    <label>If item is unavailable</label><br/>*/}
                    {/*    <select ref={actionRef} id={"action"} name={"action"}>*/}
                    {/*        <option value={''}>select</option>*/}
                    {/*        <option value={"Go with merchant recommendation"}>Go with merchant recommendation</option>*/}
                    {/*        <option value={"Contact me"}>Contact me</option>*/}
                    {/*        <option value={"Refund this item"}>Refund this item</option>*/}
                    {/*        <option value={"Cancel the entire order"}>Cancel the entire order</option>*/}
                    {/*    </select>*/}
                    {/*</form>*/}
                </div>
                <div>
                    <NavLink className="nav-link" to={appConstants.loginRoute}>
                        Log in
                    </NavLink>
                </div>
            </div>
                <div>
                    <Categories/>
                    <Restaurants/>
                </div>
            {/*<Restaurants/>*/}

        </>
    }

}

export default Main;