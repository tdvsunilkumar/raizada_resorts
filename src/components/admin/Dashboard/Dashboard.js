import React, { useEffect, useState } from "react";
import { displayNotification, checkEitherLoggedInorNot} from "../../../utlts/admin/functions";
import { Navigate } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Loader from "../Loader/Loader";
import { ClipLoader } from "react-spinners";
import { useLoadder } from "../Context/LoaderContext";
const Dashboard = () => {
   const {loading, setLoading} = useLoadder();

    useEffect(()=>{
        if(document.readyState === "complete"){
            setLoading(false);
        }
    });

    return(
        <>
      
        <Main>
        <p>I am dashboard {loading}</p>
       </Main>
       
        </>
        
    );
}

export default Dashboard;