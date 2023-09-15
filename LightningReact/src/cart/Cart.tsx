import {ItemModel} from "../models/item.model";
import React, {Component, SyntheticEvent} from "react";
import {connect} from "react-redux";
import {ReduxState} from "../constants/constant";
import {MenuItemModel} from "../models/menuItem.model";
import MenuItem from "../menus/menu/MenuItem";
import Item from "./Item";
import {deleteItem, editQuantity} from "../actions/item.action";
import {cart} from "../reducers/items.reducer";
import axios from "axios";
import Restaurant from "../restaurants/restaurant/Restaurant";

class Cart extends Component<CartProps, any> {

    constructor(props:CartProps) {
        super(props);
        this.state = {
            //visibilities: {...b}
            total:0,
            restaurantName:'',
            visibilities:new Array(this.props.cart.length).fill(true) as boolean[],
            //visibilities:Array.apply(true,new Array(this.props.cart.length)),
            quantities: new Array(this.props.cart.length) as number[]
        }
        for (let i = 0; i < this.props.cart.length; i++) {
            //this.state.visibilities[i]=true;
            this.state.quantities[i]=this.props.cart[i].quantity;

        }
        // console.log(this.state.quantities);
        // console.log(this.state.visibilities);
    }

    componentDidMount() {
        if(this.props.cart.length>0) {
            axios.get('http://localhost:8080/restaurants/menuItemId=' + `${this.props.cart[0].menuItemId}`).then(response => this.setState({restaurantName: response.data.name}));
        }
        let c=0;
        for (let i = 0; i < this.props.cart.length; i++) {
            //this.state.visibilities[i]=true;
            c+=this.props.cart[i].quantity*this.props.cart[i].price;
        }
        this.setState({total:c.toFixed(2)});
    }

    static getDerivedStateFromProps(props:CartProps,state:any) {
        if (props.cart?.length > state.quantities.length) {
            let q= new Array(props.cart.length) as number[];
                    for (let i = 0; i <q.length; i++) {
                        //this.state.visibilities[i]=true;
                        q[i]=props.cart[i].quantity;
                    }
                    return {visibilities:new Array(props.cart?.length).fill(true) as boolean[],quantities:[...q]};
        }
        return state;
    }

    setVisibility(value:boolean,index:number){
        const vs=new Array(this.props.cart.length).fill(true) as boolean[];
        vs[index]=value;
        this.setState({visibilities:[...vs]});
    }

    // editAmountHandler=(index:number,isIncrement:boolean)=>{
    //     const qs={...this.state.quantites} as number[];
    //     qs[index]=isIncrement?qs[index]+1:this.state.quantities[index]>0?this.state.quantities[index]-1:0;
    //     this.setState({quantities:{...qs}});
    // }

    incrementHandler=(index:number)=>{
        const qs=[...this.state.quantities];
        qs[index]+=1;
        this.setState({quantities: [...qs]/*,total:(this.state.total-this.props.cart[index].price*(-1)).toFixed(2)}*/});
        //console.log(this.state.quantities);
    };

    decrementHandler=(index:number)=> {
        // if(this.state.quantities[index]===1){
        //     this.deleteItemHandler(this.props.cart[index],index);
        // }
        const qs = [...this.state.quantities];
        qs[index] +=-1;
        this.setState({quantities:[...qs]});
    }



    deleteItemHandler=(item:ItemModel,index:number)=>{
        const qs=[...this.state.quantities];
        const vs=[...this.state.visibilities];
        this.setState({quantities:[...qs.slice(0,index),...qs.slice(index)],visibilities:[...vs.slice(0,index),...vs.slice(index)]});
        this.props.deleteItem(item);
    }


    setQuantityHandler(event:SyntheticEvent,index:number){
        const qs=[...this.state.quantities];
        qs[index] = +(event.target as HTMLInputElement).value;
        if(qs[index]==0){
            return;
        }
       this.setState({quantities:[...qs]});
    }

    editQuantityHandler(index:number){
        const I:ItemModel =  this.props.cart[index];
        let difference =((this.state.quantities[index]-this.props.cart[index].quantity)*this.props.cart[index].price);
        I.quantity=this.state.quantities[index];
        this.props.editQuantity(I);
        this.setVisibility(true,index);
        this.setState({total:(this.state.total-difference*(-1.00))});
    }

    // autoSaveHandler(index:number){
    //     setTimeout(() => {
    //         this.editQuantityHandler(index);
    //     }, 5000);
    // }

    render() {
        //console.log(this.state);
        return !!this.props.cart.length?
        <div>
            <p>Your cart from</p>
            <p>{this.state.restaurantName}</p>
            {
                this.props.cart?.map((element: ItemModel,index) => {
                    return (
                        <div key={element.id}>
                            {!this.state.visibilities[index]?

                                <div>
                                    {this.state.quantities[index] > 1 ?
                                        <span><button onClick={() => this.decrementHandler(index)}>&#8722;</button></span>
                                        :
                                        <span><button onClick={()=>this.deleteItemHandler(element,index)}><img src={require('../assets/miscellaneous/trash.png')} width={"30px"} height={"20px"} alt={"trash"}/></button></span>
                                    }
                                    <span><input min="1" max="99999" type="number" name="quantity"
                                                 value={this.state.quantities[index]} width="100px" id="quantity"
                                                 onChange={(event: SyntheticEvent) => this.setQuantityHandler(event, index)}/></span>
                                    <span><button
                                        onClick={() => this.incrementHandler(index)}>&#43;</button></span><br/>
                                    <button onClick={()=>this.editQuantityHandler(index)}>save</button>
                                </div>
                                :
                                <div>
                                    <button onClick={() => this.setVisibility(false, index)}
                                            /*style={{visibility: this.state.visibilities[index] ? "visible" : "hidden"}}*/>
                                        <span>&times;{this.state.quantities[index]}</span></button>
                                </div>
                            }
                            <span><button onClick={()=>this.deleteItemHandler(element,index)}><img src={require('../assets/miscellaneous/trash.png')} width={"30px"} height={"20px"} alt={"trash"}/></button></span>
                            <h3><b>{element.name}</b></h3>
                            <p>{element.description}</p>
                            <p>${(element.price*this.props.cart[index].quantity).toFixed(2)}</p>
                        </div>
                    )
                })
            }
            <button><p>Checkout   ${this.state.total}</p></button>
        </div>
            :
            <div key={"100"}><h1>Your cart is empty.</h1></div>
    }
}

function mapStateToProps({cart}: ReduxState) {
    return {cart};
}

export default connect(mapStateToProps,{deleteItem,editQuantity})(Cart);

interface CartProps {
    cart: ItemModel[];
    deleteItem: (item:ItemModel) => void;
    editQuantity: (item:ItemModel) => void;
}



