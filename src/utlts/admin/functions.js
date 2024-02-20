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
  
  export function successHandler(data) {
    displayNotification(data.message,'success');
    return {
      message: "success",
      data,
    };
  }

  export function checkEitherLoggedInorNot(){
    const token = localStorage.getItem('access-token');
    try {
      axios({
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
          }else{
            localStorage.setItem("isLogged", false);
            localStorage.setItem("access-token", '');
          }

      }).catch(function(error){
        localStorage.setItem("isLogged", false);
        localStorage.setItem("access-token", '');
      });
      
  } catch (error) {
    localStorage.setItem("isLogged", false);
    localStorage.setItem("access-token", '');
      
  }
  }
  