//Import dependencies
import React, { useState } from "react";
import CryptoJS from "crypto-js";

// DecryptForm Component - Handles text decryption
const DecryptForm = () => {
    // Define state variables to store user input and decrypted text
    const [ciphertext, setCiphertext] = useState(""); // Stores the encrypted text input
    const [key, setKey] = useState(""); // Stores the decryption key
    const [decryptedText, setDecryptedText] = useState(""); // Stores the decrypted output
    const [file, setFile] = useState(null);
    const [decryptedFile, setDecryptedFile] = useState(null);
    const [mode, setMode] = useState("text"); // "text" or "file"
    const [algorithm, setAlgorithm] = useState("AES"); // Default decryption algorithm

    // Handles file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Update activityStats and fileActivities in localStorage
  const updateLocalStorageActivity = (type, fileName = "Text Data") => {
    const stats = JSON.parse(localStorage.getItem("activityStats")) || {
      encrypted: 0,
      decrypted: 0,
      downloads: 0,
      success: 0,
      failed: 0,
      lastActivity: "N/A",
    };

    const activities = JSON.parse(localStorage.getItem("fileActivities")) || [];

    const timestamp = new Date().toLocaleString();
    const newActivity = { fileName, type, timestamp };

    if (type === "Decrypted") stats.decrypted++;
    if (type === "Downloaded") stats.downloads++;
    if (["Decrypted", "Downloaded"].includes(type)) stats.success++;
    if (type === "Failed Decryption") stats.failed++;

    stats.lastActivity = timestamp;

    localStorage.setItem("activityStats", JSON.stringify(stats));
    localStorage.setItem("fileActivities", JSON.stringify([newActivity, ...activities]));
  };

    // Function to handle decryption process
    const handleTextDecrypt = () => {
        if (!ciphertext || !key) {
            alert("Please enter both encrypted text and decryption key!");
            updateLocalStorageActivity("Failed Decryption");
            return;
        }

        try {
            let bytes;
            switch (algorithm) {
                case "AES":
                    bytes = CryptoJS.AES.decrypt(ciphertext, key);
                    break;
                case "TripleDES":
                    bytes = CryptoJS.TripleDES.decrypt(ciphertext, key);
                    break;
                case "Blowfish":
                    bytes = CryptoJS.Blowfish.decrypt(ciphertext, key);
                    break;
                case "Rabbit":
                    bytes = CryptoJS.Rabbit.decrypt(ciphertext, key);
                    break;
                default:
                    alert("Unsupported decryption algorithm selected!");
                    return;
            }
            
            
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            if (!decrypted) {
                alert("Invalid key or corrupted data!");
                updateLocalStorageActivity("Failed Decryption");
                return;
            }

            // Update state with the decrypted text
            setDecryptedText(decrypted);
            updateLocalStorageActivity("Decrypted");
        } catch (error) {
            alert("Failed to decrypt. Please check your key.");
            updateLocalStorageActivity("Failed Decryption");
        }
    };

    // Decrypts an uploaded file
    const handleFileDecrypt = async () => {
        if (!file || !key) {
            alert("Please select an encrypted file and enter a decryption key!");
            updateLocalStorageActivity("Failed Decryption", file?.name || "Unknown File");
            return;
        }

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = () => {
            const encryptedFileData = reader.result;

            try {
                let bytes;
                switch (algorithm) {
                    case "AES":
                        bytes = CryptoJS.AES.decrypt(encryptedFileData, key);
                        break;
                    case "TripleDES":
                        bytes = CryptoJS.TripleDES.decrypt(encryptedFileData, key);
                        break;
                    case "Blowfish":
                        bytes = CryptoJS.Blowfish.decrypt(encryptedFileData, key);
                        break;
                    default:
                        alert("This decryption algorithm is not supported for files.");
                        return;
                }
                
                const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                if (!decrypted) {
                    alert("Invalid key or corrupted file!");
                    updateLocalStorageActivity("Failed Decryption", file.name);
                    return;
                }

                setDecryptedFile(decrypted);
                updateLocalStorageActivity("Decrypted", file.name);
            } catch (error) {
                alert("Failed to decrypt. Check your key and file format.");
                updateLocalStorageActivity("Failed Decryption", file.name);
            }
        };
    };

    // Triggers decrypted file download
    const downloadDecryptedFile = () => {
        if (!decryptedFile) return;
        const blob = new Blob([decryptedFile], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = file.name.replace(".enc", "") || "decrypted.txt"; // Restore original filename
        link.click();

        updateLocalStorageActivity("Downloaded", file.name);
    };

    return (
        <div>
            <h2>Decrypt File or Text</h2>

            {/* Decryption Mode Selection */}
            <select onChange={(e) => setMode(e.target.value)}>
                <option value="text">Decrypt Text</option>
                <option value="file">Decrypt File</option>
            </select>

            {/* Decryption Algorithm Selection */}
            <select onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="AES">AES</option>
                <option value="TripleDES">Triple DES</option>
                <option value="Blowfish">Blowfish</option>
                <option value="Rabbit">Rabbit (Text Only)</option>
            </select>

            {/* Text Decryption Mode */}
            {mode === "text" && (
                <>
                <textarea rows="4" placeholder="Paste decrypted text" value={ciphertext} onChange={(e) => setCiphertext(e.target.value)} />
                <input type="password" placeholder="Decryption Key" value={key} onChange={(e) => setKey(e.target.value)} />
                <button onClick={handleTextDecrypt}>Decrypt Text</button>
                {decryptedText && <textarea rows="3" readOnly value={decryptedText} />}
                </>
            )} 
            
            {/* File Decryption Mode */}
            {mode === "file" && (
                <>
                    <input type="file" onChange={handleFileChange} />
                    <input type="password" placeholder="Decryption Key" value={key} onChange={(e) => setKey(e.target.value)} />
                    <button onClick={handleFileDecrypt}>Decrypt File</button>
                    {decryptedFile && <button onClick={downloadDecryptedFile}>Download Decrypted File</button>}
                </>
            )}
        </div>
    );
};

// Export the EncryptForm component
export default DecryptForm;
