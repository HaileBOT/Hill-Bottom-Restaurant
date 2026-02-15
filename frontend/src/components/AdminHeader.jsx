import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminHeader = ({ onLogout }) => {
  const location = useLocation();
  const isCurrent = (path) => location.pathname === path;
  return (
    <header className="site-header container" style={{ position: 'relative', marginBottom: '2rem', borderBottom: '1px solid #eee', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{fontSize: '1.3rem', fontWeight: 700, letterSpacing: 1, color: '#f4c66a', marginRight: '2rem'}}>Hill Bottom Restaurnant</span>
      <button
        onClick={onLogout}
        className="admin-logout-btn"
        style={{
          marginRight: '2rem',
        }}
      >
        Logout
      </button>
      <nav className="site-nav" aria-label="Admin navigation" style={{ marginLeft: 'auto' }}>
        <ul className="site-nav__list" style={{ display: 'flex', alignItems: 'center', gap: '40px', margin: 0 }}>
          <li className="site-nav__item">
            <Link className={`site-nav__link${isCurrent("/") ? " home-page" : ""}`} to="/">Home</Link>
          </li>
          <li className="site-nav__item">
            <Link className={`site-nav__link${isCurrent("/menu") ? " home-page" : ""}`} to="/menu">Menu</Link>
          </li>
          <li className="site-nav__item">
            <Link className={`site-nav__link${isCurrent("/contact") ? " home-page" : ""}`} to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
