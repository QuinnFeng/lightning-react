import React,{Component} from "react";
import MenuItem from "./menu/MenuItem";
import {ReduxState} from "../constants/constant";
import {connect} from "react-redux";
import {getMenuItemsByRestaurantIdAndCategory} from "../actions/menuItem.action";
import {MenuItemModel} from "../models/menuItem.model";
import {AxiosResponse} from "axios";


class MenuItemsByRestaurantIdAndCategory extends Component<MenuItemsProps, any> {

    componentDidMount() {
        this.props.getMenuItemsByRestaurantIdAndCategory(this.props.category,this.props.restaurantId);
    }

    render() {
        console.log(this.props.menuItems);
        return  <div>
                {this.props.menuItems?.map(element => {
                    return (
                        // <MenuItem MenuItem={element} key={element.id}/>
                        <MenuItem menuItem={element} key={element.id}/>
                    );
                })}
            </div>
    }
}



function mapStateToProps({menuItems}: ReduxState) {
    return {menuItems};
}

export default connect(mapStateToProps, {getMenuItemsByRestaurantIdAndCategory})(MenuItemsByRestaurantIdAndCategory);

interface MenuItemsProps {
    menuItems: MenuItemModel[];
    category:string;
    restaurantId:number;
    getMenuItemsByRestaurantIdAndCategory: (category:string,restaurantId:number) => {
        type: string,
        payload: Promise<AxiosResponse>
    }
}