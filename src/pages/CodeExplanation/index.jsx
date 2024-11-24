import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import MainCard from 'component/cards/MainCard';
import {
  getCodeExplanationUpload,
  getCodeExplanationHistory,
  getCodeExplanationGenerate_explanation,
  getCodeExplanationGenerate_report
} from '../../api';

const CodeExplanation = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState('');
  const [annotatedCode, setAnnotatedCode] = useState('');
  const [codeReport, setCodeReport] = useState('');
  const [file_lib, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  const handleFileChange = (event) => {
    const file_lib = event.target.files[0];
    setFile(file_lib);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    if (file_lib) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const file = e.target.result;
        const FileName = file_lib.name;
        const File_size = `${file.length}`;
        const UserID = '2';

        getCodeExplanationUpload({ 
          file: file,
          Filename: FileName, 
          File_size: File_size, 
          UserID: UserID })
          .then((response) => {
            console.log('Upload Success:', response);
            setUploadedFiles([...uploadedFiles, FileName]);
          })
          .catch((error) => {
            console.error('Upload Error:', error);
          });

        setFile(null);
      };

      reader.readAsText(file_lib);
    }
  };

  const handleUploadNewFile = () => {
    setActiveFeature('uploadNewFile');
    setAnnotatedCode('');
    setCodeReport('');
  };

  const handleViewUploadedFile = () => {
    setActiveFeature('viewUploadedFile');
    const UserID = '2';
    getCodeExplanationHistory({ id: UserID })
      .then((response) => {
        // console.log('History:', response);
        // Extract file names from the response
        const fileNames = response.files_list.map(file => ({
          name: file.name,
          uploadTime: file.upload_time
        }));
        // Update uploadedFiles state
        setUploadedFiles(fileNames);
      })
      .catch((error) => {
        console.error('History Error:', error);
      });
  };

  const handleGenerateAnnotations = () => {
    if (selectedFile) {
      getCodeExplanationGenerate_explanation({ Filename: selectedFile })
        .then((response) => {
          // console.log('Explanation:', response);
          setAnnotatedCode(response); // Update with actual response data
          setActiveFeature('generateAnnotations');
        })
        .catch((error) => {
          console.error('Explanation Error:', error);
          // setAnnotatedCode('Error generating annotations');
        });
    }
  };

  const handleGenerateCodeReport = () => {
    if (selectedFile) {
      getCodeExplanationGenerate_report({ Filename: selectedFile })
        .then((response) => {
          // console.log('Report:', response);
          setCodeReport(response); // Update with actual response data
          setActiveFeature('generateCodeReport');
        })
        .catch((error) => {
          console.error('Report Error:', error);
          // setCodeReport('Error generating report');
        });
    }
  };

  const handleSelectFile = (FileName) => {
    setSelectedFile(FileName);
    setActiveFeature('generateAnnotations');
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
              {file_lib ? file_lib.name : 'No file selected'}
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
          {uploadedFiles.map((file, index) => (
            <Box key={index} display="flex" alignItems="center" mt={1}>
              <Typography variant="body2" style={{ flexGrow: 1 }}>
                {file.name} [ {file.uploadTime}]
              </Typography>
              <Button variant="outlined" onClick={() => handleSelectFile(file.name)}>
                Select This File
              </Button>
            </Box>
          ))}
        </Box>
      )}

      {activeFeature === 'generateAnnotations' && selectedFile && (
        <Box mt={2}>
          <Typography variant="h6">Commented Code for {selectedFile}</Typography>
          <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{annotatedCode}</pre>
        </Box>
      )}

      {activeFeature === 'generateCodeReport' && selectedFile &&(
        <Box mt={2}>
          <Typography variant="h6">Code Explanation Report</Typography>
          <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{codeReport}</pre>
        </Box>
      )}
    </MainCard>
  );
};

export default CodeExplanation;