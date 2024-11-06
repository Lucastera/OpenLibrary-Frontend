import React, { useState } from 'react';
import { Typography, Button, Box, Paper, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useCodeMirror } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

const CodeContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  minHeight: '300px',
}));

const ReportContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '300px',
}));

const CodeReview = () => {
  const [code, setCode] = useState('');
  const [report, setReport] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [appliedSuggestions, setAppliedSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Set up CodeMirror with Python language support
  const { setContainer } = useCodeMirror({
    value: code,
    extensions: [python()],
    onChange: (value) => setCode(value),
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setReport('');
    setSuggestions([]);
    setAppliedSuggestions([]);
    
    try {
      const response = await fetch('/api/analyze-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const data = await response.json();
        setReport(`Report generated for the provided code: ${code.substring(0, 100)}...`);
        setSuggestions(data.suggestions || []);
      } else {
        setReport('Error: Unable to process code. Please try again later.');
      }
    } catch (error) {
      setReport('Error: Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const applyChange = (index) => {
    const suggestion = suggestions[index];
    const modifiedCode = code.replace(suggestion.change.original, suggestion.change.modified);

    setAppliedSuggestions([...appliedSuggestions, suggestion]);
    setSuggestions(suggestions.map((s, i) => (i === index ? { ...s, applied: true } : s)));
    setCode(modifiedCode);
  };

  const rollbackChange = (index) => {
    const suggestion = appliedSuggestions[index];
    const rolledBackCode = code.replace(suggestion.change.modified, suggestion.change.original);

    setAppliedSuggestions(appliedSuggestions.filter((_, i) => i !== index));
    setSuggestions(suggestions.map((s) => (s === suggestion ? { ...s, applied: false } : s)));
    setCode(rolledBackCode);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CodeContainer>
            <Typography variant="h6">Your Code</Typography>
            <div ref={setContainer} style={{ height: '300px', overflow: 'auto' }} /> {/* CodeMirror editor container */}
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Upload File
              <input
                type="file"
                hidden
                accept=".py,.txt" // Accept Python and text files
                onChange={handleFileUpload}
              />
            </Button>
          </CodeContainer>
        </Grid>
        <Grid item xs={6}>
          <ReportContainer>
            <Typography variant="h6">Report</Typography>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
                <Typography variant="body2" sx={{ ml: 2 }}>Loading suggestions...</Typography>
              </Box>
            ) : (
              <>
                <Typography variant="body2" sx={{ mt: 2 }}>{report}</Typography>
                {suggestions.map((suggestion, index) => (
                  <Paper key={index} sx={{ p: 2, mt: 2, backgroundColor: suggestion.applied ? '#d1e7dd' : '#f5f5f5' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{suggestion.reason}</Typography>
                    <Typography variant="body2"><strong>Original:</strong> {suggestion.change.original}</Typography>
                    <Typography variant="body2"><strong>Modified:</strong> {suggestion.change.modified}</Typography>
                    {suggestion.applied ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => rollbackChange(index)}
                        sx={{ mt: 1 }}
                      >
                        Rollback
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => applyChange(index)}
                        sx={{ mt: 1 }}
                      >
                        Apply
                      </Button>
                    )}
                  </Paper>
                ))}
              </>
            )}
          </ReportContainer>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CodeReview;

