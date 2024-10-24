import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("http://127.0.0.1:8000/categorize-transaction", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    }).then((response) => {
      console.log('resp: ',response);
      alert("File uploaded successfully!");
    })

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".csv,.ofx" />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

export default FileUpload;
