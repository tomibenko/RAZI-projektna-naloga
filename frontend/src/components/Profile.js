import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Profile(){
    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState({});

    useEffect(function(){
        const getProfile = async function (){
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    return (
        <div className="profile">
            <div className="profile-card">
                {!userContext.user ? <Navigate replace to="/login"/> : ""}
                <h1>User profile</h1>
                <div>
                    <p style={{ fontSize: '1.2em' }}>Username: {profile.username}</p>
                    <p style={{ fontSize: '1.2em' }}>Email: {profile.email}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;