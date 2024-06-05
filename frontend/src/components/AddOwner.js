import React, { useState } from 'react';
import axios from 'axios';

function AddOwner() {
    const [username, setUsername] = useState('');
    const [id_pk, setIdPk] = useState('');
    const [accessUntil, setAccessUntil] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/mailboxes/addOwner', {
                username,
                id_pk,
                accessUntil
            }, { withCredentials: true });
            setMessage(res.data.message);
        } catch (error) {
            console.error('Error adding owner:', error);
            setMessage('Failed to add owner');
        }
    };

    return (
        <div className="AddOwner">
            <h1>Add Owner to Mailbox</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="id_pk">Mailbox ID:</label>
                    <input
                        type="text"
                        id="id_pk"
                        value={id_pk}
                        onChange={(e) => setIdPk(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="accessUntil">Access Until:</label>
                    <input
                        type="datetime-local"
                        id="accessUntil"
                        value={accessUntil}
                        onChange={(e) => setAccessUntil(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Owner</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddOwner;
