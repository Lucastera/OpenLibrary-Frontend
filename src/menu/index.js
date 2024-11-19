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