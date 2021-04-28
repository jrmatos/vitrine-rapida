import axios from './axios'

export const getConfigs = (token) => {
    return axios.get('/store/configs');
}

export const updateConfigs = (name, description, whatsappNumber, friendlyUrl) => {
    return axios.put('/store/configs', {
        name, description, whatsappNumber, friendlyUrl
    });
}

export const updateLogo = (logo) => {
    const formData = new FormData();
    
    formData.append('logo', logo)

    const configs = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    return axios.put('/store/logo', formData, configs);
}

export const getStore = (storeId) => {
    return axios.get(`/store/${storeId}`);
}
