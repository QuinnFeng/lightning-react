import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer
} from '@react-google-maps/api'
import {Position} from "google-map-react";
import React, {Component, SyntheticEvent, useEffect, useRef, useState} from "react";
import CustomPopup from "./util/CustomPopup";
import {UserModel} from "./models/user.model";
import qs from "qs";
import axios from "axios";
import Header from "./header/Header";



export default class Test extends Component<any, any> {


    render() {
        return (
            <>
                {/*<Header/>*/}
                {/*<SimpleMap/>*/}
                {/*<LandingPage/>*/}
                {/*<A/>*/}
                {/*<GG/>*/}
                {/*<MyCurrentLocation/>*/}
                {/*<Home/>*/}
                {/*<MyComponent/>*/}
                {/*<Restaurants/>*/}
                {/*{Example()}*/}
            </>
        )
    };
}

const center = { lat: 48.8584, lng: 2.2945 }

export function GG() {

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const OriginRef = useRef(null);
    const DestinationRef = useRef(null);

    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: 'AIzaSyD_Euy-SgWf5AOPNbfwlgEQAkas1628ttE',
    //     libraries: ['places']
    // })

    // useEffect(()=>{
    //     console.log(`${process.env["REACT_APP_API"]}/login`)
    //     console.log(`${process.env["GOOGLE_API_KEY"]}`)
    // },[]);

    async function calculateRoute() {
        if ((OriginRef.current! as HTMLInputElement).value === null || (DestinationRef.current! as HTMLInputElement).value === null) {
            return;
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        await directionsService.route({
            origin: (OriginRef.current! as HTMLInputElement).value,
            destination: (DestinationRef.current! as HTMLInputElement).value,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result:any) => {
            setDirectionsResponse(result);
            setDistance(result.routes[0].legs[0].distance.text);
            setDuration(result.routes[0].legs[0].duration.text);
        });
    }

    function clearRoute() {
        setDirectionsResponse(null);
        setDistance('');
        setDuration('');
        // OriginRef.current!.value = null;
        // DestinationRef.current!.value = null;
    }

    return (
        <>
            <>
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '800px' }}
                    options={{
                        scrollwheel: true,
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: true,
                        fullscreenControl: true,
                    }}
                    onLoad={map => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </>




            <>
                <Autocomplete>
                    <input type='text' placeholder='Origin' ref={OriginRef} />
                </Autocomplete>
            </>
            <>
                <Autocomplete>
                    <input
                        type='text'
                        placeholder='Destination'
                        ref={DestinationRef}
                    />
                </Autocomplete>
            </>

            <>
                <button type='submit' onClick={calculateRoute}>
                    Calculate Route
                </button>

                <button aria-label='center back' onClick={clearRoute}>
                    icon={<FaTimes />}
                </button>
            </>
            <>
                <p>Distance: {distance} </p>
                <p>Duration: {duration} </p>
                <button
                    aria-label='center back'

                    onClick={() => {
                        map!.panTo(center);
                        map!.setZoom(15);
                    }}>
                    <FaLocationArrow />
                </button>
            </>
        </>
    )
}

const containerStyle = {
    width: '400px',
    height: '400px'
};



function MyCurrentLocation(){

    const [location,setLocation]=useState<{latitude:number|null,longitude:number|null,address:string|null}>({latitude:null,longitude:null,address:null});
    const [enabled,setEnabled]=useState(false);

    useEffect(()=>{getLocation()})

    // const options = {
    //     enableHighAccuracy: true
    // };

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates/*,showError*/);

        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function getCoordinates(position:GeolocationPosition){
        //console.log(position);
        setLocation(prevState => ({...prevState,latitude: position.coords.latitude,longitude:position.coords.longitude}));
        setEnabled(true);
    }

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

    function ReverseGeocodeCoordinates(){
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+
            `${location.latitude},${location.longitude}&key=AIzaSyD_Euy-SgWf5AOPNbfwlgEQAkas1628ttE&sensor=false`).
        then(res=>res.json()).then(data=>console.log(data)).catch(error=>alert(error));
    }

    const c={lat:location.latitude as number,lng:location.longitude as number};


    return(
        <>
            <p>latitude:{location.latitude}</p>
            <p>longitude:{location.longitude}</p>
            <p>address:{location.address}</p>
            {
                enabled?
                    <GoogleMap
                        mapContainerStyle={{width: '400px',
                            height: '400px'}}
                        center={c}
                        zoom={100}
                    >
                        <Marker position={c} />
                    </GoogleMap>
                    :
                    null
            }
            {/*<button onClick={()=>ReverseGeocodeCoordinates()}>get my current address</button>*/}
            {/*<button onClick={()=>getLocation()}>get my current address</button>*/}
        </>

    )
}

