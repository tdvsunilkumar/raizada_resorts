import React from "react";
import Layout from "../Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoadder } from "../../Context/LoaderContext";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { displayNotification } from "../../../../utlts/admin/functions";
import { verifyChangePSWToken } from "../../Users/UserAPI";
import { changePswForGotPassword } from "../../Users/UserAPI";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const {loading, setLoading} = useLoadder(true);
  const location = useLocation();
  const [changePswToken, setchangePswToken] = useState ('');
  const [userId, setuserId] = useState ('');

  const checkTokenExistsOrNot = async () => {
    const allParams = new URLSearchParams(location.search);
    const token = allParams.get('token');
    if(token !== null){
      setchangePswToken(token);
      const res = await verifyChangePSWToken({'token':token})
      .then((response)=>{
        const newResponse = response?.data;
        if(newResponse.status == 'success'){
          const data = JSON.parse(newResponse.data);
          setuserId(data.id);
          setchangePswToken(data.token);
        }
      })
      .catch((error)=>{
        displayNotification(error?.message,'error');
      });
      setLoading(false);
    }

  }

  const handleChangePassword = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
        if (form.checkValidity() === true) {
          const pasw = event.target.password.value;
          const confirmPsw = event.target.confirm_password.value;
          if(pasw !== confirmPsw){
              displayNotification('Password Does not match!','error');
          }else{
              const formData = {
                'password' : pasw,
                'confirm_password':confirmPsw,
                'token' : changePswToken,
                'user_id' : userId
              };
              setLoading(true);
              await changePswForGotPassword(formData,navigate);
              setLoading(false);
              
          }
        }
        setValidated(true);
  }

  useEffect(()=>{
    setLoading(true);
    checkTokenExistsOrNot();
  },[]);
    return(
        <Layout>
             <div className="card mb-3">

<div className="card-body">

  <div className="pt-4 pb-2">
    <h5 className="card-title text-center pb-0 fs-4">Change Password</h5>
    <p className="text-center small">Enter your New Password</p>
  </div>

  <Form noValidate validated={validated} onSubmit={handleChangePassword} className="row g-3 needs-validation">

    <div className="col-12">
      <label htmlFor="yourUsername" className="form-label">New Password</label>
      <div className="input-group has-validation">
       
      <Form.Control
        required
        type="password" 
        name="password" 
        className="form-control"
        ></Form.Control>
        <Form.Control.Feedback type="invalid">Invalid Password!</Form.Control.Feedback>
        
      </div>
    </div>

    <div className="col-12">
      <label htmlFor="yourUsername" className="form-label">Confirm Password</label>
      <div className="input-group has-validation">
       
      <Form.Control
        required
        type="password" 
        name="confirm_password" 
        className="form-control"
        ></Form.Control>
        <Form.Control.Feedback type="invalid">Invalid Password!</Form.Control.Feedback>
        
      </div>
    </div>
   
    <div className="col-12">
      <button className="btn btn-primary w-100" type="submit">Submit</button>
    </div>
  </Form>

</div>
</div>
        </Layout>
    );
}

export default ChangePassword;