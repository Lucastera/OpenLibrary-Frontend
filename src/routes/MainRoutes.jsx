import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

// routing
const CodeReview = Loadable(lazy(() => import('pages/CodeReview')));
const CodeExplanation = Loadable(lazy(() => import('pages/CodeExplanation')));
const ViewReviewHistory = Loadable(lazy(() => import('pages/CodeReviewHistory')));
const ViewDetailHistory = Loadable(lazy(() => import('pages/ReviewDetailHistory')));
const CodeTranslation = Loadable(lazy(() => import('pages/CodeTranslation')));
const CodeCompletion = Loadable(lazy(() => import('pages/CodeCompletion')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <CodeReview />
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
            element: <CodeCompletion />
        },
        {
            path: '/code-translation',
            element: <CodeTranslation />
        },
        {
            path: '/review/history',
            element: <ViewReviewHistory />
        },
        {
            path: '/review/detail/:historyID',
            element: <ViewDetailHistory />
        }
    ]
};

export default MainRoutes;
