import React, { useState, useEffect } from 'react';

import Container from './Container';

import { getStore as getStoreApi } from '../../api/store';


const StoreMainPage = ({ match, history }) => {
    const [storeData, setStoreData] = useState(null);

    async function getStore() {
        try {
            const { data } = await getStoreApi(match.params.storeId);
            setStoreData(data);
        } catch (e) {
            history.push('/');
        }
    }

    useEffect(() => {
        const el = document.querySelector('body');
        el.classList.remove('landing-page');
        el.classList.add('store-page');
    }, []);

    useEffect(() => {
        getStore();
    }, []);

    if (storeData) {
        return <Container store={storeData} />
    }

    return null;    
}

export default StoreMainPage;
