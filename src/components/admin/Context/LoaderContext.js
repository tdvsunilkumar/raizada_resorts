import React, { createContext, useState } from "react";
import { useContext } from "react";

const LoaderContext = createContext({});


export function LoaderProvider ({children}){
    const [loading, setLoading] = useState(true);
    

    const value = { loading, setLoading};
    return (
        <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
      );

}

export function useLoadder() {
    const context = useContext(LoaderContext);
    if (!context) {
      throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
}