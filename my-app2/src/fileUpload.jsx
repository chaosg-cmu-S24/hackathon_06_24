import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    // Perform the file upload logic here
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      // You can add your file upload logic here, for example:
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // axios.post('/upload', formData);
    } else {
      console.log('No file selected.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, width: '50%' }}>
      <input
        accept="application/pdf, video/*"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span">
          Select File
        </Button>
      </label>
      {selectedFile && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Selected File: {selectedFile.name}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleUploadClick} sx={{ mt: 2 }}>
        Upload
      </Button>
    </Box>
  );
};

export default FileUpload;
