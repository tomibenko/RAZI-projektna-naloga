import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Home(){
   
    const [mailboxes, setMailboxes] = useState([]);
    
    useEffect(() => {
        const getUserMailboxes = async () => {
            try {
                const res = await axios.get("http://localhost:3001/mailboxes/getUserMailboxes", { withCredentials: true });
                setMailboxes(res.data);
            } catch (error) {
                console.error('Error fetching mailboxes:', error);
            }
        };
        getUserMailboxes();
    }, []);

    return (
        <div className="home">
            <h1>User Mailboxes</h1>
            {mailboxes.length > 0 ? (
                <ul className="mailbox-list">
                    {mailboxes.map(mailbox => (
                        <li key={mailbox.id_pk} className="mailbox-item">
                            <h2>Mailbox ID: {mailbox.id_pk}</h2>
                            <p>Location: {mailbox.location}</p>
                            <p>Status: {mailbox.status}</p>
                            <p>Size: {mailbox.size}</p>
                            <p>Battery Status: {mailbox.batteryStatus}</p>
                            <p>Installation Date: {new Date(mailbox.installationDate).toLocaleDateString()}</p>
                           
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No mailboxes found for this user.</p>
            )}
        </div>
    );
}


export default Home;