import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import UpdateProfilePic from "./UpdateProfilePic";
const EditProfile = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleHide = () => {
        setShow(false);
    }

    const handleImagePreview = async (event) => {
        // loadImage(event.target.files[0], { maxWidth: 1000,maxHeight:1000, noRevoke:true }).then(function (data) {
        //     const img = document.createElement('img');
        //     img.src = data.image.src;
        //     if (profilePicRef.current) {
        //         profilePicRef.current.innerHTML = ''; // Clear any existing content
        //         profilePicRef.current.appendChild(data.image);
        //       }
        //   })
    }

    return (
        <>
    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                  <form>
                    <div className="row mb-3">
                      <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                      <div className="col-md-2 col-lg-2">
                        <img src="assets/img/profile-img.jpg" alt="Profile"  />
                        
                        <div className="pt-2">
                          <a href="#" className="btn btn-primary btn-sm" title="Upload new profile " onClick={handleShow} ><i className="bi bi-pencil"></i></a>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-7">
                     
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="fullName" type="text" className="form-control" id="fullName" defaultValue="Kevin Anderson" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                      <div className="col-md-8 col-lg-9">
                        <textarea name="about" className="form-control" id="about" style={{height: '100px'}}></textarea>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Company</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="company" type="text" className="form-control" id="company" defaultValue="Lueilwitz, Wisoky and Leuschke" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Job</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="job" type="text" className="form-control" id="Job" defaultValue="Web Designer" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Country</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="country" type="text" className="form-control" id="Country" defaultValue="USA" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="address" type="text" className="form-control" id="Address" defaultValue="A108 Adam Street, New York, NY 535022" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="phone" type="text" className="form-control" id="Phone" defaultValue="(436) 486-3538 x29071" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="email" type="email" className="form-control" id="Email" defaultValue="k.anderson@example.com" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Twitter" className="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="twitter" type="text" className="form-control" id="Twitter" defaultValue="https://twitter.com/#" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Facebook" className="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="facebook" type="text" className="form-control" id="Facebook" defaultValue="https://facebook.com/#" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Instagram" className="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="instagram" type="text" className="form-control" id="Instagram" defaultValue="https://instagram.com/#" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="linkedin" type="text" className="form-control" id="Linkedin" defaultValue="https://linkedin.com/#" />
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                  </form>

                </div>
                <UpdateProfilePic show={show} handleHide={handleHide} handleShow={handleShow} />
                </>
    );

}
export default EditProfile;