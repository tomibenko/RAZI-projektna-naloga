import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Profile(){
    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [enabled2fa, setEnabled2fa] = useState(false);

    useEffect(function(){
        const getProfile = async function (){
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
            setEnabled2fa(data.enabled2fa);
        }
        getProfile();
    }, []);

    const toggle2fa = async () => {
        const res = await fetch("http://localhost:3001/users/toggle2fa", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type' : 'application/json' }
        });
        const data = await res.json();
        if(data.message === '2FA enabled!'){
            setEnabled2fa(data.enabled2fa);
        }
    };

    return (
        <div className="profile fade-in">
            <div className="card">
                {!userContext.user ? <Navigate replace to="/login"/> : ""}
                <h1>User profile</h1>
                <div>
                    <p style={{ fontSize: '1.2em' }}>Username: {profile.username}</p>
                    <p style={{ fontSize: '1.2em' }}>Email: {profile.email}</p>
                    <p style={{ fontSize: '1.2em' }}>Two-factor authentication: {enabled2fa ? 'Enabled' : 'Disabled'}</p>
                    <button onClick={toggle2fa}>
                        {enabled2fa ? 'Disable 2FA' : 'Enable 2FA'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;