import axios from "axios";
import { successHandler, errorHandler } from "../../../utlts/admin/functions";
import { enviourment } from "../enviourment/enviourment";

export const register = (data,navigate) => {
    try {
        axios({
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
              },
              url: enviourment.REGISTER_USER,
              data : data
        }).then(function(response){
            if(response.data.status == 'success'){
                successHandler(response.data);
                navigate('/admin/login')
            }if(response.data.status == 'error'){
                errorHandler(response.data,true);
                return response.data;
            }
        }).catch(function(error){
            errorHandler(error,true);
        });
    } catch (error) {
        errorHandler(error,true);
    }

}

export const login = (data,navigate) => {
    try {
        axios({
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
              },
              url: enviourment.LOGIN_USER,
              data : data
        }).then(function(response){
            if(response.data.status == 'success'){
                successHandler(response.data);
                localStorage.setItem("access-token", response.data.token);
                localStorage.setItem("isLogged", true);
                localStorage.setItem("userDetails", response.data.userData);
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                navigate('/admin/dashboard')
            }if(response.data.status == 'error'){
                errorHandler(response.data,true);
                return response.data;
            }
        }).catch(function(error){
            errorHandler(error,true);
        });
    } catch (error) {
        errorHandler(error,true);
    }

}