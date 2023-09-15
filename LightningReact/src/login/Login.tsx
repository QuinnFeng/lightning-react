import React, {SyntheticEvent} from 'react';
import css from './Login.module.scss'
import {useDispatch} from "react-redux";
import {login} from "../actions/auth.action";
import {RouteComponentProps} from "react-router";
import appConstants from "../constants/constant";

// a children of route component
// interface LoginProps extends RouteComponentProps {
//
// }

interface LoginProps extends RouteComponentProps {

}

// a functional component, just return....
export const Login = (/*props: LoginProps*/) => {

    // use states returns an array
    // destructing!!!!!!!!!!!!!!!!   useState hook, common in hook
    const [user, setUser] = React.useState({
        username: '',
        password: '',
    });

    //useDispatch from react-redux
    const dispatch = useDispatch();

    // always const or let inside a function
    const updateHandler = (event: SyntheticEvent) => {
        const ele = event.target as HTMLInputElement;
        setUser({...user, [ele.id]: ele.value});
    };

    const submitHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(login(
            user,
            () => null /*props.history.push(appConstants.restaurantsRoute)*/,
            (msg: string) => console.log(msg)
        ));
    };

    return (
        <form
            className={css.EditProduct}
            onSubmit={submitHandler} // same as use button to submit( onClick on button )
        >
            <h2>Login in</h2>
            <label htmlFor="username">Username:</label>
            <input
                onChange={updateHandler}
                value={user.username}
                className="form-control"
                type="text"
                name="username"
                id="username"/>
            <label htmlFor="password">Password:</label>
            <input
                onChange={updateHandler}
                value={user.password}
                className="form-control"
                type="text"
                name="password" id="password"/>
            <br/>
            <button
                className="btn btn-success">
                Login
            </button>
        </form>
    );
};
