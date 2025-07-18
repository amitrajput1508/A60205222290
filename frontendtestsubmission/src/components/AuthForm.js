// AuthForm.js
import React, { useState } from 'react';
import './AuthForm.css';

function AuthForm({ setToken }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://20.244.56.144/evaluation-service/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientID: clientId,
          clientSecret: clientSecret,
          ownerName: name,
          ownerEmail: email,
          rollNo: rollNo,
          accessCode: accessCode
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('❌ Server Error:', data);
        setError('Authentication failed. Please check your inputs.');
        return;
      }

      console.log('✅ Token Received:', data);
      setToken(data.access_token);
      setError(null);
    } catch (err) {
      console.error('❌ Fetch Error:', err);
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>🔐 Get Access Token</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll No" required />
        <input value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="Access Code" required />
        <input value={clientId} onChange={(e) => setClientId(e.target.value)} placeholder="Client ID" required />
        <input value={clientSecret} onChange={(e) => setClientSecret(e.target.value)} placeholder="Client Secret" required />
        <button type="submit">Get Token</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default AuthForm;
