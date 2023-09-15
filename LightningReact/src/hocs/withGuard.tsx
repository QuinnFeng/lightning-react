// OldComponent is a react component
import {appConstants, ReduxState} from "../constants/constant";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export const withGuard = (OldComponent: any) => {

    const HigherOrderComponent = (props: any) => {
        // if logged in, return old component.
        // otherwise, if not logged in, navigate to login component.
        const user = useSelector((state: ReduxState) => state.user);
        // how to simulate life cycle method:  mounting, componentDidMount
        useEffect(() => {
            !user && props.history.push(appConstants.loginRoute);
            // return ()=>{}   componentWillUnmount
        }, [user, props.history.push, OldComponent]);
        // this block will be called once deps changes
        // second parameter deps: effect call depends on nothing, so only run once

        return <OldComponent/>;
            //user ?
            // :
            // <h4>No access</h4>;    // props.history.push(appConstants.loginRoute);
    };

    return HigherOrderComponent;
};