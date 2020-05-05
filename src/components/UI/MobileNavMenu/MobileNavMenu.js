import React, { useState } from 'react';

import { Dropdown, Button } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

import Menu from './Menu/Menu';
import classes from './MobileNavMenu.module.css';

const MobileNavMenu = (props) => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleOpenMenu = () => {
    setTimeout(() => {
      setOpenMenu(prevState => !prevState);
    }, 100)
  }

  return (
    <Dropdown
      overlay={() => <Menu items={props.items} />}
      placement="bottomRight"
      visible={openMenu}
    >
      <Button
        className={classes.mobileMenu}
        icon={<MenuFoldOutlined />}
        ghost
        onClick={toggleOpenMenu}
        onBlur={toggleOpenMenu} />
    </Dropdown>
  )
}

export default MobileNavMenu;
