import axios from './axios'

export const getProducts = () => {
    return axios.get('/product');
}

export const saveNewProduct = ({
    name,
    description,
    picture,
    price,
    categoryId
}) => {
    const formData = new FormData();
    
    formData.append('name', name)
    formData.append('description', description)
    formData.append('picture', picture)
    formData.append('price', price)
    formData.append('categoryId', categoryId)

    const configs = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    return axios.post('/product', formData, configs);
}

export const deleteProduct = (productId) => {
    return axios.delete(`/product/${productId}`);
}
