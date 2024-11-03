// material-ui
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

// import React, { useState } from 'react';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import { UploadFile } from '@mui/icons-material';
// import { TextareaAutosize } from '@mui/material';

// const CodeReview = () => {
//   const [code, setCode] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [highlightedCode, setHighlightedCode] = useState('');

//   // Example function to handle file upload (you can adjust this to suit your needs)
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setCode(reader.result);
//       // Simulate code analysis and generate suggestions
//       setSuggestions([
//         { line: 1, original: 'function(a, b)', modified: 'sum(a, b)' },
//         // Add more suggestions as needed
//       ]);
//       setHighlightedCode(reader.result); // Initial state could be the same as the uploaded code
//     };
//     reader.readAsText(file);
//   };

//   const applySuggestion = (suggestion) => {
//     // Update the code based on the suggestion
//     const newCode = code.replace(suggestion.original, suggestion.modified);
//     setCode(newCode);
//     setHighlightedCode(newCode);
//     // Optionally remove the applied suggestion from the list
//     setSuggestions(suggestions.filter((s) => s !== suggestion));
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6">Code Review Tool</Typography>
      
//       <Box sx={{ marginY: 2 }}>
//         <Button
//           variant="contained"
//           component="label"
//           startIcon={<UploadFile />}
//         >
//           Upload File
//           <input
//             type="file"
//             hidden
//             onChange={handleFileUpload}
//           />
//         </Button>
//       </Box>

//       <Box sx={{ display: 'flex', gap: 2 }}>
//         <Paper sx={{ flex: 1, padding: 2, overflow: 'auto', maxHeight: 400 }}>
//           <Typography variant="subtitle1">Uploaded Code</Typography>
//           <TextareaAutosize
//             minRows={10}
//             style={{ width: '100%', fontFamily: 'monospace', fontSize: '14px' }}
//             value={highlightedCode}
//             onChange={(e) => setHighlightedCode(e.target.value)}
//           />
//         </Paper>

//         <Paper sx={{ flex: 1, padding: 2, overflow: 'auto', maxHeight: 400 }}>
//           <Typography variant="subtitle1">Suggestions</Typography>
//           {suggestions.map((suggestion, index) => (
//             <Box key={index} sx={{ marginBottom: 1 }}>
//               <Typography>
//                 Line {suggestion.line}: <br />
//                 <b>Original:</b> {suggestion.original} <br />
//                 <b>Modified:</b> {suggestion.modified}
//               </Typography>
//               <Button
//                 variant="contained"
//                 size="small"
//                 onClick={() => applySuggestion(suggestion)}
//                 sx={{ marginTop: 1 }}
//               >
//                 Apply Change
//               </Button>
//             </Box>
//           ))}
//         </Paper>
//       </Box>
//     </Box>
//   );
// };

// export default CodeReview;


// import React, { useState } from 'react';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import { styled } from '@mui/system';

// // Styled components for better layout
// const CodeContainer = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(2),
//   minHeight: '300px',
// }));

// const ReportContainer = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   minHeight: '300px',
// }));

// const CodeReview = () => {
//   const [code, setCode] = useState('');
//   const [report, setReport] = useState('');

//   const handleCodeChange = (event) => {
//     setCode(event.target.value);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setCode(e.target.result);
//       };
//       reader.readAsText(file);
//     }
//   };

//   const handleSubmit = () => {
//     // Here you would integrate with the backend or AI model to get the report
//     const generatedReport = `Report generated for the provided code: ${code.substring(0, 100)}...`; // Limit display to prevent overflow
//     setReport(generatedReport);
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <CodeContainer>
//             <Typography variant="h6">Your Code</Typography>
//             <TextField
//               label="Copy and paste your code"
//               multiline
//               fullWidth
//               rows={10}
//               value={code}
//               onChange={handleCodeChange}
//               variant="outlined"
//             />
//             <Button
//               variant="contained"
//               component="label"
//               sx={{ mt: 2 }}
//             >
//               Upload File
//               <input
//                 type="file"
//                 hidden
//                 accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.txt,.json,.html" // Accepting common code file types
//                 onChange={handleFileUpload}
//               />
//             </Button>
//           </CodeContainer>
//         </Grid>
//         <Grid item xs={6}>
//           <ReportContainer>
//             <Typography variant="h6">Report</Typography>
//             <Typography variant="body2" sx={{ mt: 2 }}>
//               {report || 'No report generated yet. Please submit your code.'}
//             </Typography>
//           </ReportContainer>
//         </Grid>
//       </Grid>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         sx={{ mt: 2 }}
//       >
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default CodeReview;




import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Paper, Grid, Divider, Snackbar } from '@mui/material';
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

