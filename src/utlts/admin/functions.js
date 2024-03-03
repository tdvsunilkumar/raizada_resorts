import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import { enviourment } from "../../components/admin/enviourment/enviourment";

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

  export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); 
    image.src = url;
  });

  export function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }
  
  export function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation);
  
    return {
      width:
        Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
  }
  

  export async function getCroppedImg(
    imageSrc,
    pixelCrop
  ) {
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    const scaleX = imageElement.naturalWidth / imageElement.width;
    const scaleY = imageElement.naturalHeight / imageElement.height;
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      imageElement,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create blob'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg');
    });
 
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

  export function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

 


  