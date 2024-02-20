import { enviourment } from "../enviourment/enviourment";
import { checkEitherLoggedInorNot, displayNotification } from "../../../utlts/admin/functions";
import { Navigate, Outlet, Route } from "react-router-dom";
import { Component, useEffect, useState } from "react";

const AuthProtectedRoutes = ({Component}) => {
    checkEitherLoggedInorNot();
    const isLogged = localStorage.getItem('access-token');
      return (isLogged != '') ? <Component /> : <Navigate to="/admin/login" />;
    
}

export default AuthProtectedRoutes;