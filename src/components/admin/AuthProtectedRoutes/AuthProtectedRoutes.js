import { enviourment } from "../enviourment/enviourment";
import { checkEitherLoggedInorNot, displayNotification } from "../../../utlts/admin/functions";
import { Navigate, Outlet, Route } from "react-router-dom";
import { Component, useEffect, useState } from "react";

const AuthProtectedRoutes = ({Component}) => {
  const [token, setToken] = useState();
  const [isLoadingForCHeckValidity, setIsLoadingForCHeckValidity] = useState(false);

  const checkTokenValidity = async () => {
   if(localStorage.getItem('access-token') != ''){
    await checkEitherLoggedInorNot(); 
    setIsLoadingForCHeckValidity(true);
   }else{
    setIsLoadingForCHeckValidity(true);
   }
   
  }
      
   useEffect(()=>{
    checkTokenValidity();
  },[]);
  
  
  if(isLoadingForCHeckValidity){
    const isLogged = localStorage.getItem('access-token');
    return (isLogged != '') ? <Component /> : <Navigate to="/admin/login" />;
  }
    
  
  

    
    
    
}

export default AuthProtectedRoutes;