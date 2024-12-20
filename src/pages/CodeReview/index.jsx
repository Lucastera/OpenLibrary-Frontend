import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Paper, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useCodeMirror } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { useNavigate } from 'react-router-dom';
// import { getCodeReview } from '../../api/index';
import { submitCodeReview } from '../../api/index';

const CodeContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  minHeight: '300px'
}));

const ReportContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '300px'
}));

const CodeReview = () => {
  // useEffect(() => {
  //   const loadData = async () => {
  //     const res = await getCodeReview({
  //       Page: 1,
  //       Size: 10
  //     });
  //     console.log(res);
  //   }
  //   loadData()
  // }, []);
  const [code, setCode] = useState('');
  const [report, setReport] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [appliedSuggestions, setAppliedSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Set up CodeMirror with Python language support
  const { setContainer } = useCodeMirror({
    value: code,
    extensions: [python()],
    onChange: (value) => setCode(value)
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
      console.log(code)
      const data = await submitCodeReview({
        fullCode: code
      });
      // console.log(response);

        // const data = await response.json();
        setReport(`Report generated for the provided code: ${code.substring(0, 100)}...`);
        // setSuggestions(data.suggestions || []);
        setSuggestions(data.issues || []);

        // setReport('Error: Unable to process code. Please try again later.');
      
    } catch (error) {
      console.log(error)
      setReport('Error: Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const applyChange = (index) => {
    const suggestion = suggestions[index];
    const modifiedCode = code.replace(suggestion.originalCode, suggestion.fixedCode);
  
    setAppliedSuggestions([...appliedSuggestions, { ...suggestion, index }]);
    setSuggestions(suggestions.map((s, i) => (i === index ? { ...s, applied: true } : s)));
    setCode(modifiedCode);
  };
  
  const rollbackChange = (index) => {
    const suggestion = appliedSuggestions.find((s) => s.index === index);
    if (!suggestion) return;
  
    const rolledBackCode = code.replace(suggestion.fixedCode, suggestion.originalCode);
  
    setAppliedSuggestions(appliedSuggestions.filter((s) => s.index !== index));
    setSuggestions(suggestions.map((s, i) => (i === index ? { ...s, applied: false } : s)));
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
                // accept=".py,.txt" // Accept Python and text files
                accept=".py,.js,.rb,.txt,.java,.cpp,.c,.php,.go,.html,.css,.json,.md,.cs"
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
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Loading suggestions...
                </Typography>
              </Box>
            ) : (
              <>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {report}
                </Typography>
                {suggestions.map((suggestion, index) => (
                  <Paper key={index} sx={{ p: 2, mt: 2, backgroundColor: suggestion.applied ? '#d1e7dd' : '#f5f5f5' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {suggestion.issueReason}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Original:</strong> {suggestion.originalCode}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Modified:</strong> {suggestion.fixedCode}
                    </Typography>
                    {suggestion.applied ? (
                      <Button variant="outlined" color="secondary" onClick={() => rollbackChange(index)} sx={{ mt: 1 }}>
                        Rollback
                      </Button>
                    ) : (
                      <Button variant="outlined" color="primary" onClick={() => applyChange(index)} sx={{ mt: 1 }}>
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
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, mr: 45 }} disabled={loading}>
        Submit
      </Button>
      
      {/* View History Button */}
      <Button variant="contained" color="secondary" onClick={() => navigate('/review/history')} sx={{ mt: 2 }}>
        View History
      </Button>

    </Box>
  );
};

export default CodeReview;
