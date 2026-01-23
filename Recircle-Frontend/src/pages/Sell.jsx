import React from 'react';

export default function Sell() {
  return (
    <div className="sell-container">
      <h2 className="page-title">POST YOUR AD</h2>

      <div className="section">
        <h3 className="section-title">Include some details</h3>

        <label>Brand</label>
        <input type="text" className="input" />

        <label>Year</label>
        <input type="number" className="input" />

        <label>Fuel Type</label>
        <div className="button-group">
          <button className="select-btn">CNG & Hybrids</button>
          <button className="select-btn">Diesel</button>
          <button className="select-btn">Petrol</button>
          <button className="select-btn">Electric</button>
        </div>

        <label>Transmission</label>
        <div className="button-group">
          <button className="select-btn">Automatic</button>
          <button className="select-btn">Manual</button>
        </div>

        <label>KM Driven</label>
        <input type="number" className="input" />

        <label>No of owners</label>
        <div className="button-group">
          <button className="select-btn">1st</button>
          <button className="select-btn">2nd</button>
          <button className="select-btn">3rd</button>
          <button className="select-btn">4th</button>
          <button className="select-btn">4+</button>
        </div>

        <label>Ad title</label>
        <input type="text" className="input" />

        <label>Description</label>
        <textarea className="textarea" />
      </div>

      <div className="section">
        <h3 className="section-title">Set price</h3>
        <label>Price</label>
        <input type="number" className="input" placeholder="₹" />
      </div>

      <div className="section">
        <h3 className="section-title">Upload photos</h3>
        <div className="photo-grid">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="photo-box">+</div>
          ))}
        </div>
      </div>

      <button className="post-btn">Post Now</button>
    </div>
  );
}
