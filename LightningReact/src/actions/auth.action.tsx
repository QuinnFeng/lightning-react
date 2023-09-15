import appConstants from "../constants/constant";
import  axios,{AxiosResponse} from "axios";
import qs from "qs";
import {UserModel} from "../models/user.model";
import {UserDetailModel} from "../models/userDetail.model";

export const login = (
    user: UserModel,
    succeed: () => void,
    failed: (msg: string) => void
) => {
    console.log(qs.stringify(user));
    const loginPromise = axios.post(
        `${process.env["REACT_APP_API"]}/login`,
        qs.stringify(user),         // convert user: json into form data
        {
            withCredentials: true   // carry or set cookie
        }
    );
    loginPromise
        .then(res => {
            console.log(res);
            res.data.success ? succeed() : failed(res.data.message);
        })
        .catch(err => fail(err.message));

    return {
        type: appConstants.LOGIN,
        payload: loginPromise
    };
};

export const signUp= (
    user: UserModel
)=>{

    console.log(qs.stringify(user));
    const SignUpPromise = axios.post(
        `${process.env["REACT_APP_API"]}/users`,
        user
    );

    SignUpPromise
        .then(res => res.data)
        .catch(err => fail(err.message));

    return {
        type: appConstants.SIGN_UP,
        payload: SignUpPromise
    };
}

export const addUserDetail=(
    userDetail: UserDetailModel,
    succeed: () => void,
    failed: (msg: string) => void
)=>{
    const addUserDetailPromise = axios.post(
        `${process.env["REACT_APP_API"]}/user_details`,
        userDetail,

    );
    addUserDetailPromise
        .then(res => {
            res.data.success ? console.log(res.data): failed(res.data.message)
        })
        .catch(err => fail(err.message));

    return {
        type: appConstants.ADD_USER_DETAIL,
        payload: addUserDetailPromise
    };
}


export const checkLogin = () => {
    const checkLoginPromise = axios.get(
        `${process.env.REACT_APP_API}/login`,             // this also work
        {withCredentials: true}// we carry cookies, as an object
    );
    return {
        type: appConstants.CHECK_LOGIN,
        payload: checkLoginPromise
    }
};

export const rolesLogIn=(
    user: UserModel,
    role:string
)=>{

    const DriverLogInPromise = axios.post(
        `${process.env["REACT_APP_API"]}/users/`+role,
        user
    );

    DriverLogInPromise
        .then(res => res.data)
        .catch(err => fail(err.message));

    return {
        type: appConstants.ROLE_LOG_IN,
        payload: DriverLogInPromise
    };
}