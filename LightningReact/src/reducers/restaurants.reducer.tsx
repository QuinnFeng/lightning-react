import appConstants from "../constants/constant";
import {AxiosResponse} from "axios";
import {RestaurantModel} from "../models/restaurant.model";

export const restaurantsReducer = (
    state: RestaurantModel[] | null=null,
    action: RestaurantsReducerAction
) => {

    switch (action.type) {
        case appConstants.GET_RESTAURANTS:
            // console.log(action.payload.data[0].categories[0].name);
            //console.log(action.payload.data);
            let timeDiff =+new Date() - +new Date('2022-09-21T00:00:00');
            timeDiff /= 1000;
            let seconds = Math.round(timeDiff);
            console.log(seconds + " seconds");
            return (action.payload as AxiosResponse).data;
        default:
            return state;
    }
};

interface RestaurantsReducerAction{
    type: string;
    payload: AxiosResponse;
}