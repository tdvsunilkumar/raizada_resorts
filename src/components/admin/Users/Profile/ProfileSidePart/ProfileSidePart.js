import React, { useEffect } from "react";
import { useProfile } from "../ProfileContext";
import { useLoadder } from "../../../Context/LoaderContext";
import { enviourment } from "../../../enviourment/enviourment";
const ProfileSidePart = () => {
    const {profileData, getProfileData} = useProfile();
    const {loading, setLoading} = useLoadder();

    const fetchData = async() => {
        setLoading(true);
        await getProfileData();
        setLoading(false);
    }

    useEffect(()=>{
        fetchData();
    },[]);
    return (
        <div className="col-xl-4">

          <div className="card">
            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

              <img src={(profileData?.profile_image !== null)?enviourment.BASE_BACKEND_URL+profileData?.profile_image:enviourment.DEFAULT_PROFILE_PIC} alt="Profile" className="rounded-circle" />
              <h2>{profileData?.name}</h2>
              <h3>{profileData?.designation}</h3>
              {/* <div className="social-links mt-2">
                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
              </div> */}
            </div>
          </div>

        </div>
    );
}

export default ProfileSidePart;