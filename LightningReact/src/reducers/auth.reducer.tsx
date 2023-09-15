import appConstants from "../constants/constant";
import {AxiosResponse} from "axios";

export const authReducer = (
    state: { username: string } | null = null,
    action: authReducerAction
) => {

    switch (action.type) {
        case appConstants.LOGIN:
            // return action.payload.data.success ? action.payload.data.user: null // an indication of if login is successful
            return action.payload.data.success ? {username:'customer3'} : null;
        case appConstants.CHECK_LOGIN:
            return action.payload.data.success ? {username:'customer3'}: null;
        case appConstants.SIGN_UP:
            return action.payload.data;
        case appConstants.ADD_USER_DETAIL:
            return null;
        default:
            return state;
    }

};


interface authReducerAction {
    type: string;
    payload: AxiosResponse;   // should be AXiOMS response}
}

