import React, { useEffect } from "react";
import { useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import { CSSProperties } from 'react';
import { useLoadder } from "../Context/LoaderContext";

const override: CSSProperties = {
  //display: "block",
  //width:"100%",
  borderColor: "#4154f1",
  position: "absolute",
  left:"50%",
  top:"50%",
  zIndex : "9999",
  backgroundColor: "rgba(255,255,255,0.7)"
};
  
const Loader = () =>{
    const color = "red";
    const {loading, setLoading} = useLoadder();
    useEffect(()=>{
      
    });
    return (
      <div className={loading ? 'sweet-loading' :''}>
        <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />  </div>

    );

}

export default Loader;