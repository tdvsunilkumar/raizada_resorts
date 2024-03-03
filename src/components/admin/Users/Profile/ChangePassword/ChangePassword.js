import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useLoadder } from "../../../Context/LoaderContext";
import { updateProfileData } from "../../UserAPI";
import { displayNotification } from "../../../../../utlts/admin/functions";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const {loading, setLoading} = useLoadder();
    const [validated, setValidated] = useState(false);

    const changePassword = async (event) =>{
      event.preventDefault();
        
        const form = event.currentTarget;
        
        
        if (form.checkValidity() === true) {
          const pasw = event.target.new_password.value;
          const confirmPsw = event.target.confirm_password.value;
          if(pasw !== confirmPsw){
              displayNotification('Password Does not match!','error');
          }else{
            const formData = {
              'c_password'     : event.target.current_password.value,
              'password'    : event.target.new_password.value,
              'confirm_password'   : event.target.confirm_password.value,
              'update' : 'psw'
            };
            setLoading(true);
            await updateProfileData(formData);
            navigate('/admin/user-profile');
            setLoading(false);

          }
        }
        setValidated(true);


    }
    

    return (
        <>
        <div className="tab-pane fade show active pt-3" id="profile-change-password">
               
        <Form onSubmit={changePassword} noValidate validated={validated}>

          <div className="row mb-3">
            <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
            <div className="col-md-8 col-lg-9">
              <Form.Control
              required
              className="form-control"
              type="password"
              name="current_password"
              ></Form.Control>
              <Form.Control.Feedback type="invalid">Invalid Current Password</Form.Control.Feedback>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
            <div className="col-md-8 col-lg-9">
            <Form.Control
              required
              className="form-control"
              type="password"
              name="new_password"
              ></Form.Control>
              <Form.Control.Feedback type="invalid">Invalid New Password</Form.Control.Feedback>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
            <div className="col-md-8 col-lg-9">
            <Form.Control
              required
              className="form-control"
              type="password"
              name="confirm_password"
              ></Form.Control>
              <Form.Control.Feedback type="invalid">Invalid Confirm Password</Form.Control.Feedback>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">Change Password</button>
          </div>
          </Form>

      </div>


</>
    );

}
export default ChangePassword;