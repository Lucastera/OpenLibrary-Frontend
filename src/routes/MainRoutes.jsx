import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/SamplePage')));
const CodeReview = Loadable(lazy(() => import('pages/CodeReview')));
const CodeExplanation = Loadable(lazy(() => import('pages/CodeExplanation')));
const CodeTranslation = Loadable(lazy(() => import('pages/CodeTranslation')));
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
            element: <CodeExplanation />
        },
        {
            path: '/code-completion',
            element: <SamplePage />
        },
        {
            path: '/code-translation',
            element: <CodeTranslation />
        }
    ]
};

export default MainRoutes;