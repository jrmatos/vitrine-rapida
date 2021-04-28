import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchMeFromToken } from '../../api/auth';

import CostumerMenu from './menu';


const CostumerPage = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [fetchedUser, setFetchedUser] = useState(null);
    const [didFetchUser, setDidFetchUser] = useState(false);
    const history = useHistory();


    useEffect(() => {
        fetchMeFromToken()
            .then(({ data }) => {
                setAuthenticated(true);
                setFetchedUser(data.user);
            })
            .catch((error) => {
                // some error occurred, then navigate to home page
                history.push('/');
            })
            .finally(() => {
                setDidFetchUser(true);
            });
      
    }, []);


    if (didFetchUser && authenticated) {

        return <CostumerMenu user={fetchedUser} />
    }
    else {
        // 
        return null;
    }
}

export default CostumerPage;
