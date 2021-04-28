import axios from './axios'

export const signInPOST = (email, password) => {
    return axios.post('/auth/signin', {
        email,
        password
    });
}

export const signUpPOST = (firstName, lastName, email, password) => {
    return axios.post('/auth/signup', {
        firstName,
        lastName,
        email,
        password
    });
}

export const fetchMeFromToken = (token) => {
    return axios.get('/auth/me-from-token');
}

export const emailConfirmationGET = (code) => {
    return axios.get(`/auth/emailconfirmation/${code}`);
}

