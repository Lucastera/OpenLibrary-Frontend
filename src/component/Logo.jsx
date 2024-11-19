// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

// ==============================|| LOGO COMPONENT ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <Box display="flex" alignItems="center" width="auto" height="32px">
            <HomeIcon style={{ color: theme.palette.primary.main, fontSize: '32px' }} />
            <Typography variant="h6" style={{ marginLeft: '8px', color: theme.palette.grey[900] }}>
                Software Engineering
            </Typography>
        </Box>
    );
};

export default Logo;