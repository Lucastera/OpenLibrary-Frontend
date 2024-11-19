// assets
import { IconBrandChrome, IconEye, IconFileCode, IconCode, IconCodeMinus } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconEye, IconFileCode, IconCode, IconCodeMinus };

const Menu = [
    {
        id: 'menu',
        type: 'group',
        children: [
            {
                id: 'code-review',
                title: 'Code Review',
                type: 'item',
                url: '/code-review',
                icon: icons.IconEye,
                breadcrumbs: false
            },
            {
                id: 'code-explanation',
                title: 'Code Explanation',
                type: 'item',
                url: '/code-explanation',
                icon: icons.IconFileCode,
                breadcrumbs: false
            },
            {
                id: 'code-completion',
                title: 'Code Completion',
                type: 'item',
                url: '/code-completion',
                icon: icons.IconCode,
                breadcrumbs: false
            },
            {
                id: 'code-translation',
                title: 'Code Translation',
                type: 'item',
                url: '/code-translation',
                icon: icons.IconCodeMinus,
                breadcrumbs: false
            }
        ]
    }
];

export default Menu;