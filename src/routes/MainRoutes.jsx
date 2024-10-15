import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/SamplePage')));
const CodeReview = Loadable(lazy(() => import('pages/CodeReview')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <SamplePage />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/code-review',
            element: <CodeReview />
        },
        {
            path: '/code-explanation',
            element: <SamplePage />
        },
        {
            path: '/code-completion',
            element: <SamplePage />
        },
        {
            path: '/code-refactoring',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;