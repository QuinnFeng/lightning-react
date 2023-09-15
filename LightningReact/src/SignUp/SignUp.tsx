import React, {SyntheticEvent, useEffect, useReducer} from "react";
import {useDispatch} from "react-redux";
import {addUserDetail, login, signUp} from "../actions/auth.action";
import appConstants from "../constants/constant";
import css from "../login/Login.module.scss";
import {UserDetailModel} from "../models/userDetail.model";
import axios, {AxiosResponse} from "axios";
import {authReducer} from "../reducers/auth.reducer";
import constant from "../constants/constant";
import {UserModel} from "../models/user.model";
import qs from "qs";
import {request} from "https";
let usernames=[] as string[];
const fetchData = async () => {
    usernames = await axios.get('http://localhost:8080/users/usernames').then(response => response.data);
}
export const SignUp = () => {

    const [userDetail, setUserDetail] = React.useState({
        id:0,
        username:'',
        firstname: '',
        lastname:'',
        phone:'',
        email:'',
        address:'',
        password: '',
        city:'',
        state:'',
        zip:'',
        user_id:0
    });

    const [visibility,setVisibility] = React.useState(false);
    //const  [submitted,setSubmitted] = React.useState(false);
    useEffect(() => {fetchData().catch(console.error);},[]);
    //useDispatch from react-redux

    const dispatch= useDispatch();

    // always const or let inside a function
    const updateHandler = (event: SyntheticEvent) => {
        const ele = event.target as HTMLInputElement;
        console.log(ele.id==='username');
        console.log(usernames);
        if(ele.id==='username'&&usernames.includes(ele.value)){
            setVisibility(true);
        }
        else{
            setVisibility(false);
        }
        //console.log(ele.id,ele.value);
        setUserDetail({...userDetail, [ele.id]: ele.value});
    };

    const submitHandler = async (event: SyntheticEvent) => {
        event.preventDefault(); // pervent refresh of the page
        // const user = dispatch(signUp(
        //     {
        //         username: userDetail.username === '' ? userDetail.firstname + userDetail.lastname : userDetail.username,
        //         password: userDetail.password
        //     }
        // ));

        const user = await axios.post(
            `${process.env["REACT_APP_API"]}/users`,
            {
                username: userDetail.username === '' ? userDetail.firstname + userDetail.lastname : userDetail.username,
                password: userDetail.password
            }
        ).then(res => res.data)
            .catch(err => fail(err.message));

        console.log(user);
        console.log(JSON.stringify({...userDetail,username:user.username,user_id:user.id}));


        //variable name must match in the json context
        // await axios.post(
        //     `${process.env["REACT_APP_API"]}/user_details`,
        //     {...userDetail,username:user.username,user_id:user.id }
        // ).then()
        //     .catch(err => fail(err.message));
        dispatch(addUserDetail({...userDetail,password:user.password,user_id:user.id},() => null,
            (msg: string) => console.log(msg)));

    };

    return (
        <form
            className={css.EditProduct}
            onSubmit={submitHandler} // same as use button to submit( onClick on button )
        >
            <h2>Sign Up</h2>
            <div>
                <div className={css.formDiv}>
                    <label htmlFor="firstname">Firstname:</label>
                    <input
                        onChange={updateHandler}
                        value={userDetail.firstname}
                        className="form-control"
                        type="text"
                        name="firstname"
                        id="firstname"/>
                </div >
                <div className={css.formDiv}>
                    <label htmlFor="lastname" >Lastname:</label>
                    <input
                        onChange={updateHandler}
                        value={userDetail.lastname}
                        className="form-control"
                        type="text"
                        name="lastname"
                        id="lastname"/>
                </div>
            </div>
            <label htmlFor="username" >Username:</label>
            {visibility?<span>A user with that username exists</span>:null}
            <input
                onChange={updateHandler}
                value={userDetail.username}
                className="form-control"
                type="text"
                name="username"
                id="username"/>
            <label htmlFor="Email">Email:</label>
            <input
                onChange={updateHandler}
                value={userDetail.email}
                className="form-control"
                type="text"
                name="email"
                id="email"/>
            <label htmlFor="phone">Phone:</label>
            <input
                onChange={updateHandler}
                value={userDetail.phone}
                className="form-control"
                type="text"
                name="phone"
                id="phone"/>
            <label htmlFor="password">Password:</label>
            <input
                onChange={updateHandler}
                value={userDetail.password}
                className="form-control"
                type="text"
                name="password" id="password"/>
            <br/>
            <button
                className="btn btn-success">
                Sign Up
            </button>
        </form>
    );

};
