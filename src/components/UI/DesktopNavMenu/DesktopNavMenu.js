import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './DesktopNavMenu.module.css';

const DesktopNavMenu = (props) => {
  return (
    <div className={props.position === 'left' ? classes.leftMenu : classes.rightMenu}>
      {
        props.items.map((item, index) => (
          <NavLink
            key={index}
            to={item.to || item.split(' ').join('-')}
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
            exact
          >
            {item.name || item}
          </NavLink>
        ))
      }
    </div>
  )
}

export default DesktopNavMenu;
