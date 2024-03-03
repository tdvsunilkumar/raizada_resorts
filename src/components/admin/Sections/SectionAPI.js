import axios from "axios"
import { enviourment } from "../enviourment/enviourment";

export const addUpdateSection = async(formData) => {
    const token = localStorage.getItem('access-token');
    return axios({
        method: 'post',
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization" :  `Bearer ${token}`
          },
          url: enviourment.ADD_UPDATE_SECTION,
          data : formData
    })

}

export const loadSectionData = async(otherData) => {
    const token = localStorage.getItem('access-token');
    return axios({
        method: 'get',
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization" :  `Bearer ${token}`
          },
          url: enviourment.GET_SECTION_DATA+'?page='+otherData.page+'&per_page='+otherData.per_page+'&q='+otherData.q+'&section_type='+otherData.section_type,
          data : otherData
    })

}

export const getSectionDetails = async(id) => {
    const token = localStorage.getItem('access-token');
    return axios({
        method: 'get',
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization" :  `Bearer ${token}`
          },
          url: enviourment.GET_SINGLE_SECTION_DETAILS+id,
    })

}

export const deleteSection = async(formData) => {
    const token = localStorage.getItem('access-token');
    return axios({
        method: 'post',
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization" :  `Bearer ${token}`
          },
          url: enviourment.DELETE_SECTION,
          data:formData
    })

}