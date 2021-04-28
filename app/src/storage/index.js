const TOKEN_KEY = 'VITRINERAPIDA_JWT_TOKEN';

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const clear = () => {
    localStorage.removeItem(TOKEN_KEY);
}
