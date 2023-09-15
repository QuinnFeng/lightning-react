import React, {Component} from "react";
import Restaurant from "./restaurant/Restaurant";
import {ReduxState} from "../constants/constant";
import {connect} from "react-redux";
import {getRestaurantsByCategory} from "../actions/restaurants.action";
import {RestaurantModel} from "../models/restaurant.model";
import {AxiosResponse} from "axios";
import {RouteComponentProps} from "react-router";

class RestaurantsByCategory extends Component<RestaurantsProps, any> {


    componentDidMount() {
        this.props.getRestaurantsByCategory(this.props.category);
    }

    render() {
        console.log(this.props.restaurants);
        return <div>
            {
                this.props.restaurants?.map(element => {
                    return (
                        // <Restaurant Restaurant={element} key={element.id}/>
                        <Restaurant Restaurant={element} key={element.id}/>
                    )
                })
            }
        </div>


    }
}



function mapStateToProps({restaurants}: ReduxState,ownProps:RestaurantsProps) {
    const category  = ownProps.match.params.c;
    return {restaurants,category} as RestaurantsProps;
}

export default connect(mapStateToProps, {getRestaurantsByCategory})(RestaurantsByCategory);

interface RestaurantsProps extends RouteComponentProps<{ c: string }> {
    restaurants: RestaurantModel[];
    category:string;
    getRestaurantsByCategory: (category:string) => {
        type: string,
        payload: Promise<AxiosResponse>
    }
}