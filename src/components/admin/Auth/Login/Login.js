import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

const Login = () => {
    return(
        <Layout> 
            <div className="card mb-3">

<div className="card-body">

  <div className="pt-4 pb-2">
    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
    <p className="text-center small">Enter your username & password to login</p>
  </div>

  <form className="row g-3 needs-validation" noValidate>

    <div className="col-12">
      <label htmlFor="yourUsername" className="form-label">Username</label>
      <div className="input-group has-validation">
        <span className="input-group-text" id="inputGroupPrepend">@</span>
        <input type="text" name="username" className="form-control" id="yourUsername" required />
        <div className="invalid-feedback">Please enter your username.</div>
      </div>
    </div>

    <div className="col-12">
      <label htmlFor="yourPassword" className="form-label">Password</label>
      <input type="password" name="password" className="form-control" id="yourPassword" required />
      <div className="invalid-feedback">Please enter your password!</div>
    </div>

    <div className="col-12">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
      </div>
    </div>
    <div className="col-12">
      <button className="btn btn-primary w-100" type="submit">Login</button>
    </div>
    <div className="col-12">
      <p className="small mb-0">Don't have account? <Link to='/admin/register'>click here</Link></p>
    </div>
    <div className="col-12">
      <p className="small mb-0">Forgot Password? <Link to='/admin/forgot-password'>click here</Link></p>
    </div>
  </form>

</div>
</div>
        </Layout>
    );
}

export default Login;