import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { displayNotification } from "../../../../utlts/admin/functions";

const Register = () => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const termsConditions = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\n when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    const handleShow = () => {
        setShow(true);
    }

    const handleHide = () => {
        setShow(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const form = event.currentTarget;
        
        if (form.checkValidity() === true) {
            const pasw = event.target.password.value;
            const confirmPsw = event.target.confirm_password.value;
            console.log(pasw+' '+confirmPsw);
            if(pasw !== confirmPsw){
                displayNotification('Password Does not match!','error');
            }else{
                alert('Go ahead');
            }

        }
        setValidated(true);

       
    }

    return(
       <Layout>
        <div className="card mb-3">

<div className="card-body">

  <div className="pt-4 pb-2">
    <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
    <p className="text-center small">Enter your personal details to create account</p>
  </div>

  <Form noValidate validated={validated} className="row g-3 needs-validation" onSubmit={handleSubmit}>
    <div className="col-12">
      <label htmlFor="name" className="form-label">Your Name</label>
      <Form.Control 
      required
      className="form-control" 
      type="text" 
      name="name"
      ></Form.Control>
      <Form.Control.Feedback className="invalid-feedback" type="invalid">Name is invalid!</Form.Control.Feedback>
    </div>

    <div className="col-12">
      <label htmlFor="email" className="form-label">Your Email</label>
      <Form.Control 
      required
      className="form-control" 
      type="email" 
      name="email"
      ></Form.Control>
      <Form.Control.Feedback className="invalid-feedback" type="invalid">Email is invalid!</Form.Control.Feedback>
    </div>

    <div className="col-12">
      <label htmlFor="password" className="form-label">Password</label>
      <div className="input-group has-validation">
      <Form.Control 
      required
      className="form-control" 
      type="password" 
      name="password"
      
      ></Form.Control>
      <Form.Control.Feedback className="invalid-feedback" type="invalid">Password is invalid!</Form.Control.Feedback>
      </div>
    </div>

    <div className="col-12">
      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
      <Form.Control 
      
      required
      className="form-control" 
      type="password" 
      name="confirm_password"
      ></Form.Control>
      <Form.Control.Feedback className="invalid-feedback" type="invalid">Password is invalid!</Form.Control.Feedback>
    </div>

    <div className="col-12">
      <Form.Check
          required
          label={<span>I agree and accept the <a  onClick={handleShow}>terms and conditions</a></span>}
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
    </div>
    <div className="col-12">
      <Button type="submit" className="btn btn-primary w-100">Create Account</Button>
    </div>
    <div className="col-12">
      <p className="small mb-0">Already have an account? <Link to='/admin'>Login</Link></p>
    </div>
 </Form>

</div>
</div>
<Modal 
show={show} 
onHide={handleHide}
>
<Modal.Header closeButton>
          <Modal.Title>Terms And Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>{termsConditions}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
</Modal>
       </Layout>
    );
}

export default Register;