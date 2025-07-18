import React from 'react';
import './styles.css';


function Dashboard({ token }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {token ? (
        <p>✅ Access Token: {token}</p>
      ) : (
        <p>❌ No Token Found. Please authenticate.</p>
      )}
    </div>
  );
}

export default Dashboard;
