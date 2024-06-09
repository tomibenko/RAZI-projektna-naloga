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
        <div className="home fade-in">
            <h1 className="section-title">User Mailboxes</h1>
            {mailboxes.length > 0 ? (
                <ul>
                    {mailboxes.map(mailbox => (
                        <li key={mailbox.id_pk} className="mailbox-item gradient-background">
                            <h2>Mailbox ID: {mailbox.id_pk}</h2>
                            <p>Location: {mailbox.location}</p>                           
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