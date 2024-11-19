// material-ui
import { Box } from '@mui/material';
import LogoIcon from 'assets/images/logo.jpg';

// ==============================|| LOGO COMPONENT ||============================== //

const Logo = () => {
    return (
        <Box display="flex" alignItems="center" width="auto" height="32px">
            <img src={LogoIcon} alt="Logo" style={{ height: '32px', width: 'auto' }} />
        </Box>
    );
};

export default Logo;