const originalCode = `class Blog:
    def __init__(self):
        self.posts = []

    def add_post(self, title, content):
        post = {'title': title, 'content': content}
        self.posts.append(post)
        print(f"Post '{title}' added successfully.")

    def remove_post(self, title):
        for post in self.posts:
            if post['title'] == title:
                self.posts.remove(post)
                print(f"Post '{title}' removed successfully.")
                return
        print(f"Post '{title}' not found.")

    def display_posts(self):
        if not self.posts:
            print("No posts available.")
            return
        for post in self.posts:
            print(f"Title: {post['title']}")
            print(f"Content: {post['content']}\\n")

    def search_posts(self, keyword):
        found_posts = [post for post in self.posts if keyword.lower() in post['title'].lower() or keyword.lower() in post['content'].lower()]
        if not found_posts:
            print("No posts found with that keyword.")
            return
        for post in found_posts:
            print(f"Title: {post['title']}")
            print(f"Content: {post['content']}\\n")

def main():
    blog = Blog()
    while True:
        print("\\nBlog System")
        print("1. Add Post")
        print("2. Remove Post")
        print("3. Display Posts")
        print("4. Search Posts")
        print("5. Exit")
        choice = input("Enter your choice: ")

        if choice == '1':
            title = input("Enter post title: ")
            content = input("Enter post content: ")
            blog.add_post(title, content)
        elif choice == '2':
            title = input("Enter post title to remove: ")
            blog.remove_post(title)
        elif choice == '3':
            blog.display_posts()
        elif choice == '4':
            keyword = input("Enter keyword to search: ")
            blog.search_posts(keyword)
        elif choice == '5':
            print("Exiting Blog System.")
            break
        else:
            print("Invalid choice. Please choose again.")

if __name__ == "__main__":
    main();`;

const suggestions = [
    {
        change: { original: "class Blog:", modified: "class Blog(object):" },
        reason: "Inherit from object to ensure compatibility with Python 2."
    },
    {
        change: { original: "print(f\"Post '{title}' added successfully.\")", modified: "import logging; logging.info(f\"Post '{title}' added successfully.\")" },
        reason: "Using logging instead of print statements."
    },
    {
        change: { original: "self.posts.remove(post)", modified: "self.posts = [p for p in self.posts if p != post]" },
        reason: "Avoid modifying the list while iterating."
    },
    {
        change: { original: "print(\"No posts available.\")", modified: "logging.warning(\"No posts available.\")" },
        reason: "Use logging for consistency."
    },
    {
        change: { original: "print(\"No posts found with that keyword.\")", modified: "logging.warning(\"No posts found with that keyword.\")" },
        reason: "Use logging for consistency."
    },
    {
        change: { original: "if __name__ == \"__main__\":", modified: "if __name__ == '__main__':" },
        reason: "Using single quotes for consistency."
    }
];

function Suggestion({ suggestion, lineNumber, applyChange, rollbackChange }) {
    return (
        <Paper 
            style={{
                margin: '10px',
                padding: '10px',
                transition: '0.3s',
                backgroundColor: suggestion.applied ? '#d1e7dd' : '#fff',
                boxShadow: suggestion.applied ? '0 4px 8px rgba(0, 128, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{suggestion.reason}</Typography>
            <Divider sx={{ margin: '5px 0' }} />
            <Typography variant="body2"><strong>Line:</strong> {lineNumber}</Typography>
            <Typography variant="body2"><strong>Original:</strong> {suggestion.change.original}</Typography>
            <Typography variant="body2"><strong>Modified:</strong> {suggestion.change.modified}</Typography>
            {!suggestion.applied ? (
                <Button variant="outlined" onClick={applyChange} sx={{ marginTop: 1 }}>Apply</Button>
            ) : (
                <Button variant="outlined" onClick={rollbackChange} sx={{ marginTop: 1 }}>Rollback</Button>
            )}
        </Paper>
    );
}

const CodeReview = () => {
    const [code, setCode] = useState(originalCode);
    const [report, setReport] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { setContainer } = useCodeMirror({
        value: code,
        height: "100%",
        extensions: [python()],
        onChange: (value) => {
            setCode(value);
        },
    });

    const applyChange = (index) => {
        const suggestion = suggestions[index];
        const originalText = suggestion.change.original;
        const modifiedText = suggestion.change.modified;

        const newCode = code.replace(originalText, modifiedText);
        if (newCode !== code) {
            setCode(newCode);
            setSnackbarMessage(`Applied change: ${suggestion.reason}`);
            setSnackbarOpen(true);
        }
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
        const generatedReport = `Report generated for the provided code: ${code.substring(0, 100)}...`;
        setReport(generatedReport);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <CodeContainer>
                        <Typography variant="h6">Your Code</Typography>
                        <div ref={setContainer} style={{ height: '100%', minHeight: '300px', marginBottom: '16px' }} />
                        <Button variant="contained" component="label" sx={{ mt: 2 }}>
                            Upload File
                            <input type="file" hidden accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.txt,.json,.html" onChange={handleFileUpload} />
                        </Button>
                    </CodeContainer>
                </Grid>
                <Grid item xs={6}>
                    <ReportContainer>
                        <Typography variant="h6">Report</Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            {report || 'No report generated yet. Please submit your code.'}
                        </Typography>
                        {suggestions.map((suggestion, index) => (
                            <Suggestion
                                key={index}
                                suggestion={suggestion}
                                lineNumber={index + 1}  // Simplified line number for demo purposes
                                applyChange={() => applyChange(index)}
                                rollbackChange={() => setSnackbarMessage(`Rolled back change: ${suggestion.change.original}`)}
                            />
                        ))}
                    </ReportContainer>
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                Submit
            </Button>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar} message={snackbarMessage} />
        </Box>
    );
};

export default CodeReview;
