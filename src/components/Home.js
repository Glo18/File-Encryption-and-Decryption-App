import React from "react";
import EncryptForm from "./EncryptForm";
import DecryptForm from "./DecryptForm";

const Home = () => {
  return (
    <div className="App">
      <section className="home-section">
      <h1>Welcome to the File Encryption & Decryption App</h1>
      <p>
        Secure your sensitive data using client-side encryption. Choose from multiple algorithms and keep full control of your privacy — no servers, no tracking, just security.
      </p>
      </section>

      <hr style={{ margin: "40px 0" }} />

      <div className="container">
        <div style={{ flex: 1 }}>
          <EncryptForm />
        </div>
        <div style={{ flex: 1 }}>
          <DecryptForm />
        </div>
      </div>
    </div>
  );
};



export default Home;
