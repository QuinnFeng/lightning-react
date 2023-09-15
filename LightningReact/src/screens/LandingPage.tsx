import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import css from "./screens.module.scss";
import {GiLightningFrequency} from "react-icons/gi";
import {Autocomplete} from "@react-google-maps/api";

export const LandingPage =(props:any)=>{


    //this.state={latitude:null,longitude:null,address:null} as LocationStates;

    const inputRef = useRef(null);
    const [captured,setCaptured]=useState(false);
    //this.addresses=[] as LocationStates[];
    // this.getLocation=this.getLocation.bind(this);
    // this.getCoordinates=this.getCoordinates.bind(this);
    const History=useHistory();
    useEffect(()=>console.log(localStorage.getItem('address')==''),[]);

    function assignAddress(){
        let geocoder = new google.maps.Geocoder();
        const places=(inputRef!.current! as HTMLInputElement).value;
        geocoder.geocode( { 'address': places}, (results, status) => {
            if (status == 'OK') {
                const geocodes=results![0].geometry.location.toJSON();
                setAddress(geocodes.lat.toString(),geocodes.lng.toString(),(inputRef!.current! as HTMLInputElement).value);
                setCaptured(true);
                History.push('/main');
            }
            else{
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    // getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(this.getCoordinates,this.showError);
    //
    //     } else {
    //         alert("Geolocation is not supported by this browser.");
    //     }
    // }
    //
    // getCoordinates(position:GeolocationPosition){
    //     //console.log(position);
    //     this.setState({latitude: position.coords.latitude,longitude:position.coords.longitude});
    //     this.ReverseGeocodeCoordinates();
    // }

    function ReverseGeocodeCoordinates(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position:GeolocationPosition)=>
                fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+`${position.coords.latitude},${position.coords.longitude}&key=AIzaSyD_Euy-SgWf5AOPNbfwlgEQAkas1628ttE&sensor=true`).
                then(res=>res.json()).then(data=>{
                    const c= data.results[0]
                    setAddress(c.geometry.location.lat,c.geometry.location.lng,c.formatted_address);
                    setCaptured(true);
                    History.push('/main');
                    // localStorage.setItem('lat',c.geometry.location.lat);
                    // localStorage.setItem('lng',c.geometry.location.lng);
                    // localStorage.setItem('address',c.formatted_address);
                })
                    .catch(error=>alert(error)),showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
        /*{c=data.results;console.log(c);this.setState({address:data.results[0].formatted_address})}*/
    }

    //c={lat:this.state.latitude as number,lng:this.state.longitude as number};

    function showError(error:any) {
        console.log(error);
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
            default:
                alert("An unknown error occurred");
        }
    }

    // render() {
    //
    //     console.log(localStorage.getItem('address'));
    //     console.log(localStorage.getItem('lat'));
    //     console.log(localStorage.getItem('lng'));
    return !captured? (
        <>
                <div className={css.gfg}>
                    <img src={require('../assets/miscellaneous/food.png')}
                         alt={"ice cream"} className={css.img}/>
                    <h3 className={css.first}><GiLightningFrequency/>Lightning Force</h3>
                    {/*    <p>latitude:{this.state.latitude}</p>*/}
                    {/*    <p>longitude:{this.state.longitude}</p>*/}
                    {/*    <p>address:{this.state.address}</p>*/}
                    {/*    {*/}
                    {/*        this.state.longitude!=null&&this.state.latitude!=null?*/}
                    {/*            <GoogleMap*/}
                    {/*                mapContainerStyle={{width: '400px',*/}
                    {/*                    height: '400px'}}*/}
                    {/*                options={{*/}
                    {/*                    scrollwheel: true,*/}
                    {/*                    zoomControl: true,*/}
                    {/*                    streetViewControl: false,*/}
                    {/*                    mapTypeControl: true,*/}
                    {/*                    fullscreenControl: true,*/}
                    {/*                }}*/}
                    {/*                center={{lat:this.state.latitude as number,lng:this.state.longitude as number}}*/}
                    {/*                zoom={15}*/}
                    {/*            >*/}
                    {/*                <Marker position={{lat:this.state.latitude as number,lng: this.state.longitude as number}} />*/}
                    {/*            </GoogleMap>*/}
                    {/*            :*/}
                    {/*            null*/}
                    {/*    }*/}
                    <div className={css.second}>
                        <h1>Get food delivery and more</h1>
                        <Autocomplete onPlaceChanged={() => assignAddress()}>
                            <input type='text' placeholder='enter street address or zipcode' ref={inputRef}/>
                        </Autocomplete>
                        <button onClick={()=>ReverseGeocodeCoordinates()}>Search Nearby</button>
                    </div>
                </div>

        </>
    ):null;

}

export function setAddress(lat:string,lng:string,address:string){
    localStorage.setItem('lat',lat);
    localStorage.setItem('lng',lng);
    localStorage.setItem('address',address);
}
