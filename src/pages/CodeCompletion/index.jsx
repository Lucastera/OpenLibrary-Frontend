// Import necessary components from Material-UI
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios'; // Axios for API requests

// Import MainCard component (assuming it is available in the project structure)
import MainCard from 'component/cards/MainCard';

const CodeCompletion = () => {
  const [inputCode, setInputCode] = useState(''); // State for input code
  const [outputCode, setOutputCode] = useState(''); // State for output code
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(null); // Error state for displaying errors

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputCode(e.target.result); // Set the inputCode state to the file content
      };
      reader.readAsText(file); // Read the file content as text
    }
  };

  // Function to handle code completion (calls the API)
  const handleCodeCompletion = async () => {
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors

    try {
      // Call the API using Axios
      const response = await axios.post('/completion/complete', {
        inputCode // Send the inputCode as the request body
      });

      // Check if the response is successful
      if (response.data && response.data.code === 200) {
        setOutputCode(response.data.data.completed_code); // Update outputCode with completed code
      } else {
        setError(response.data.message || 'Failed to complete the code.'); // Handle API errors
      }
    } catch (error) {
      setError(`Error completing code: ${error.message}`); // Handle network or server errors
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  // Function to save the completed code as a file
  const handleSaveResult = () => {
    const blob = new Blob([outputCode], { type: 'text/plain' }); // Create a Blob with the output code
    const url = URL.createObjectURL(blob); // Create a URL for the Blob
    const a = document.createElement('a');
    a.href = url;
    a.download = 'completed_code.txt'; // Define the download filename
    a.click(); // Trigger the download
    URL.revokeObjectURL(url); // Revoke the Blob URL to release memory
  };

  return (
    <MainCard title="Code Completion">
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="body2">Code Completion Tool</Typography>
        
        <Box display="flex" gap={2}>
          {/* Input Code Section */}
          <Box flex={1}>
            <Typography variant="h6">Input Code</Typography>
            <TextField
              multiline
              rows={18}
              variant="outlined"
              fullWidth
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)} // Update inputCode state on change
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
                onChange={handleFileUpload} // Handle file upload
              />
            </Button>
          </Box>
          
          {/* Code Completion Button */}
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleCodeCompletion} // Trigger code completion
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Completing...' : 'Complete Code'} {/* Show loading state */}
            </Button>
          </Box>

          {/* Output Code Section */}
          <Box flex={1}>
            <Typography variant="h6">Output Code</Typography>
            <TextField
              multiline
              rows={18}
              variant="outlined"
              fullWidth
              value={outputCode}
              onChange={(e) => setOutputCode(e.target.value)} // Update outputCode state on change
            />
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleSaveResult} // Trigger save result
              disabled={!outputCode} // Disable button if there's no output code
            >
              Save Result
            </Button>
          </Box>
        </Box>

        {/* Error Message Section */}
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
