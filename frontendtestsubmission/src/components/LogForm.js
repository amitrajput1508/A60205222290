import React, { useState } from "react";
import './styles.css';


const LogForm = () => {
  const [stack, setStack] = useState("backend");
  const [level, setLevel] = useState("info");
  const [pkg, setPkg] = useState("handler");
  const [message, setMessage] = useState("");

  const handleLog = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`✅ ${data.message} — Log ID: ${data.logID}`);
    } else {
      alert(`❌ ${data.message || "Error"} — Check token`);
    }
  };

  return (
    <form onSubmit={handleLog}>
      <select value={stack} onChange={(e) => setStack(e.target.value)}>
        <option value="backend">backend</option>
        <option value="frontend">frontend</option>
      </select>
      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="info">info</option>
        <option value="debug">debug</option>
        <option value="warn">warn</option>
        <option value="error">error</option>
        <option value="fatal">fatal</option>
      </select>
      <input placeholder="Package" value={pkg} onChange={e => setPkg(e.target.value)} />
      <input placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send Log</button>
    </form>
  );
};

export default LogForm;
