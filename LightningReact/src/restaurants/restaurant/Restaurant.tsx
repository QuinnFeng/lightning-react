import React from 'react';
import { Link } from 'react-router-dom';
import {RestaurantModel} from "../../models/restaurant.model";
import css from "../../style/common.module.scss";
import appConstants from "../../constants/constant";

const Restaurant = (props: RestaurantProps) => {
    return <Link to={`${appConstants.restaurantMenuItemsRoute}/${props.Restaurant.id}`}>
    <div className={css.InnerDiv}>
        <p><img src={props.Restaurant.image} alt={props.Restaurant.name} width="200px" height="140px"/></p>
        <p>{props.Restaurant.name}</p>
        <p>{props.Restaurant.rating}<span>&#9733;</span> ({props.Restaurant.review_count}) </p>
        <p>{props.Restaurant.categories[0].name}</p>
    </div>
    </Link>

}


export default Restaurant;


interface RestaurantProps {
    Restaurant: RestaurantModel;

}