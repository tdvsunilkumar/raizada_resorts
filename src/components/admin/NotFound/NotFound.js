import React from "react";
import Layout from "../Auth/Layout/Layout";
import NotFoundImage from  '../assets/img/not-found.svg'
const NotFound = () => {
    return(
        <Layout>
            <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>404</h1>
        <h2>The page you are looking for doesn't exist.</h2>
        <a className="btn" href="index.html">Back to home</a>
        <img src={NotFoundImage} className="img-fluid py-5" alt="Page Not Found" />
        <div className="credits">
          
        </div>
      </section>
        </Layout>
    );
}

export default NotFound;