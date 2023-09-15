import React, {Component, useEffect, useState} from 'react';
import {connect} from "react-redux";


import axios, {AxiosResponse} from "axios";
import {getMenuItemsByRestaurantId} from "../actions/menuItem.action";
import {MenuItemModel} from "../models/menuItem.model";
import {ReduxState} from "../constants/constant";
import MenuItem from "./menu/MenuItem";
import {RouteComponentProps} from "react-router";


class Menus extends Component<MenuProps, any> {

    constructor(props:MenuProps) {
        super(props);
        this.state = {
            categories: [] as string[],
            isEmpty:true
        };
    }


    componentDidMount() {
        console.log(this.state.categories.length);
        axios.get('http://localhost:8080/menu_items/categories/' + this.props.restaurantId).then(response=>response.data.length&&this.setState({categories: response.data,isEmpty:false}));
        this.props.getMenuItemsByRestaurantId(this.props.restaurantId);
        console.log(this.state.categories.length);
    }

    render() {
        // console.log(this.state.categories?.length);
        //console.log(!!this.state.categories.length);
        // return !this.state.isEmpty?
        return !!this.state.categories.length?
            <div>{

                this.state.categories?.map((e: string) => {
                    return (
                        <div key={e}>
                            <h2><b>{e}</b></h2>
                            {/*{MenuItemsByCategory(e,this.props.restaurantId)}*/}
                            {this.props.menuItems?.filter((mi: MenuItemModel) => mi.category === e).map(element => {
                                return (
                                    <MenuItem menuItem={element} key={element.id}/>
                                );
                            })}
                        </div>
                    )
                })
            }
            </div>
            :
        <div><h1>This restaurant doesn't have any item yet. Please come back later.</h1></div>
    }
}


function mapStateToProps({menuItems}: ReduxState,ownProps:MenuProps) {
    const restaurantId= +ownProps.match.params.restaurantId;
    return {menuItems,restaurantId} as MenuProps;
}

export default connect(mapStateToProps, {getMenuItemsByRestaurantId})(Menus);

interface MenuProps extends RouteComponentProps<{ restaurantId: string }> {
    menuItems: MenuItemModel[];
    restaurantId:number;
    getMenuItemsByRestaurantId:(restaurantId:number)=>{
        type: string,
        payload: Promise<AxiosResponse>
    }
}

// export function MenuItemsByCategory(c:string,id:number){
//     const [menuItems, setMenuItems] = useState([] as MenuItemModel[]);
//
//     useEffect(() => {
//         axios.get('http://localhost:8080/menu_items/categories/'+id+'/'+c)
//             .then(response=>setMenuItems(response.data));
//     }, []);
//
//     return (
//             menuItems.map(element => {
//             return (
//                 <MenuItem menuItem={element} key={element.id}/>
//             );
//         })
//
//     );
//
// }