import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import { enviourment } from "../../components/admin/enviourment/enviourment";
import { useState } from "react";
export function displayNotification(msg, msgType=''){
    if(msgType == 'info'){
        toast.info(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }if(msgType == 'success'){
        toast.success(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }if(msgType == 'warn'){
        toast.warn(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }if(msgType == 'error'){
        toast.error(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }if(msgType == ''){
        toast(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }

}

export function errorHandler(error, toastStatus) {
    if (error?.message) {
        displayNotification(error.message,'error');
      return {
        message: "error",
        error: error.message,
      };
    } else {
        displayNotification('Something went wrong, Please try again','error');
      return {
        message: "error",
        error: "Something went wrong, Please try again",
      };
    }
  }

  export function generateUniqueStringWithDateTime(){
    var today = new Date();
    const year = today.getFullYear().toString();
    const moneth = today.getMonth() + 1;
    const day    = today.getDate();
    const h      = today.getHours();
    const min    = today.getMinutes();
    const seco   = today.getSeconds();
    const miliSec = today.getMilliseconds();
    return year+moneth+day+h+min+seco+miliSec;

  }

  export async function getCroppedImg(imageSrc, crop) {
    const canvas = document.createElement('canvas');
    const scaleX = imageSrc.naturalWidth / imageSrc.width;
    const scaleY = imageSrc.naturalHeight / imageSrc.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      imageSrc,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL('image/jpeg');
  }
  
  export function successHandler(data) {
    displayNotification(data.message,'success');
    return {
      message: "success",
      data,
    };
  }

  export async  function checkEitherLoggedInorNot(){
    const token = localStorage.getItem('access-token');
    //var data = {};
     try {
      return axios({
          method : 'post',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              "Authorization" :  `Bearer ${token}`
            },
            url: enviourment.CHECK_LOGGEDIN,
      }).then(function(response){
          if(response.data.status == 'success'){
            localStorage.setItem("isLogged", true);
            localStorage.setItem("userDetails", JSON.stringify(response.data.userData));
          }else{
            localStorage.setItem("isLogged", false);
            localStorage.setItem("access-token", '');
            localStorage.setItem("userDetails", {});
          }

      }).catch(function(error){
        localStorage.setItem("isLogged", false);
        localStorage.setItem("access-token", '');
        localStorage.setItem("userDetails", {});
      });
      
  } catch (error) {
    localStorage.setItem("isLogged", false);
    localStorage.setItem("access-token", '');
    localStorage.setItem("userDetails", {});
  }
  }
  