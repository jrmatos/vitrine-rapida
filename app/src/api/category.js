import axios from './axios'

export const getCategories = () => {
    return axios.get('/category');
}

export const saveNewCategory = (name) => {
    return axios.post('/category', {
        name
    });
}

export const deleteCategory = (categoryId) => {
    return axios.delete(`/category/${categoryId}`);
}
