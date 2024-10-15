// project imports
import NavGroup from './NavGroup';
import menu from 'menu';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const navItems = menu.map((item) => {
        return <NavGroup key={item.id} item={item} />;
    });

    return <>{navItems}</>;
};

export default MenuList;
