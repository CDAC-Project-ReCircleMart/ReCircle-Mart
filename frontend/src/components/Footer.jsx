import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <div className="footer-column">
          <h4>POPULAR LOCATIONS</h4>
          <ul>
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>TRENDING LOCATIONS</h4>
          <ul>
            <li>Bhubaneshwar</li>
            <li>Hyderabad</li>
            <li>Chandigarh</li>
            <li>Nashik</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>ABOUT US</h4>
          <ul>
            <li>Tech</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>OLX E-Commerce</h4>
          <ul>
            <li>Blog</li>
            <li>Help</li>
            <li>Sitemap</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom-blue">
        <p className="copyright">
          All rights reserved © 2006-2025 Rohit and team
        </p>
      </div>
    </footer>
  );
}
