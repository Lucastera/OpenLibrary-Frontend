// assets
import { IconBrandChrome, IconEye, IconFileCode, IconCode } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconEye, IconFileCode, IconCode };

const Menu = [
    {
        id: 'menu',
        type: 'group',
        children: [
            {
                id: 'sample-page',
                title: 'Sample Page',
                type: 'item',
                url: '/sample-page',  // 保留的路径
                icon: icons.IconBrandChrome,
                breadcrumbs: false
            },
            {
                id: 'code-review',
                title: 'Code Review',
                type: 'item',
                url: '/code-review',  // Updated URL
                icon: icons.IconEye,
                breadcrumbs: false
            },
            {
                id: 'code-explanation',
                title: 'Code Explanation',
                type: 'item',
                url: '/code-explanation',  // Updated URL
                icon: icons.IconFileCode,
                breadcrumbs: false
            },
            {
                id: 'code-completion',
                title: 'Code Completion',
                type: 'item',
                url: '/code-completion',  // Updated URL
                icon: icons.IconCode,
                breadcrumbs: false
            },
            {
                id: 'code-refactoring',
                title: 'Code Refactoring',
                type: 'item',
                url: '/code-refactoring',  // Updated URL
                icon: icons.IconCode,
                breadcrumbs: false
            },
            {
                id: 'code-translation',
                title: 'Code Translation',
                type: 'item',
                url: '/code-translation',  // Updated URL
                icon: icons.IconCode,
                breadcrumbs: false
            }
        ]
    }
];

export default Menu;