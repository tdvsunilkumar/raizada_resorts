import { createContext, useContext } from "react";
import { useState } from "react";
import { displayNotification } from "../../../../utlts/admin/functions";
import { getProfileDataAPI } from "../UserAPI";

const  ProfileContext = createContext({});

export function ProfileProvider({children}){
    const [profileData,setprofileData] = useState({});

        const getProfileData =  async() =>{
              getProfileDataAPI().then((response)=>{
                if(response.data.status == 'success'){
                    setprofileData(response.data.userData);
                    localStorage.setItem("isLogged", true);
                    localStorage.setItem("userDetails", JSON.stringify(response.data.userData));
                }else{
                    displayNotification(response.data.message,'error');
                    localStorage.setItem("isLogged", false);
                    localStorage.setItem("access-token", '');
                    localStorage.setItem("userDetails", {});
                   
                }
            }).catch((error)=>{
                displayNotification(error.message,'error');
                localStorage.setItem("isLogged", false);
                localStorage.setItem("access-token", '');
                localStorage.setItem("userDetails", {});
            })
        }

    
    const value = {profileData, getProfileData};
    return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
    );
}

export function useProfile(){
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
      }
      return context;
}