import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Paper, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const CodeContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  minHeight: '300px',
}));

const ReportContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '300px',
}));

const ViewDetailHistory = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();

  const mockData = {
    review_id: 1,
    code_content: "function add(a, b) { return a + b; }",
    code_language: "JavaScript",
    create_time: "2024-01-01T12:00:00Z",
    update_time: "2024-01-02T12:00:00Z",
    codeSnippets: [
      {
        originalCode: "function add(a, b) { return a + b; }",
        issueReason: "Missing semicolon at the end.",
        issueLine: 1,
        suggestion: "Add a semicolon at the end of the return statement.",
        fixedCode: "function add(a, b) { return a + b; }"
      }
    ]
  };

  const [reviewDetails, setReviewDetails] = useState(mockData);
  const [loading, setLoading] = useState(false);

  const { setContainer } = useCodeMirror({
    value: reviewDetails.code_content,
    extensions: [javascript()],
    editable: false,
  });

  useEffect(() => {
    setLoading(true);
    // Simulate fetching data by reviewId
    setTimeout(() => {
      setReviewDetails(mockData);
      setLoading(false);
    }, 1000);
  }, [reviewId]);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CodeContainer>
            <Typography variant="h6">Code Review Details for ID: {reviewDetails.review_id}</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Language:</strong> {reviewDetails.code_language}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Created:</strong> {new Date(reviewDetails.create_time).toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Updated:</strong> {new Date(reviewDetails.update_time).toLocaleString()}
            </Typography>
            <div ref={setContainer} style={{ height: '300px', overflow: 'auto', marginTop: '1rem' }} />
          </CodeContainer>
        </Grid>
        <Grid item xs={6}>
          <ReportContainer>
            <Typography variant="h6">Issues and Suggestions</Typography>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
                <Typography variant="body2" sx={{ ml: 2 }}>Loading details...</Typography>
              </Box>
            ) : (
              reviewDetails.codeSnippets.map((snippet, index) => (
                <Paper key={index} sx={{ p: 2, mt: 2, backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Issue:</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>{snippet.issueReason}</Typography>
                  <Typography variant="body2"><strong>Original Code:</strong> {snippet.originalCode}</Typography>
                  <Typography variant="body2"><strong>Suggestion:</strong> {snippet.suggestion}</Typography>
                  <Typography variant="body2"><strong>Fixed Code:</strong> {snippet.fixedCode}</Typography>
                </Paper>
              ))
            )}
          </ReportContainer>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/review-history')}
        sx={{ mt: 2 }}
      >
        Return to Review History
      </Button>
    </Box>
  );
};

export default ViewDetailHistory;
