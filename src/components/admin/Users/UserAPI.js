import axios from "axios";
import { successHandler, errorHandler } from "../../../utlts/admin/functions";
import { enviourment } from "../enviourment/enviourment";
import { useLoadder } from "../Context/LoaderContext";
import { useState } from "react";


export const register = async (data,navigate) => {
   
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

export const login = async (data,navigate) => {
    try {
       return axios({
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
                localStorage.setItem("userDetails", JSON.stringify(response.data.userData));
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

export const logout = async (navigate) => {
    const token = localStorage.getItem('access-token');
    try {
        axios({
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization" : `Bearer ${token}`
              },
              url: enviourment.LOGOUT_USER,
        }).then(function(response){
            if(response.data.status == 'success'){
                successHandler(response.data);
                localStorage.setItem("access-token", '');
                localStorage.setItem("isLogged", false);
                localStorage.setItem("userDetails", {});
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

export const sendEmailForgotPassword =  (data,navigate) => {
    try {
        return axios({
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
              },
              url: enviourment.SEND_FORGOT_PASSWORD_EMAIL,
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

export const verifyChangePSWToken =   (data,navigate) => {
    return  axios({
        method: 'post',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8"
          },
          url: enviourment.VERIFY_CHANGE_PSW_TOKEN,
          data : data
    });
}


export const changePswForGotPassword =  async (data,navigate) => {
    try {
        return axios({
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
              },
              url: enviourment.CHANGE_PSW_FORGOT_PSW,
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
