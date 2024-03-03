import React, { useEffect } from "react";
import { useLoadder } from "../../../Context/LoaderContext";
import { useProfile } from "../ProfileContext";

const ProfileOverView = ({random:random}) => {
  const {loading, setLoading} = useLoadder();
  const {profileData, getProfileData} = useProfile();
 
    return (
      <>
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
        <h5 className="card-title">About</h5>
        <p className="small fst-italic">{profileData?.about_me}</p>

        <h5 className="card-title">Profile Details</h5>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Full Name</div>
          <div className="col-lg-9 col-md-8">{profileData?.name}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Company</div>
          <div className="col-lg-9 col-md-8">{profileData?.company_name}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Job</div>
          <div className="col-lg-9 col-md-8">{profileData?.designation}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Country</div>
          <div className="col-lg-9 col-md-8">INDIA</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Address</div>
          <div className="col-lg-9 col-md-8">{profileData?.address}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Phone</div>
          <div className="col-lg-9 col-md-8">{profileData?.mobile}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Email</div>
          <div className="col-lg-9 col-md-8">{profileData?.email}</div>
        </div>

      </div>
      </>
    );

}
export default ProfileOverView;