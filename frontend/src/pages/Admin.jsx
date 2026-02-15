import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import { getMessages, getReservations } from "../api";
import "../styles/app.css";

const adminImg = "/img/admin.png"; 

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "@Haile";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("admin-authenticated") === "true";
  });
  const [loginError, setLoginError] = useState("");
  const [form, setForm] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === ADMIN_USERNAME && form.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
      localStorage.setItem("admin-authenticated", "true");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin-authenticated");
  };
  // Live data from backend
  const [messages, setMessages] = useState([]);
  const [reservations, setReservations] = useState([]);
  // Search and filter state
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [reservationSearch, setReservationSearch] = useState("");
  const [reservationDate, setReservationDate] = useState("");

  // Fetch data
  useEffect(() => {
    if (isAuthenticated) {
      getMessages().then(setMessages);
      getReservations().then(setReservations);
    }
  }, [isAuthenticated]);

  // Delete message handler
  const handleDeleteMessage = async (id) => {
    await fetch(`http://localhost:4000/api/messages/${id}`, { method: "DELETE" });
    setMessages(messages => messages.filter(m => m.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <main className="admin-dashboard container">
        <section className="admin-header">
          <img src={adminImg} alt="Admin login" className="admin-img" style={{maxWidth: 180, marginBottom: 24}} />
          <h2>Admin Login</h2>
          <form className="admin-login-form" onSubmit={handleLogin} style={{maxWidth: 320, margin: "0 auto"}}>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" value={form.username} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={form.password} onChange={handleInputChange} required />
            </div>
            {loginError && <p style={{color: "red"}}>{loginError}</p>}
            <button type="submit">Login</button>
          </form>
        </section>
      </main>
    );
  }
  return (
    <>
      {isAuthenticated && <AdminHeader onLogout={handleLogout} />}
      {/* Remove duplicate/old header. Only AdminHeader is rendered above. */}
      <main className="admin-dashboard container">
      <section className="admin-header admin-dashboard-hero">
        <div className="admin-hero-content">
          <div className="admin-hero-img-wrap">
            <img src={adminImg} alt="Admin dashboard" className="admin-img" />
          </div>
          <div className="admin-hero-text">
            <h2>Admin Dashboard</h2>
            <p>Welcome, Admin! Here you can review contact messages and reservations submitted by users.</p>
          </div>
        </div>
      </section>
      <section className="admin-messages">
        <h3>Contact Messages</h3>
        <div style={{marginBottom: '1rem'}}>
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{padding: '0.5rem', minWidth: 220, marginRight: 10}}
          />
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            style={{padding: '0.5rem'}}
          />
        </div>
        <div className="messages-list" style={{ maxHeight: '340px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '8px', padding: '0.5rem', background: '#fff' }}>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {messages
                .filter(msg =>
                  (!search ||
                    msg.name.toLowerCase().includes(search.toLowerCase()) ||
                    msg.email.toLowerCase().includes(search.toLowerCase()) ||
                    msg.message.toLowerCase().includes(search.toLowerCase())) &&
                  (!dateFilter || (msg.created_at && msg.created_at.startsWith(dateFilter)))
                )
                .map(msg => (
                  <li key={msg.id} className="message-card slide-list-item" style={{ marginBottom: '1.2rem', paddingBottom: '0.7rem', borderBottom: '1px solid #f4c66a' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div>
                        <strong>{msg.name}</strong> (<a href={`mailto:${msg.email}`}>{msg.email}</a>)
                        <span style={{marginLeft:8, fontSize:'0.95em', color:'#888'}}>
                          {msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}
                        </span>
                      </div>
                      <button onClick={() => handleDeleteMessage(msg.id)} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:4,padding:'0.3rem 0.7rem',cursor:'pointer'}}>Delete</button>
                    </div>
                    <p style={{marginTop:'0.5rem'}}>{msg.message}</p>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </section>
      <section className="admin-reservations">
        <h3>Reservations</h3>
        <div style={{marginBottom: '1rem', display:'flex', gap:'1rem', flexWrap:'wrap'}}>
          <input
            type="text"
            placeholder="Search by name or phone number..."
            value={reservationSearch}
            onChange={e => setReservationSearch(e.target.value)}
            style={{padding: '0.5rem', minWidth: 220}}
          />
          <input
            type="date"
            value={reservationDate}
            onChange={e => setReservationDate(e.target.value)}
            style={{padding: '0.5rem'}}
          />
        </div>
        <div className="reservations-list" style={{ maxHeight: '340px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '8px', padding: '0.5rem', background: '#fff' }}>
          {reservations.length === 0 ? (
            <p>No reservations yet.</p>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {reservations
                .filter(res =>
                  (!reservationSearch ||
                    (res.name && res.name.toLowerCase().includes(reservationSearch.toLowerCase())) ||
                    (res.phoneNumber && res.phoneNumber.toLowerCase().includes(reservationSearch.toLowerCase()))
                  ) &&
                  (!reservationDate || (res.date && res.date.startsWith(reservationDate)))
                )
                .map(res => (
                  <li key={res.id} className="reservation-card slide-list-item" style={{ marginBottom: '1.2rem', paddingBottom: '0.7rem', borderBottom: '1px solid #f4c66a' }}>
                    <strong>{res.name}</strong>
                    {res.phoneNumber && (
                      <span style={{marginLeft:8, color:'#555'}}>📞 {res.phoneNumber}</span>
                    )}
                    <br/>
                    <span>Date: {res.date}</span> | <span>Time: {res.time}</span> | <span>Guests: {res.guests}</span>
                    {res.note && <p>Note: {res.note}</p>}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </section>
      </main>
    </>
  );
};

export default Admin;