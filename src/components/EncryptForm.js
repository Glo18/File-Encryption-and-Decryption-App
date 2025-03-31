//Import dependecies
import React, { useState } from "react";
import CryptoJS from "crypto-js";

// EncryptForm Component - Handles text encryption
const EncryptForm = () => {
    // Define state variables to store user input and encrypted text
    const [text, setText] = useState(""); // Stores the input text to be encrypted
    const [key, setKey] = useState(""); // Stores the encryption key
    const [encryptedText, setEncryptedText] = useState(""); // Stores the encrypted output
    const [file, setFile] = useState(null);
    const [encryptedFile, setEncryptedFile] = useState(null);
    const [mode, setMode] = useState("text"); // Mode can be "text" or "file"
    const [algorithm, setAlgorithm] = useState("AES"); // Default: AES

    // Handles file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const updateLocalStorageActivity = (type, fileName = null) => {
        const stats = JSON.parse(localStorage.getItem("activityStats")) || {
          encrypted: 0,
          decrypted: 0,
          downloads: 0,
          success: 0,
          failed: 0,
          lastActivity: "N/A",
        };

        const fileActivities = JSON.parse(localStorage.getItem("fileActivities")) || [];

        const timestamp = new Date().toLocaleString();
        const newActivity = { fileName, type, timestamp };
      
          // Update stats
          if (type === "Encrypted") stats.encrypted++;
          if (type === "Downloaded") stats.downloads++;
          if (["Encrypted", "Downloaded"].includes(type)) stats.success++;
          if (type === "Failed Encryption") stats.failed++;
      
          stats.lastActivity = newActivity.timestamp;

          localStorage.setItem("activityStats", JSON.stringify(stats));
          localStorage.setItem("fileActivities", JSON.stringify([newActivity, ...fileActivities]));
  };

    // Function to handle encryption process
    const handleTextEncrypt = () => {
        // Ensure that both text and key are provided before proceeding
        if (!text || !key) {
            alert("Please enter both text and encryption key!");
            updateLocalStorageActivity("Failed Encryption");
            return;
        }
        // Encrypt the input text using AES encryption with the provided key
        //const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        try {
        let encrypted;
        switch (algorithm) {
            case "AES":
                encrypted = CryptoJS.AES.encrypt(text, key).toString();
                break;
            case "TripleDES":
                encrypted = CryptoJS.TripleDES.encrypt(text, key).toString();
                break;
            case "Blowfish":
                encrypted = CryptoJS.Blowfish.encrypt(text, key).toString();
                break;
            case "Rabbit":
                encrypted = CryptoJS.Rabbit.encrypt(text, key).toString();
                break;
            default:
                alert("Unsupported encryption algorithm selected!");
                return;
        }

        // Update state with the encrypted text
        setEncryptedText(encrypted);
        updateLocalStorageActivity("Encrypted");
        } catch (error) {
            alert("Encryption failed.");
      updateLocalStorageActivity("Failed Encryption");
    }
    };

    // Encrypts the selected file
    const handleFileEncrypt = async () => {
        if (!file || !key) {
            alert("Please select a file and enter an encryption key!");
            updateLocalStorageActivity("Failed Encryption", file?.name || "Unknown File");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const fileData = reader.result;
            //const encrypted = CryptoJS.AES.encrypt(fileData, key).toString();
           
            try {
            let encrypted;
            switch (algorithm) {
                case "AES":
                    encrypted = CryptoJS.AES.encrypt(fileData, key).toString();
                    break;
                case "TripleDES":
                    encrypted = CryptoJS.TripleDES.encrypt(fileData, key).toString();
                    break;
                case "Blowfish":
                    encrypted = CryptoJS.Blowfish.encrypt(fileData, key).toString();
                    break;
                default:
                    alert("This encryption algorithm is not supported for file encryption.");
                    return;
            }

            setEncryptedFile(encrypted);
            updateLocalStorageActivity("Encrypted", file.name);
        } catch {
            alert("Encryption failed.");
            updateLocalStorageActivity("Failed Encryption", file.name);
        }
        };
    };

    // Triggers file download
    const downloadEncryptedFile = () => {
        if (!encryptedFile) return;
        const blob = new Blob([encryptedFile], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${file.name}.enc`;        
        link.click();
        updateLocalStorageActivity("Downloaded", `${file.name}.enc`);
    };

    return (
        <div>
            <h2>Encrypt File or Text</h2>

            {/* Encryption Mode Selection */}
            <select onChange={(e) => setMode(e.target.value)}>
                <option value="text">Encrypt Text</option>
                <option value="file">Encrypt File</option>
            </select>

            {/* Encryption Algorithm Selection */}
            <select onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="AES">AES</option>
                <option value="TripleDES">Triple DES</option>
                <option value="Blowfish">Blowfish</option>
                <option value="Rabbit">Rabbit (Text Only)</option>
            </select>

            {/* Text Encryption Mode */}
            {mode === "text" && (
                <>
            <textarea rows="4" placeholder="Enter text to encrypt" value={text} onChange={(e) => setText(e.target.value)} />
            <input type="password" placeholder="Encryption Key" value={key} onChange={(e) => setKey(e.target.value)} />
            <button onClick={handleTextEncrypt}>Encrypt Text</button>
            {encryptedText && <textarea rows="3" readOnly value={encryptedText} />}
            </>
            )}
            
            {/* File Encryption Mode */}
            {mode === "file" && (
                <>
                    <input type="file" onChange={handleFileChange} />
                    <input type="password" placeholder="Encryption Key" value={key} onChange={(e) => setKey(e.target.value)} />
                    <button onClick={handleFileEncrypt}>Encrypt File</button>
                    {encryptedFile && <button onClick={downloadEncryptedFile}>Download Encrypted File</button>}
                </>
            )}
        </div>
    );
};

// Export the EncryptForm component
export default EncryptForm;
