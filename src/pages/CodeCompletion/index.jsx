// Import necessary components from Material-UI
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

// Project imports
import MainCard from 'component/cards/MainCard';

const CodeCompletion = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputCode(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Function to handle code completion
  const handleCodeCompletion = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/code-completion-history-table-other', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputCode })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.code === 200) {
        setOutputCode(data.data.completed_code);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(`Error completing code: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to save completed code
  const handleSaveResult = () => {
    const blob = new Blob([outputCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'completed_code.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <MainCard title="Code Completion">
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="body2">Code Completion Tool</Typography>
        
        <Box display="flex" gap={2}>
          <Box flex={1}>
            <Typography variant="h6">Input Code</Typography>
            <TextField
              multiline
              rows={18}
              variant="outlined"
              fullWidth
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 1 }}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
          </Box>
          
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleCodeCompletion}
              disabled={loading}
            >
              {loading ? 'Completing...' : 'Complete Code'}
            </Button>
          </Box>

          <Box flex={1}>
            <Typography variant="h6">Output Code</Typography>
            <TextField
              multiline
              rows={18}
              variant="outlined"
              fullWidth
              value={outputCode}
              onChange={(e) => setOutputCode(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleSaveResult}
              disabled={!outputCode}
            >
              Save Result
            </Button>
          </Box>
        </Box>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Box>
    </MainCard>
  );
};

export default CodeCompletion;