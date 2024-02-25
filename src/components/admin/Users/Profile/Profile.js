import React, { useEffect } from "react";
import { useLoadder } from "../../Context/LoaderContext";
import Main from "../../Layout/Main/Main";
import EditProfile from "./EditProfile/EditProfile";
import ProfileOverView from "./ProfileOverView/ProfileOverView";
import ChangePassword from "./ChangePassword/ChangePassword";

const Profile = () =>{
    const {loading, setLoading} = useLoadder();

    useEffect(()=>{
        setLoading(false);
    },[]);

    return (
        <Main>
             <div className="pagetitle">
      <h1>Profile</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="index.html">Home</a></li>
          <li className="breadcrumb-item">Users</li>
          <li className="breadcrumb-item active">Profile</li>
        </ol>
      </nav>
    </div>

    <section className="section profile">
      <div className="row">
        <div className="col-xl-4">

          <div className="card">
            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

              <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
              <h2>Kevin Anderson</h2>
              <h3>Web Designer</h3>
              <div className="social-links mt-2">
                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

        </div>

        <div className="col-xl-8">

          <div className="card">
            <div className="card-body pt-3">
              
              <ul className="nav nav-tabs nav-tabs-bordered">

                <li className="nav-item">
                  <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                </li>

              </ul>
              <div className="tab-content pt-2">

                <ProfileOverView />

                <EditProfile />

                <ChangePassword />

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

        </Main>
        
    );
}

export default Profile;