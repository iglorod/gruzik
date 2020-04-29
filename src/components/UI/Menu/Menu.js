import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Menu.module.css';

const MenuComponent = (props) => {
    return (
        <div className={props.position === 'left' ? classes.leftMenu : classes.rightMenu}>
            {
                props.items.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.split(' ').join('-')}
                        className={classes.navLink}
                        activeClassName={classes.navLinkActive}
                    >
                        {item}
                    </NavLink>
                ))
            }
        </div>
    )
}

export default MenuComponent;
