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

const ReviewHistoryPage = () => {
    const [reviewHistory, setReviewHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch review history data from backend
        const fetchReviewHistory = async () => {
            try {
                const response = await fetch('/CodeReview/review/history');

                if (!response.ok) {
                    throw new Error("Failed to fetch review history");
                }

                const result = await response.json();

                if (result.status === "success") {
                    setReviewHistory(result.data || []);
                } else {
                    setReviewHistory([]);
                    setError(result.message || "No history to display");
                }
            } catch (error) {
                setError(error.message || "No history to display");
            } finally {
                setLoading(false);
            }
        };

        fetchReviewHistory();
    }, []);

    return (
        <MainCard title="Review History">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">History of Code Reviews</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate('/code-review')}>
                    Back
                </Button>
            </Box>
            {loading ? (
                <Typography variant="body2" align="center">Loading...</Typography>
            ) : error ? (
                <Typography variant="body2" color="error" align="center">{error}</Typography>
            ) : (
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
            )}
        </MainCard>
    );
};

export default ReviewHistoryPage;
