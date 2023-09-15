import React, {Component, SyntheticEvent, useState} from "react";
import {appConstants, ReduxState} from "../constants/constant";
import css from './Categories.module.scss'
import {connect} from "react-redux";
import {getCategories} from "../actions/categories.action";
import {AxiosResponse} from "axios";
import {CategoryModel} from "../models/category.model";
import {Link} from "react-router-dom";
import RestaurantsByCategory from "../restaurants/RestaurtantsByCategory";
import {checkLogin} from "../actions/auth.action";


class Categories extends Component<CategoriesProps, any> {
    // constructor(CategoriesProps:CategoriesProps) {
    //     super(CategoriesProps);
    // }
    componentDidMount() {
        // mount the react elements below to the mount
        // mounted then we can send ajax request
        // when the components is in the DOM, then call this.props.categories......
        // whose default state is null.
        this.props.getCategories();
    }


    // renderCategories=()=>{
    //     this.props.categories?.map(element => {
    //         return (
    //             <div key={element.id} className={css.InnerDiv}>
    //                 {/*<div key={element.id}>*/}
    //                 {/*    /!*<span><img src=appConstants.Barbeque alt={element.name} width="130px"/></span>*!/*/}
    //                 {/*    <span>{element.name}</span>*/}
    //                 {/*</div>*/}
    //                 <p><img src={require(`../assets/images/${element.name}.jpg`)} alt={element.name} width="80px"/></p>
    //                 <p>{element.name}</p>
    //             </div>
    //         )
    //     })
    // }

    render() {

        return (

            <div key={'categories'}>
                {
                    this.props.categories?.map(element => {
                        return (
                            <Link key={element.name}  to={`${appConstants.restaurantsByCategoryRoute}/${element.name}`}>
                                <div key={element.id} className={css.InnerDiv}>
                                    <p><img
                                        src={require(`../assets/images/${element.name}.jpg`)} alt={element.name}
                                        width="80px" height="60px"/></p>
                                    <p>{element.name}</p>
                                </div></Link>
                        )
                    })
                }
            </div>

        )
    }
}

function mapStateToProps({categories}: ReduxState) {
    return {categories};
}

export default connect(mapStateToProps, {getCategories})(Categories);

interface CategoriesProps {
    categories: CategoryModel[];
    getCategories: () => {
        type: string,
        payload: Promise<AxiosResponse>
    }
}

