import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { login } from "../../Users/UserAPI";
import { Navigate } from "react-router-dom";
import { checkEitherLoggedInorNot } from "../../../../utlts/admin/functions";
import { useLoadder } from "../../Context/LoaderContext";

const Login = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const {loading, setLoading} = useLoadder();
  const isLogged = localStorage.getItem('access-token');
 

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
        
        if (form.checkValidity() === true) {
            const formData = {
              'email'    : event.target.email.value,
              'password' : event.target.password.value,
            };
            setLoading(true);
            await login(formData,navigate);
            setLoading(false);

        }
        setValidated(true);


  }

  useEffect(()=>{
    console.log(document.readyState);
    if(document.readyState === "complete"){
      setLoading(false);
    }
    setLoading(false);

  },[]);


    return(
        <Layout> 
            <div className="card mb-3">

<div className="card-body">

  <div className="pt-4 pb-2">
    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
    <p className="text-center small">Enter your username & password to login</p>
  </div>

    <Form className="row g-3 needs-validation" validated={validated} onSubmit={handleLogin}>

    <div className="col-12">
      <label htmlFor="yourUsername" className="form-label">Email Address</label>
      <div className="input-group has-validation">
        <Form.Control
        required
        type="email" 
        name="email" 
        defaultValue='admin@admin.com'
        className="form-control"
        ></Form.Control>
        <Form.Control.Feedback type="invalid">Email is invalid!</Form.Control.Feedback>
      </div>
    </div>

    <div className="col-12">
      <label htmlFor="yourPassword" className="form-label">Password</label>
      <Form.Control
        required
        type="password" 
        name="password" 
        defaultValue="123456"
        className="form-control"
        ></Form.Control>
        <Form.Control.Feedback type="invalid">Password is invalid!</Form.Control.Feedback>
    </div>

    {/* <div className="col-12">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
      </div>
    </div> */}
    <div className="col-12">
      
      <Button type="submit" className="btn btn-primary w-100">Login</Button>
    </div>
    <div className="col-12">
      <p className="small mb-0">Don't have account? <Link to='/admin/register'>click here</Link></p>
    </div>
    <div className="col-12">
      <p className="small mb-0">Forgot Password? <Link to='/admin/forgot-password'>click here</Link></p>
    </div>
    </Form>

</div>
</div>
        </Layout>
    );
}

export default Login;