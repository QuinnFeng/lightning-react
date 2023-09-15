import React, {SyntheticEvent} from "react";
import css from "../style/common.module.scss";
import CustomPopup from "../util/CustomPopup";
import {ItemModel} from "../models/item.model";
import {connect} from "react-redux";
import {deleteItem, editQuantity} from "../actions/item.action";
import {ReduxState} from "../constants/constant";

class Item extends React.Component<ItemProps, any> {

    constructor(props:ItemProps) {
        super(props);
        this.state = {
            visibility:true,
            quantity:props.item.quantity,
            componentVisibility:true
        };
    }

    setVisibility(value:boolean){
        this.setState({visibility:value});
    }

    // setComponentVisibility(value:boolean){
    //     this.setState({componentVisibility:value});
    // }

    incrementHandler=()=>{
        this.setState({quantity:this.state.quantity+1});
    };

    decrementHandler=()=>{
        this.setState({quantity:this.state.quantity>0?this.state.quantity-1:0});
    }

    deleteItemHandler=(item:ItemModel)=>{
        this.setState({componentVisibility:false});
        this.props.deleteItem(item);
    }


    render() {
        return (
            this.state.componentVisibility?
        <div /*style={{visibility:this.state.componentVisibility?"visible":"hidden"}}*/>
            <div style={{visibility:this.state.visibility?"hidden":"visible"}}>
                {this.state.quantity>1?<span><button onClick={()=>this.decrementHandler()} >&#8722;</button></span>
                    :<span><button onClick={()=>this.deleteItemHandler(this.props.item)}><img src={require('../assets/miscellaneous/trash.png')} width={"30px"} height={"20px"}alt={"trash"}/></button></span>}
                <span><input min="0" max="99999" type="number" name="quantity" value={this.state.quantity} width="100px" id="quantity"
                             onChange={(event:SyntheticEvent)=>this.setState({quantity:+(event.target as HTMLInputElement).value})}/></span>
                <span><button onClick={()=>this.incrementHandler()} >&#43;</button></span>
            </div>
            <button onClick={() => this.setVisibility(false)} style={{visibility:this.state.visibility?"visible":"hidden"}}><span>&times;</span>{this.state.quantity}</button>
            <h3><b>{this.props.item.name}</b></h3>
            <p>{this.props.item.description}</p>
            <span><button onClick={()=>this.deleteItemHandler(this.props.item)}><img src={require('../assets/miscellaneous/trash.png')} width={"30px"} height={"20px"} alt={"trash"}/></button></span>
            <p>${(this.props.item.price*this.state.quantity).toFixed(2)}</p>
        </div>
            :null
        );
    }
}
// function mapStateToProps({cart}: ReduxState) {
//     return {cart};
// }

export default connect(null,{deleteItem,editQuantity})(Item);

interface ItemProps {
    item:ItemModel;
    deleteItem: (item:ItemModel) => void;
    editQuantity: (item:ItemModel) => void;
}

