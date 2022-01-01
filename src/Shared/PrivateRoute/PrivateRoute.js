import React from 'react';
import { Redirect, Route } from 'react-router';

import spinner from '../../assets/images/spinner.gif';
import useAuth from '../../Hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user,loading } = useAuth()

    if(loading){
        return <div>
            <img className="mx-auto" src={spinner} alt="spinner" />
        </div>
    }
    return (

        <Route
            {...rest}
            render={({ location }) =>
                user.email ? (
                    children
                ) :
                 (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location }
                        }}
                    />
                )
            }
        />

    );
};

export default PrivateRoute;