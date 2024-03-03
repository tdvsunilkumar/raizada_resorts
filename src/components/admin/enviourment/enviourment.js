const BASE_API_URL = 'http://localhost/raizadaresorts/apis/public/api/';
export const enviourment = {
    'DEFAULT_PROFILE_PIC' : 'http://localhost:3000/admin/assets/img/default-user.png',
    'BASE_BACKEND_URL' : 'http://localhost/raizadaresorts/apis/public/',
    'REGISTER_USER' : BASE_API_URL+'register',
    'LOGIN_USER'    : BASE_API_URL+'login',
    'CHECK_LOGGEDIN': BASE_API_URL+'me',
    'LOGOUT_USER'   : BASE_API_URL+'logout',
    'SEND_FORGOT_PASSWORD_EMAIL': BASE_API_URL+'send-password-email',
    'VERIFY_CHANGE_PSW_TOKEN' : BASE_API_URL+'verify-change-password-token',
    'CHANGE_PSW_FORGOT_PSW' : BASE_API_URL+'forgot-psw/change-psw',
    'UPDATE_PROFILE' : BASE_API_URL+'account/update-profile',
    'UPDATE_SETTINGS' : BASE_API_URL+'settings/update-settings',
    'LOAD_SETTINGS' :BASE_API_URL+'settings/load-settings',
    'ADD_UPDATE_SECTION' :BASE_API_URL+'section/add-update-section',
    'GET_SECTION_DATA' :BASE_API_URL+'section/getlist',
    'GET_SINGLE_SECTION_DETAILS' : BASE_API_URL+'section/getsection/',
    'DELETE_SECTION' : BASE_API_URL+'section/deletesection',
    'SECTION_TYPES' :[
        'Slider','Features'
    ],
    

}