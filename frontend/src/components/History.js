import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
    const [mailboxes, setMailboxes] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserHistory = async () => {
            try {
                const res = await axios.get("http://localhost:3001/mailboxes/getUserHistory", { withCredentials: true });
                setHistory(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user history:', error);
                setError(error);
                setLoading(false);
            }
        };

        getUserHistory();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching user history: {error.message}</p>;
    }

    return (
        <div className="History fade-in">
            <h1 className="section-title">User History</h1>
            {history.length > 0 ? (
                <ul className="history-list">
                    {history.map((entry, index) => (
                        <li key={index} className="history-item gradient-background">
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
