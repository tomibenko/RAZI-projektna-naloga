import { useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post('http://localhost:3001/users/logout', {}, { withCredentials: true });
                console.log('Logged out successfully');
                userContext.setUserContext(null);
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };
        logout();
    }, [navigate, userContext]);

    return null; // Or return a loading indicator while logging out
}

export default Logout;
