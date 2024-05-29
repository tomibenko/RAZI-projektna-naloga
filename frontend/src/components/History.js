
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function History(){

    const [mailboxes, setMailboxes] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
      

        const getUserHistory = async () => {
            try {
                const res = await axios.get("http://localhost:3001/mailboxes/getUserHistory", { withCredentials: true });
                setHistory(res.data);
            } catch (error) {
                console.error('Error fetching user history:', error);
            }
        };

      
        getUserHistory();
    }, []);

    return (
        <div>
            <h1>User History</h1>
            {history.length > 0 ? (
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>
                            <p>Mailbox ID: {entry.mailboxId}</p>
                            <p>Timestamp: {new Date(entry.timestamp).toLocaleString()}</p>
                            <p>Success: {entry.success ? 'Yes' : 'No'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No history found for this user.</p>
            )}
        </div>
    );
}
export default History;