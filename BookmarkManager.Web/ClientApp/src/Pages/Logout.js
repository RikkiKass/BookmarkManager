import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import axios from 'axios';

const Logout = () => {
    const history = useHistory();
    const { setUser } = useAuthContext();

    const logout = async () => {
        await axios.post('/api/account/logout');
        setUser(null);
        history.push('/');
    }
    useEffect(() => {
        logout();
    }, []);

    return (
        <h1>Logging out...</h1>
    )

}
export default Logout;