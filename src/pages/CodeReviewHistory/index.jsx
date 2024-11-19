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
import { getCodeReviewHistory } from '../../api/index';

import { useNavigate } from 'react-router-dom';

// project imports
import MainCard from 'component/cards/MainCard';

const ReviewHistoryPage = () => {
    useEffect(() => {
        try {
            setLoading(true)
            const loadData = async () => {
                const res = await getCodeReviewHistory({
                    Page: 1,
                    Size: 10
                });
                setReviewHistory(res.history)
            }
            loadData()
            setLoading(false)
        } catch (e) {
            setError(e)
        }

    }, []);
    const [reviewHistory, setReviewHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Max length for code content preview
    const MAX_CODE_LENGTH = 100; // Adjust this value to your needs

    // Function to truncate long code content
    const truncateCodeContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        }
        return content;
    };

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
                                // <TableRow key={review.review_id}>
                                <TableRow key={review.history_id}>
                                    {/* <TableCell>{review.review_id}</TableCell> */}
                                    <TableCell>{review.history_id}</TableCell>
                                    {/* <TableCell>{review.code_content}</TableCell> */}
                                    <TableCell>
                                        {truncateCodeContent(review.code_content, MAX_CODE_LENGTH)}
                                    </TableCell>
                                    <TableCell>{review.code_language}</TableCell>
                                    <TableCell>{new Date(review.create_time).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(review.update_time).toLocaleString()}</TableCell>
                                    {/* <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate(`/review-history/${review.review_id}`)}
                                        >
                                            View
                                        </Button>
                                    </TableCell> */}
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate(`/review/detail/${review.history_id}`)}
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
