import React from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoadder } from "../../Context/LoaderContext";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { sendEmailForgotPassword } from "../../Users/UserAPI";
import { test } from "../../Users/UserAPI";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const {loading, setLoading} = useLoadder(true);

  const handleForgorPassword = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
        if (form.checkValidity() === true) {
            const formData = {
              'email'    : event.target.email.value
            };
            setLoading(true);
            await sendEmailForgotPassword(formData,navigate);
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
    <h5 className="card-title text-center pb-0 fs-4">Forgot Password</h5>
    <p className="text-center small">Enter your email to generate forgot password link</p>
  </div>

  <Form noValidate validated={validated} onSubmit={handleForgorPassword} className="row g-3 needs-validation">

    <div className="col-12">
      <label htmlFor="yourUsername" className="form-label">Email Address</label>
      <div className="input-group has-validation">
       
      <Form.Control
        required
        type="email" 
        name="email" 
        className="form-control"
        ></Form.Control>
        <Form.Control.Feedback type="invalid">Email is invalid!</Form.Control.Feedback>
        
      </div>
    </div>
   
    <div className="col-12">
      <button className="btn btn-primary w-100" type="submit">Send Link</button>
    </div>
    <div className="col-12">
      <p className="small mb-0 text-center"><Link to='/admin'>Login Here</Link></p>
    </div>
  </Form>

</div>
</div>
        </Layout>
    );
}

export default ForgotPassword;