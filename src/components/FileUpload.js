// Import dependecies
import React, { useState } from "react";


// FileUpload Component - Handles file selection for encryption
const FileUpload = () => {
    // Define state variable to store the uploaded file
    const [file, setFile] = useState(null);

    // Function to handle file selection
    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0]; // Get the first selected file
        if (uploadedFile) {
            setFile(uploadedFile); // Update the state with the selected file
            alert(`File "${uploadedFile.name}" uploaded successfully!`);
        }
    };

    return (
        <div className="file-upload">
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            {file && <p>{file.name} is ready for encryption.</p>}
        </div>
    );
};

// Export the FileUpload component 
export default FileUpload;
