import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Paper, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { getReviewDetailHistory } from '../../api/index';

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
  // const { reviewId } = useParams(); // Extract reviewId from URL parameters
  const { historyID } = useParams();

  const [reviewDetails, setReviewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setContainer } = useCodeMirror({
    value: reviewDetails ? reviewDetails.code_content : '',
    extensions: [javascript()],
    editable: false,
  });

  useEffect(() => {
    const fetchReviewDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getReviewDetailHistory(historyID);
  
        // Log the response to inspect the structure
        console.log('Full Response:', response);
  
        // Directly access fields from the response object
        if (response && response.code_content && response.history_id) {
          setReviewDetails(response); // Use the response directly
        } else {
          throw new Error('Invalid response format: no data fields found');
        }
      } catch (error) {
        console.error('Error fetching review details:', error);
        setError(error.message || 'An error occurred while loading review details');
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviewDetails();
  }, [historyID]);
  

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CodeContainer>
            <Typography variant="h6">
              {/* {reviewDetails ? `Code Review Details for ID: ${reviewDetails.review_id}` : "Loading..."} */}
              {reviewDetails ? `Code Review Details for ID: ${reviewDetails.history_id}` : "Loading..."}
            </Typography>
            {loading ? (
              <CircularProgress sx={{ mt: 2 }} />
            ) : error ? (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>{error}</Typography>
            ) : (
              <>
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
              </>
            )}
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
            ) : error ? (
              <Typography variant="body2" color="error" align="center">{error}</Typography>
            ) : (
              reviewDetails.issues.map((issue, index) => (
                <Paper key={index} sx={{ p: 2, mt: 2, backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Issue:</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>{issue.issueReason}</Typography>
                  <Typography variant="body2"><strong>Original Code:</strong> {issue.originalCode}</Typography>
                  <Typography variant="body2"><strong>Suggestion:</strong> {issue.suggestion}</Typography>
                  <Typography variant="body2"><strong>Fixed Code:</strong> {issue.fixedCode}</Typography>
                </Paper>
              ))
            )}
          </ReportContainer>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/review/history')}
        sx={{ mt: 2 }}
      >
        Return to Review History
      </Button>
    </Box>
  );
};

export default ViewDetailHistory;
