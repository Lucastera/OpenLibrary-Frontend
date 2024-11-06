import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField } from '@mui/material';

// project imports
import MainCard from 'component/cards/MainCard';

const CodeExplanation = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState('');
  const [annotatedCode, setAnnotatedCode] = useState('');
  const [codeReport, setCodeReport] = useState('');
  const [file, setFile] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(['file1.txt', 'file2.txt', 'file3.txt']);
  const [selectedFile, setSelectedFile] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    if (file) {
      // Simulate file upload
      setUploadedFiles([...uploadedFiles, file.name]);
      setFile(null);
    }
  };

  const handleUploadNewFile = () => {
    setActiveFeature('uploadNewFile');
    setAnnotatedCode('');
    setCodeReport('');
    setShowChat(false);
  };

  const handleViewUploadedFile = () => {
    setActiveFeature('viewUploadedFile');
    setAnnotatedCode('');
    setCodeReport('');
    setShowChat(false);
  };

  const handleGenerateAnnotations = () => {
    setActiveFeature('generateAnnotations');
    setAnnotatedCode('// Annotated code example\nfunction example() {}');
    setCodeReport('');
    setShowChat(false);
  };

  const handleGenerateCodeReport = () => {
    setActiveFeature('generateCodeReport');
    setAnnotatedCode('');
    setCodeReport('Line 1: Function declaration\nLine 2: Empty function body');
    setShowChat(true);
  };

  const handleSelectFile = (fileName) => {
    setSelectedFile(fileName);
    setActiveFeature('generateAnnotations');
    setAnnotatedCode(`// Annotated code for ${fileName}\nfunction example() {}`);
    setCodeReport('');
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      setChatHistory([...chatHistory, { role: 'user', message: chatInput }]);
      setChatHistory((prev) => [...prev, { role: 'system', message: 'Response from system.' }]);
      setChatInput('');
    }
  };

  return (
    <MainCard title="Code Explanation">
      <Box display="flex" justifyContent="space-between" gap={2} p={2}>
        <Button variant="contained" fullWidth style={{ backgroundColor: '#e0f7fa', color: '#000' }} onClick={handleUploadNewFile}>
          Upload New File
        </Button>
        <Button variant="contained" fullWidth style={{ backgroundColor: '#f1f8e9', color: '#000' }} onClick={handleViewUploadedFile}>
          View Uploaded Files
        </Button>
        <Button variant="contained" fullWidth style={{ backgroundColor: '#fff9c4', color: '#000' }} onClick={handleGenerateAnnotations}>
          Generate Annotations
        </Button>
        <Button variant="contained" fullWidth style={{ backgroundColor: '#ffe0b2', color: '#000' }} onClick={handleGenerateCodeReport}>
          Generate Interpretation Report
        </Button>
      </Box>

      {activeFeature === 'uploadNewFile' && (
        <Box mt={2}>
          <form onSubmit={handleUpload}>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
            <Typography variant="body2" display="inline" ml={2}>
              {file ? file.name : 'No file selected'}
            </Typography>
            <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '16px' }}>
              Upload
            </Button>
          </form>
        </Box>
      )}

      {activeFeature === 'viewUploadedFile' && (
        <Box mt={2}>
          <Typography variant="h6">Uploaded Files</Typography>
          {uploadedFiles.map((fileName, index) => (
            <Box key={index} display="flex" alignItems="center" mt={1}>
              <Typography variant="body2" style={{ flexGrow: 1 }}>
                {fileName}
              </Typography>
              <Button variant="outlined" onClick={() => handleSelectFile(fileName)}>
                Select
              </Button>
            </Box>
          ))}
        </Box>
      )}

      {activeFeature === 'generateAnnotations' && selectedFile && (
        <Box mt={2}>
          <Typography variant="h6">Commented Code for {selectedFile}</Typography>
          <pre>{annotatedCode}</pre>
        </Box>
      )}

      {activeFeature === 'generateCodeReport' && (
        <Box mt={2}>
          <Typography variant="h6">Code Explanation Report</Typography>
          <pre>{codeReport}</pre>
        </Box>
      )}

      {showChat && (
        <Box mt={4}>
          <Typography variant="h6">Chat with System</Typography>
          <Box mt={2}>
            {chatHistory.map((chat, index) => (
              <Typography key={index} color={chat.role === 'user' ? 'primary' : 'textSecondary'}>
                {chat.role === 'user' ? 'You: ' : 'System: '}
                {chat.message}
              </Typography>
            ))}
          </Box>
          <Box display="flex" mt={2} gap={1}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleChatSubmit}>
              Send
            </Button>
          </Box>
        </Box>
      )}
    </MainCard>
  );
};

export default CodeExplanation;