import React from "react";

const About = () => {
  return (
    <div className="App">
      <h2>About This Application</h2>
      <p>
        This File Encryption & Decryption Web App is built to help users protect their sensitive information.
        It provides client-side encryption using modern algorithms like AES, Triple DES, Blowfish, and Rabbit.
      </p>
      <p>
        Whether you're a student, developer, or organization, this platform gives you the tools to manage your files securely—without needing technical expertise.
      </p>
      <p>
        Built using React.js and Crypto.js, it ensures encryption happens entirely in your browser. No files are uploaded to external servers.
      </p>

      <div className="feature-cards">
        <div className="feature-card">
          <h3>🔐 Encrypt Files & Text</h3>
          <p>Easily encrypt your files or text using powerful algorithms like AES, Triple DES, Blowfish, or Rabbit.</p>
        </div>

        <div className="feature-card">
            <h3>🧩 Decrypt Files</h3>
            <p>Upload encrypted files and decrypt them securely with your private key.</p>
          </div>

        <div className="feature-card">
          <h3>🎯 Client-Side Security</h3>
          <p>All encryption is done in your browser, ensuring that your data never leaves your device.</p>
        </div>

        <div className="feature-card">
          <h3>User-Friendly Interface</h3>
          <p>Drag and drop, real-time feedback, and no tech expertise needed to protect your data.</p>
        </div>

        <div className="feature-card">
          <h3>Cross-Platform Access</h3>
          <p>Use this web application on any device or browser — no installation required.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
