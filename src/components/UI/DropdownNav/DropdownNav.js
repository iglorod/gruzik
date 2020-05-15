import React, { useState, useEffect } from 'react';

import { Dropdown, Button } from 'antd';

import Menu from './Menu/Menu';
import classes from './DropdownNav.module.css';

const DropdownNav = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [timerId, setTimerid] = useState(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    }
  }, [timerId])

  const openMenu = () => {
    setMenuIsOpen(true);
  }

  const closeMenu = () => {
    const id = setTimeout(() => {
      setMenuIsOpen(false);
    }, 100)

    setTimerid(id);
  }

  let buttonClass = classes.mobileMenu;
  if (props.visible === 'desktop') buttonClass = classes.desktopMenu;

  return (
    <Dropdown
      overlay={() => <Menu items={props.items} disabled={props.disabled} />}
      placement='bottomRight'
      visible={menuIsOpen}
    >
      <Button
        className={buttonClass}
        icon={props.icon}
        type='link'
        onClick={openMenu}
        onBlur={closeMenu} />
    </Dropdown>
  )
}

export default DropdownNav;
