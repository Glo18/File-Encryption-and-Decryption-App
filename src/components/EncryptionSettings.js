import React, { useState } from "react";

const EncryptionSettings = ({ onSelectAlgorithm }) => {
    // Default encryption algorithm set to AES
    const [algorithm, setAlgorithm] = useState("AES-256");

    // Handles encryption algorithm selection
    const handleAlgorithmChange = (e) => {
        setAlgorithm(e.target.value);
        onSelectAlgorithm(e.target.value); // Pass selection to parent component
    };

    return (
        <div className="encryption-container"> {/* Use the common class from App.css*/}
            <h3>Select Encryption Algorithm:</h3>
            <select value={algorithm} onChange={handleAlgorithmChange}>
                <option value="AES-256">AES-256</option>
                <option value="Triple DES">Triple DES</option>
                <option value="Blowfish">Blowfish</option>
                <option value="Rabbit">Rabbit</option>
            </select>
        </div>
    );
};

export default EncryptionSettings;
