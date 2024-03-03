import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import UpdateProfilePic from "./UpdateProfilePic";
import { useLoadder } from "../../../Context/LoaderContext";
import { enviourment } from "../../../enviourment/enviourment";
import { useProfile } from "../ProfileContext";
import { updateProfileData } from "../../UserAPI";

const EditProfile = () => {
    const [show, setShow] = useState(false);
    const {loading, setLoading} = useLoadder();
    const {profileData, getProfileData} = useProfile();
    const [validated, setValidated] = useState(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleHide = () => {
        setShow(false);
    }

    const displayEditProfileData = async() =>{
      setLoading(true);
      getProfileData();
      setLoading(false);
    }

    const handleUpdateProfile = async (event) =>{
      event.preventDefault();
        
        const form = event.currentTarget;
        
        if (form.checkValidity() === true) {
          
                const formData = {
                  'name'     : event.target.name.value,
                  'email'    : event.target.email.value,
                  'mobile'   : event.target.mobile.value,
                  'address'  : event.target.address.value, 
                  'about_me'     : event.target.about_me.value,
                  'company_name'    : event.target.company_name.value,
                  'designation'   : event.target.designation.value,
                  'twitter_profile'  : event.target.twitter_profile.value, 
                  'facebook_profile'    : event.target.facebook_profile.value,
                  'instagram_profile'   : event.target.instagram_profile.value,
                  'linkedin_profile'  : event.target.linkedin_profile.value, 
                  'update' : 'data'
                };
                setLoading(true);
                await updateProfileData(formData);
                await getProfileData();
                setLoading(false);

        }
        setValidated(true);


    }

    useEffect(() => {
      displayEditProfileData();
    }, []);

    return (
        <>
    <div className="tab-pane fade show active profile-edit pt-3" id="profile-edit">
                  
                    <div className="row mb-3">
                      <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                      <div className="col-md-2 col-lg-2">
                        <img src={(profileData.profile_image !== null)?enviourment.BASE_BACKEND_URL+profileData?.profile_image:enviourment.DEFAULT_PROFILE_PIC} alt="Profile"  />
                        
                        <div className="pt-2">
                          <a href="#" className="btn btn-primary btn-sm" title="Upload new profile " onClick={handleShow} ><i className="bi bi-pencil"></i></a>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-7">
                     
                      </div>
                    </div>
                  <Form onSubmit={handleUpdateProfile} noValidate validated={validated}>
                    <div className="row mb-3">
                      <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                      <div className="col-md-8 col-lg-9">
                        <Form.Control
                        name="name"
                        type="text"
                        className="form-control"
                        defaultValue={profileData?.name}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Invalid Name</Form.Control.Feedback>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                      <div className="col-md-8 col-lg-9">
                      <Form.Control
                        name="about_me"
                        type="textarea"
                        className="form-control"
                        defaultValue={profileData?.about_me}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Invalid Bout Us</Form.Control.Feedback>
                        
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Company</label>
                      <div className="col-md-8 col-lg-9">
                      <Form.Control
                        name="company_name"
                        type="text"
                        className="form-control"
                        defaultValue={profileData?.company_name}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Invalid Company</Form.Control.Feedback>
                        
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Job</label>
                      <div className="col-md-8 col-lg-9">
                      <Form.Control
                        name="designation"
                        type="text"
                        className="form-control"
                        defaultValue={profileData?.designation}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Invalid designation</Form.Control.Feedback>
                       
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Country</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="country" type="text" className="form-control" id="Country" defaultValue="INDIA" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                      <div className="col-md-8 col-lg-9">
                      <Form.Control
                        name="address"
                        type="text"
                        className="form-control"
                        defaultValue={profileData?.address}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Invalid address</Form.Control.Feedback>
                        
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                      <div className="col-md-8 col-lg-9">
                      <Form.Control
                        name="mobile"
                        type="text"
                        className="form-control"
                        pattern="[789][0-9]{9}"
                        defaultValue={profileData?.mobile}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Invalid mobile</Form.Control.Feedback>
                        
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                      <div className="col-md-8 col-lg-9">
                      <Form.Control 
                      required
                      className="form-control" 
                      type="email" 
                      name="email"
                      defaultValue={profileData?.email}
                      ></Form.Control>
                     <Form.Control.Feedback className="invalid-feedback" type="invalid">Email is invalid!</Form.Control.Feedback>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Twitter" className="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
                      <div className="col-md-8 col-lg-9">
                      <Form.Control 
                      
                      className="form-control" 
                      type="url" 
                      name="twitter_profile"
                      defaultValue={profileData?.twitter_profile}
                      ></Form.Control>
                     <Form.Control.Feedback className="invalid-feedback" type="invalid">Only URL allowed</Form.Control.Feedback>
                       
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Facebook" className="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
                      <div className="col-md-8 col-lg-9">
                      <Form.Control 
                      
                      className="form-control" 
                      type="url" 
                      name="facebook_profile"
                      defaultValue={profileData?.facebook_profile}
                      ></Form.Control>
                     <Form.Control.Feedback className="invalid-feedback" type="invalid">Only URL allowed</Form.Control.Feedback>
                        
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Instagram" className="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
                      <div className="col-md-8 col-lg-9">
                      <Form.Control 
                      
                      className="form-control" 
                      type="url" 
                      name="instagram_profile"
                      defaultValue={profileData?.instagram_profile}
                      ></Form.Control>
                     <Form.Control.Feedback className="invalid-feedback" type="invalid">Only URL allowed</Form.Control.Feedback>
                        
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
                      <div className="col-md-8 col-lg-9">
                      <Form.Control 
                      
                      className="form-control" 
                      type="url" 
                      name="linkedin_profile"
                      defaultValue={profileData?.linkedin_profile}
                      ></Form.Control>
                     <Form.Control.Feedback className="invalid-feedback" type="invalid">Only URL allowed</Form.Control.Feedback>
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                    </Form>

                </div>
                <UpdateProfilePic show={show} handleHide={handleHide} handleShow={handleShow} displayEditProfileData={displayEditProfileData} />
                </>
    );

}
export default EditProfile;