import {Component} from "react";
import {SignUp} from "../SignUp/SignUp";
import {Login} from "../login/Login";
import css from './CheckOut.module.scss'
import Authorization from "../SignUp/Authorization";

export default class CheckOut extends Component<any, any>{

    constructor(props:any) {
        super(props);
        this.state={
            isSignIn:true,
            signedIn:false,
            isDelivery:true
        }
    }

    render() {
        return <>
            <div>
                <button><span>&#8592;Back to Store</span></button>
                <p>Lightning Force</p>
            </div>
            <div>
                <div>
                    {
                        this.state.signedIn?
                        <>
                            <h1>1.Account details</h1><Authorization/>
                        </>
                        :
                        <h1>1.Account details</h1>
                    }
                </div>
            </div>
            <div>
                <h1>2.Shipping details</h1>
                <span>
                    <button style={{backgroundColor:this.state.isDelivery?'black':'white',color:!this.state.isDelivery?'black':'white'}}
                              onClick={()=>this.setState({isDelivery:true})}>
                            Delivery
                        </button>
                        <button style={{backgroundColor:!this.state.isDelivery?'black':'white',color:this.state.isDelivery?'black':'white'}} onClick={()=>this.setState({isDelivery:false})}>
                            Pick up
                        </button>
                </span>
            </div>
        </>
    }
}