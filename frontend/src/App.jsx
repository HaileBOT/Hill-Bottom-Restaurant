import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import { useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import './styles/app.css';
import Footer from './components/Footer';

const AppRoutes = () => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');
    return (
        <>
            {!isAdmin && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Menu" element={<Menu/>}/>
                <Route path="/Contact" element={<Contact/>}/>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
            <Footer/>
        </>
    );
};

const App = () => (
    <Router>
        <AppRoutes />
    </Router>
);

export default App;