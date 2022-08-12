import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ( Component, isAdmin ) => {

    const { isAuthenticated = false, user  } = useSelector((state) => state.auth);

    if (isAdmin === true && user.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return isAuthenticated === false ? <Navigate to="/login" /> : <Component />; 

};

export default ProtectedRoute;
