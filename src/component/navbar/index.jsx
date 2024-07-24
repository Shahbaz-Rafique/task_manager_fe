import { NavLink } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { Menu, Dropdown } from 'antd';
import 'antd/dist/reset.css';

const Navbar = () => {
  // Navigation items with their labels and links
  const navItems = [
    {
      label: 'Login',
      link: '/login'
    },
    {
      label: 'Sign up',
      link: '/signup'
    }
  ];

  // Ant Design Menu component for dropdown items
  const menu = (
    <Menu>
      {navItems.map((item, index) => (
        <Menu.Item key={index}>
          <NavLink to={item.link} className={({ isActive }) => {
            // Apply 'isActive' class if the link is active
            return isActive ? 'isActive' : 'text-dark font-medium'
          }}>{item.label}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <header>
      <nav className="flex items-center justify-end container h-16 px-4">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-5 list-none">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.link} className={({ isActive }) => {
                // Apply 'isActive' class if the link is active
                return isActive ? 'isActive' : 'whitetext font-medium'
              }}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
        
        {/* Mobile Navigation Menu */}
        <div className="md:hidden">
          <Dropdown overlay={menu} trigger={['click']} overlayClassName="w-56 mt-5">
            {/* Menu icon for mobile view */}
            <IoIosMenu className="text-3xl text-blue cursor-pointer" />
          </Dropdown>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
