import React, { useEffect, useState } from "react";
import { useLoadder } from "../../Context/LoaderContext";
import Main from "../../Layout/Main/Main";
import EditProfile from "./EditProfile/EditProfile";
import ProfileOverView from "./ProfileOverView/ProfileOverView";
import ChangePassword from "./ChangePassword/ChangePassword";
import { enviourment } from "../../enviourment/enviourment";
import { ProfileProvider } from "./ProfileContext";
import { useProfile } from "./ProfileContext";
import ProfileSidePart from "./ProfileSidePart/ProfileSidePart";
import { Link } from "react-router-dom";

const Profile = () =>{
    const {profileData, getProfileData} = useProfile();
    const {loading, setLoading} = useLoadder();
    const [tab, setTab] = useState(1);

    const handleTab = (id) =>{
      setTab(id);
    }

    const loadProfileData = async() => {
      setLoading(true);
      //await getProfileData();
      setLoading(false);

    }

    useEffect(()=>{
        loadProfileData();
        setLoading(false);
    },[]);

    return (
    
        <Main>
          <ProfileProvider>
             <div className="pagetitle">
      <h1>Profile</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
          <li className="breadcrumb-item">Users</li>
          <li className="breadcrumb-item active">Profile</li>
        </ol>
      </nav>
    </div>

    <section className="section profile">
      <div className="row">
        <ProfileSidePart />

        <div className="col-xl-8">

          <div className="card">
            <div className="card-body pt-3">
              
              <ul className="nav nav-tabs nav-tabs-bordered">

                <li className="nav-item">
                  <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview" onClick={()=>handleTab('1')}>Overview</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit" onClick={()=>handleTab('2')}>Edit Profile</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password" onClick={()=>handleTab('3')} >Change Password</button>
                </li>

              </ul>
              <div className="tab-content pt-2">
                {tab == 1 && <ProfileOverView random={Math.random()} />}
                {tab == 2 && <EditProfile  />}
                {tab == 3 && <ChangePassword  />}

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
    </ProfileProvider>
        </Main>
        
    );
}

export default Profile;