
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Header = () => {
    const location = useLocation();
    const isCurrent = (path) => location.pathname === path;
    const [navOpen, setNavOpen] = useState(false);

    // Close nav on route change
    React.useEffect(() => {
        setNavOpen(false);
    }, [location.pathname]);

    // Close nav when clicking outside or pressing Escape (mobile only)
    React.useEffect(() => {
        if (!navOpen) return;
        const handleClick = (e) => {
            const nav = document.getElementById('primary-nav');
            const ham = document.querySelector('.hamburger');
            if (nav && !nav.contains(e.target) && ham && !ham.contains(e.target)) {
                setNavOpen(false);
            }
        };
        const handleEsc = (e) => {
            if (e.key === 'Escape') setNavOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [navOpen]);

    // Close nav when resizing across 900px breakpoint
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 900 && navOpen) {
                setNavOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [navOpen]);

    return (
        <header className="site-header container" style={{ position: 'relative' }}>
            <div className="site-header__brand">
                <h1 className="brand__name">Hill Bottom Restaurant</h1>
            </div>
            <button
                className={`hamburger${navOpen ? ' is-active' : ''}`}
                aria-label="Open navigation"
                aria-expanded={navOpen}
                aria-controls="primary-nav"
                onClick={() => setNavOpen(v => !v)}
                type="button"
            >
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
            </button>
            {/* Removed nav overlay effect */}
            <nav className="site-nav" aria-label="Primary navigation">
                <ul className={`site-nav__list${navOpen ? ' nav-open' : ''}`} id="primary-nav">
                    <li className="site-nav__item"><Link className={`site-nav__link${isCurrent("/") ? " home-page" : ""}`} to="/">Home</Link></li>
                    <li className="site-nav__item"><Link className={`site-nav__link${isCurrent("/menu") ? " home-page" : ""}`} to="/menu">Menu</Link></li>
                    <li className="site-nav__item"><Link className={`site-nav__link${isCurrent("/contact") ? " home-page" : ""}`} to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;