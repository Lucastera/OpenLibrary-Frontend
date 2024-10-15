// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// ==============================|| LOGO COMPONENT ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <Box display="flex" alignItems="center" width="92px" height="32px">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Replace with your graphic path */}
                <circle cx="16" cy="16" r="16" fill={theme.palette.primary.main} />
            </svg>
            <Typography variant="h6" style={{ marginLeft: '8px', color: theme.palette.grey[900] }}>
                Software Engineering
            </Typography>
        </Box>
    );
};

export default Logo;