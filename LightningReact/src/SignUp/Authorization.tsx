import {Component} from "react";
import {Login} from "../login/Login";
import {SignUp} from "./SignUp";

class Authorization extends Component<any, any>{

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
                <div>
                    <span><button style={{backgroundColor:this.state.isSignIn?'black':'white',color:!this.state.isSignIn?'black':'white'}}
                                  onClick={()=>this.setState({isSignIn:true})}>
                            Sign In
                        </button>
                        <button style={{backgroundColor:!this.state.isSignIn?'black':'white',color:this.state.isSignIn?'black':'white'}} onClick={()=>this.setState({isSignIn:false})}>
                            Sign Up
                        </button>
                    </span>
                    {this.state.isSignIn?<Login />:<SignUp/>}
                </div>
            </div>
            </>
    }
}

export default Authorization;