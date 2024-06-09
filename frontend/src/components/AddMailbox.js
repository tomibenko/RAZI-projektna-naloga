import React, { useState } from 'react';
import axios from 'axios';

function AddMailbox() {
    const [id_pk, setIdPk] = useState('');
    const [location, setLocation] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3001/mailboxes', {
                id_pk,
                location,
            }, { withCredentials: true });
            setMessage('Mailbox created successfully');

            setIdPk('');
            setLocation('');
        }
        catch (error) {
            console.error('Error creating mailbox: ', error);
            setMessage('Failed to create mailbox');

            setIdPk('');
            setLocation('');
        }
    };

    return (
        <div className="AddMailbox fade-in">
            <div className="card">
                <h1 className="section-title">Add new mailbox</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id_pk">Mailbox ID:</label>
                        <input 
                            type="text"
                            id="id_pk"
                            value={id_pk}
                            onChange={(e) => setIdPk(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input 
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Add mailbox</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default AddMailbox;