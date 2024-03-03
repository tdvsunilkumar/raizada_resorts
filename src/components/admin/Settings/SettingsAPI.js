import axios from "axios"
import { enviourment } from "../enviourment/enviourment";
export const updateSettings = async(formData) => {
    const token = localStorage.getItem('access-token');
    return axios({
        method: 'post',
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization" :  `Bearer ${token}`
          },
          url: enviourment.UPDATE_SETTINGS,
          data : formData
    })

}

export const loadSettingsData = async(formData) => {
    const token = localStorage.getItem('access-token');
    return axios({
        method: 'get',
        headers: {
            'content-type': 'multipart/form-data'
          },
          url: enviourment.LOAD_SETTINGS,
          data : formData
    })

}