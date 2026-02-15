import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    const isCurrent = (path) => location.pathname === path;
    return (
        <footer className="site-footer">
            <div className="site-footer__inner container ">
                <div className="site-footer__brand footers">
                    <strong className="footor-icon">Hill Bottom Restaurant</strong>
                    <p className="site-footer__copyright">© 2025 Hill Bottom. All rights reserved.</p>
                </div>

                <div className="site-footer__contact footers">
                    <h4 className="site-footer__heading">Contact Us</h4>
                    <address className="site-footer__address">
                        Hill Bottom Restaurant, Airport Rd,<br /> Addis Ababa 1755<br />
                        Phone: (251) 923456789<br />
                        Email: <a href="mailto:info@hillbottom.com">info@hillbottom.com</a>
                    </address>
                </div>

                <div className="site-footer__links footers">
                    <h4 className="site-footer__heading">Quick Links</h4>
                    <ul className="site-footer__list">
                        <li className="footer-item">
                            <Link className={`footer-link${isCurrent("/") ? " current-page" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="footer-item">
                            <Link className={`footer-link${isCurrent("/menu") ? " current-page" : ""}`} to="/menu">Menu</Link>
                        </li>
                        <li className="footer-item">
                            <Link className={`footer-link${isCurrent("/contact") ? " current-page" : ""}`} to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-socials footers">
                    <p>Follow Us</p>
                    <div className="social-logo">
                        <a href="#" > <img src="/img/Home/footer/i (1).png" alt="" /></a>
                        <a href="#"><img src="/img/Home/footer/i (2).png" alt="" /></a>
                        <a href="#"><img src="/img/Home/footer/i (3).png" alt="" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;