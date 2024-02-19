import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";


const ForgotPassword = () => {
    return(
        <Layout>
             <div className="card mb-3">

<div className="card-body">

  <div className="pt-4 pb-2">
    <h5 className="card-title text-center pb-0 fs-4">Forgot Password</h5>
    <p className="text-center small">Enter your email to generate forgot password link</p>
  </div>

  <form className="row g-3 needs-validation" noValidate>

    <div className="col-12">
      <label htmlFor="yourUsername" className="form-label">Email Address</label>
      <div className="input-group has-validation">
       
        <input type="text" name="username" className="form-control" id="yourUsername" required />
        <div className="invalid-feedback">Please enter your email address to send link.</div>
      </div>
    </div>
   
    <div className="col-12">
      <button className="btn btn-primary w-100" type="submit">Send Link</button>
    </div>
    <div className="col-12">
      <p className="small mb-0 text-center"><Link to='/admin'>Login Here</Link></p>
    </div>
  </form>

</div>
</div>
        </Layout>
    );
}

export default ForgotPassword;