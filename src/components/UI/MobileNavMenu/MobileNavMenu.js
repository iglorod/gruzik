import React, { useState } from 'react';

import { Dropdown, Button } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

import Menu from './Menu/Menu';
import classes from './MobileNavMenu.module.css';

const MobileNavMenu = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const openMenu = () => {
    setMenuIsOpen(true);
  }

  const closeMenu = () => {
    setTimeout(() => {
      setMenuIsOpen(false);
    }, 100)
  }

  return (
    <Dropdown
      overlay={() => <Menu items={props.items} />}
      placement="bottomRight"
      visible={menuIsOpen}
    >
      <Button
        className={classes.mobileMenu}
        icon={<MenuFoldOutlined />}
        ghost
        onClick={openMenu}
        onBlur={closeMenu} />
    </Dropdown>
  )
}

export default MobileNavMenu;
