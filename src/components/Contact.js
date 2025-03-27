import React from "react";

const Contact = () => {
  return (
    <div className="contact-section">
      <h2>Contact Support</h2>
      <p>If you encounter any issues or have suggestions, feel free to reach out:</p>
      <div style={{ textAlign: "left", marginTop: "20px" }}>
          <ul>
              <li><strong>Email:</strong> support@encryptapp.com</li>
              <li><strong>Phone:</strong> +254 700 123 456</li>
              <li><strong>Location:</strong> Nairobi, Kenya</li>
          </ul>
          <p style={{ marginTop: "10px" }}>
            We're here to help and appreciate your input for making the app better.
          </p>
        </div>
      </div>
  );
};

export default Contact;
