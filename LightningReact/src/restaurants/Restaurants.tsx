import React, {Component} from 'react';
import {connect} from "react-redux";

import axios, {AxiosResponse} from "axios";
import {CategoryModel} from "../models/category.model";
import RestaurantsByCategory from "./RestaurtantsByCategory";
import {RestaurantModel} from "../models/restaurant.model";
import {getRestaurants} from "../actions/restaurants.action";
import {appConstants, ReduxState} from "../constants/constant";
import Restaurant from "./restaurant/Restaurant";
import {Link} from "react-router-dom";



class Restaurants extends Component<RestaurantsProps, any> {

    constructor(props:RestaurantsProps) {
        super(props);
        this.state = {
            categories: [] as CategoryModel[]
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/categories').then(response=>this.setState({categories: response.data}));
        this.props.getRestaurants();
    }

    render() {
        return <div>
            {
                this.state.categories?.map((element: CategoryModel) => {
                        return (
                            <div key={element.id}>
                                <h2><b>{element.name}</b></h2>
                                {
                                    this.props.restaurants?.filter((r:RestaurantModel)=>r.categories.some((c:CategoryModel)=>c.name===element.name)).map(restaurant => {
                                    return (
                                            <Restaurant Restaurant={restaurant} key={restaurant.id}/>
                                    );
                                })}
                            </div>
                        )
                    }
                )
            }
        </div>
    }
}
function mapStateToProps({restaurants}: ReduxState) {
    return {restaurants};
}

export default connect(mapStateToProps, {getRestaurants})(Restaurants);


interface RestaurantsProps {
    restaurants: RestaurantModel[];
    getRestaurants:()=>{
        type: string,
        payload: Promise<AxiosResponse>
    }
}