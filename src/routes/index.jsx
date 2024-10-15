import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import CommonRoutes from './CommonRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, CommonRoutes], {
    basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
