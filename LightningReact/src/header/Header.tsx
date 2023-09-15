import React, {useRef} from "react";
import {NavLink} from "react-router-dom";
import appConstants, {ReduxState} from "../constants/constant";
import {useSelector} from "react-redux";
import {GiLightningFrequency} from "react-icons/gi";
import {AiOutlineBars} from "react-icons/ai";
import {Autocomplete} from "@react-google-maps/api";
import {setAddress} from "../screens/LandingPage";
const Header = () => {

    // useSelector form react-redux

    const user = useSelector((state: ReduxState) => state.user);
    const inputRef = useRef(null);


    function assignAddress(){
        let geocoder = new google.maps.Geocoder();
        const places=(inputRef!.current! as HTMLInputElement).value;
        geocoder.geocode( { 'address': places}, (results, status) => {
            if (status == 'OK') {
                const geocodes = results![0].geometry.location.toJSON();
                setAddress(geocodes.lat.toString(), geocodes.lng.toString(), (inputRef!.current! as HTMLInputElement).value);
            }
            else{
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    return (

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
                <details><summary> {'to '+localStorage.getItem('address')}
                    <Autocomplete onPlaceChanged={() => assignAddress()}>
                        <input type='text' placeholder='enter street address or zipcode' ref={inputRef}/>
                    </Autocomplete>
                    </summary></details>

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
        {
            !user ?
                <NavLink className="nav-link" to={appConstants.loginRoute}>
                    Log in
                </NavLink>
                :
                <NavLink className="nav-link" to={appConstants.loginRoute}>
                    Log out
                </NavLink>
        }
        </div>
            </div>
    );
};


export default Header;