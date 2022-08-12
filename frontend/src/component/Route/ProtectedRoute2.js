import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute2 = ({ component: Component, ...rest }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.auth);

    return (
        <React.Fragment>
            {loading === false && (
                <Route {...rest}
                    element={() => {
                        if (isAuthenticated === false) { return <Navigate to="/login" replace />;}

                        return <Component />;
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default ProtectedRoute2;
