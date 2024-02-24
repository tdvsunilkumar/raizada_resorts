const BASE_API_URL = 'http://localhost/raizadaresorts/apis/public/api/';
export const enviourment = {
    'REGISTER_USER' : BASE_API_URL+'register',
    'LOGIN_USER'    : BASE_API_URL+'login',
    'CHECK_LOGGEDIN': BASE_API_URL+'me',
    'LOGOUT_USER'   : BASE_API_URL+'logout',
    'SEND_FORGOT_PASSWORD_EMAIL': BASE_API_URL+'send-password-email',
    'VERIFY_CHANGE_PSW_TOKEN' : BASE_API_URL+'verify-change-password-token',
    'CHANGE_PSW_FORGOT_PSW' : BASE_API_URL+'forgot-psw/change-psw'

}