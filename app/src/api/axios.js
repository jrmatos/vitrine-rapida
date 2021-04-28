import axios from 'axios';

import { getToken } from '../storage';

let instance;

if (process.env.NODE_ENV === 'production') {
    instance = axios.create({
        baseURL: 'https://vitrinerapida.site:5000/api'
    });
} else {
    instance = axios.create({
        baseURL: 'https://localhost:5000/api'
    });
}

instance.interceptors.request.use((request) => {
    const token = getToken();

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response.data;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default instance;
