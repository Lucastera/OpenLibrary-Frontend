// React and hooks
import React, { useState, useEffect } from 'react';

// material-ui components
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';

// project imports
import MainCard from 'component/cards/MainCard';

// Mock data for previewing the UI
const mockReviewHistory = [
    {
        review_id: 1,
        code_content: "function add(a, b) { return a + b }",
        code_language: "JavaScript",
        create_time: "2024-01-01T12:00:00Z",
        update_time: "2024-01-02T12:00:00Z",
    },
    {
        review_id: 2,
        code_content: "const multiply = (x, y) => x * y",
        code_language: "JavaScript",
        create_time: "2024-01-03T12:00:00Z",
        update_time: "2024-01-04T12:00:00Z",
    },
];

const ReviewHistoryPage = () => {
    const [reviewHistory, setReviewHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Use mock data directly instead of fetching from the backend
        setReviewHistory(mockReviewHistory);
    }, []);

    const viewDetails = (reviewId) => {
        alert("View details for Review ID: " + reviewId);
    };

    return (
        <MainCard title="Review History">
            {/* <Typography variant="body2" gutterBottom>
                Here is the history of all code reviews.
            </Typography> */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">History of Code Reviews</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate('/code-review')}>
                    Back
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Review ID</TableCell>
                            <TableCell>Code Content</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Create Time</TableCell>
                            <TableCell>Update Time</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviewHistory.map((review) => (
                            <TableRow key={review.review_id}>
                                <TableCell>{review.review_id}</TableCell>
                                <TableCell>{review.code_content}</TableCell>
                                <TableCell>{review.code_language}</TableCell>
                                <TableCell>{new Date(review.create_time).toLocaleString()}</TableCell>
                                <TableCell>{new Date(review.update_time).toLocaleString()}</TableCell>
                                <TableCell>
                                    {/* <Button variant="outlined" onClick={() => viewDetails(review.review_id)}>
                                        View
                                    </Button> */}
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/review-history/${review.review_id}`)}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
};

export default ReviewHistoryPage;
