import React from "react";

function AboutSection() {
  return (
    <div id="about" className="features-section">
      <h2>About ClinicMate</h2>
      <div className="feature-grid">
        <div className="feature-item">
          <h3>Who We Are</h3>
          <p>
            ClinicMate is a dedicated platform built by healthcare and
            technology experts...
          </p>
        </div>
        <div className="feature-item">
          <h3>Our Mission</h3>
          <p>Our mission is to simplify medical practice management...</p>
        </div>
        <div className="feature-item">
          <h3>Why Choose Us?</h3>
          <p>
            With ClinicMate, you get a secure, user-friendly, and robust
            system...
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
