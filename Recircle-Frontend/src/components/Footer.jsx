import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-column">
          <h4>POPULAR LOCATIONS</h4>
          <li>Pune</li>
          <li>Mumbai</li>
          <li>Bangalore</li>
          <li>Chennai</li>
        </div>

        <div className="footer-column">
          <h4>TRENDING</h4>
          <li>Wakad</li>
          <li>Hinjewadi</li>
          <li>Kharadi</li>
        </div>

        <div className="footer-column">
          <h4>ABOUT</h4>
          <li>Blog</li>
          <li>Careers</li>
        </div>

        <div className="footer-column">
          <h4>HELP</h4>
          <li>Support</li>
          <li>Safety</li>
          <li>Terms</li>
        </div>
      </div>

      <div className="footer-bottom-blue">
        © 2025 OLX Ecommerce — All Rights Reserved to Rohit , Prashant , Harsh ,
        Om Team
      </div>
    </footer>
  );
}