function MyComponent() {
    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: `${process.env.GOOGLE_API_KEY}`
    // })

    // const { isLoaded} = useLoadScript({
    //     googleMapsApiKey: 'AIzaSyD_Euy-SgWf5AOPNbfwlgEQAkas1628ttE',
    //     libraries: ['places']
    // });

    const [map, setMap] = useState(null)


    const onUnmount = React.useCallback(function callback() {
        setMap(null)
    }, [])

    return (
        // <LoadScript
        //     id="script-loader"
        //     googleMapsApiKey={'AIzaSyD_Euy-SgWf5AOPNbfwlgEQAkas1628ttE'}
        // >
        <div style={{ display: "flex", height: "calc(100vh - 50px)" }}>
            {/* Google maps has whitelisted codesandbox with overlay, so there is enough to pass an empty string, but for your own app, you need to provide your own api key. Please do not forget to restrict it for your own domain name. */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={100}
                onUnmount={onUnmount}
            >
            </GoogleMap>
        </div>
        //</LoadScript>
        /*<GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={100}
            onUnmount={onUnmount}
        >
            { /!* Child components, such as markers, info windows, etc. *!/ }
            <></>
        </GoogleMap>*/
        // <div>Map</div>:<div>Loading...</div>
    )
}


const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
function success(pos:GeolocationPosition) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function errors(err:any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

class GeoLocation extends Component {
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        console.log(result.state);
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(success);
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                    }
                    result.onchange = function () {
                        console.log(result.state);
                    };
                });
        } else {
            alert("Sorry Not available!");
        }
    }

    render() {
        return (
            <div>
                <h2>GeoLocation</h2>
            </div>
        );
    }
}

export function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

export function Popup() {
    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = () => {
        setVisibility(false);
    };

    return (
        <div>
            <button onClick={() => setVisibility(true)}>open</button>
            <CustomPopup
                onClose={popupCloseHandler}
                show={visibility}
                // title="Hello Jeetendra"
            >
                <h1>Hello This is Popup Content Area</h1>
                <h2>This is my lorem ipsum text here!</h2>
            </CustomPopup>
        </div>
    );
}


function Ref() {
    const ref = useRef(null);
    const actionRef =useRef(null);
    const visibilities = new Array(10) as boolean[];
    const numbers = new Array(10) as number[];


    for(let i=0;i<10;i++){
        visibilities[i]=true;
        numbers[i]=i;
    }

    const handleClick = () => {
        // 👇️ use document.getElementById()
        // const el = document.getElementById('my-element');
        // console.log(el);
        const user:UserModel={username:'ken',password:'m'};

        console.log(qs.stringify(user));
        axios.post(
            `${process.env["REACT_APP_API"]}/users`,
            user
        ).then(res => {
            res.data.success ? console.log("succeed"):console.log("Probably not");
        }).catch(err => fail(err.message));


        //console.log({...visibilities.splice(5,1)});
        // console.log({...visibilities.splice(5,1)});
        // // (better) use a ref
        // const el2 = (ref.current! as HTMLInputElement).value;
        // console.log(el2);
        //
        // const actionValue = (actionRef.current! as HTMLInputElement).value;
        // console.log(typeof actionValue);
    };



    return (
        <div>
            {/*<textarea ref={ref} name="description" placeholder={"This is a description"} id="my-element">*/}
            {/*</textarea>*/}
            {/*/!*<h2  id="w3review"></h2>*!/*/}
            {/*<form target={"_target"} method={"post"}>*/}
            {/*    <label>If item is unavailable</label><br/>*/}
            {/*    <select ref={actionRef} id={"action"} name={"action"} onChange={()=>console.log()}>*/}
            {/*        <option value={"Go with merchant recommendation"}>Go with merchant recommendation</option>*/}
            {/*        <option value={"Contact me"}>Contact me</option>*/}
            {/*        <option value={"Refund this item"}>Refund this item</option>*/}
            {/*        <option value={"Cancel the entire order"}>Cancel the entire order</option>*/}
            {/*    </select>*/}
            {/*</form>*/}
            <button onClick={handleClick}>Click</button>
        </div>
    );
}

// class A extends Component<any, any> {
//
//
//     constructor(props: any) {
//         super(props);
//         let b=new Array(10) as boolean[];
//         b.fill(true);
//         this.state = {
//             visibilities: [...b]
//         };
//         console.log(this.state.visbilities);
//     }
//
//     render() {
//         return null;
//     }
// }
//



class A extends Component<any, any> {

    constructor(props: any) {
        super(props);
        const b=new Array(10) as boolean[];
        for (let i = 0; i < 10; i++) {
            b[i]=true;
        }
        //console.log(b);
        this.state = {
            //visibilities: {...b}
            name:'Mary',
            visibilities:new Array(10) as boolean[]
        }
        for (let i = 0; i < 10; i++) {
            this.state.visibilities[i]=true;
        }
        const someVarName = "";
        localStorage.setItem("someVarKey", someVarName);
    }

    onChangeContextHandler(event: React.SyntheticEvent) {
        this.setState({name:(event.target as HTMLInputElement).value});
        localStorage.setItem("someVarKey",(event.target as HTMLInputElement).value);
    }

    render() {
        return <>
            <input type="text" name="dummy" value={this.state.name} width="100px" id="dummy"
                   onChange={(event:SyntheticEvent)=>this.onChangeContextHandler(event)}/>
            <button onClick={()=> console.log(localStorage.getItem("someVarKey"))}><p>Hello Wrold!</p></button>;
        </>
    }
}