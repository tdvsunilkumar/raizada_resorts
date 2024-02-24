import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const Main = ({children}) =>{
    return (
        <>
        <Header />
        <Sidebar />
        <main id="main" className="main">{children}</main>
        <Footer />
        </>
        
    );

}

export default Main;