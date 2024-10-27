// // material-ui
// import Typography from '@mui/material/Typography';


// // ==============================|| SAMPLE PAGE ||============================== //

// const CodeReview = () => (
//   <Typography variant="body2">
//     Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad minim
//     venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended in
//     voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate descent
//     molls anim id est labours.
//   </Typography>
// );

// export default CodeReview;
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

// Styled components for better layout
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

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

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

  const handleSubmit = () => {
    // Here you would integrate with the backend or AI model to get the report
    const generatedReport = `Report generated for the provided code: ${code.substring(0, 100)}...`; // Limit display to prevent overflow
    setReport(generatedReport);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CodeContainer>
            <Typography variant="h6">Your Code</Typography>
            <TextField
              label="Copy and paste your code"
              multiline
              fullWidth
              rows={10}
              value={code}
              onChange={handleCodeChange}
              variant="outlined"
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2 }}
            >
              Upload File
              <input
                type="file"
                hidden
                accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.txt,.json,.html" // Accepting common code file types
                onChange={handleFileUpload}
              />
            </Button>
          </CodeContainer>
        </Grid>
        <Grid item xs={6}>
          <ReportContainer>
            <Typography variant="h6">Report</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {report || 'No report generated yet. Please submit your code.'}
            </Typography>
          </ReportContainer>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CodeReview;
