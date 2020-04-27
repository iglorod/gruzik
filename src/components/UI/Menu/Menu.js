import React from 'react';
import { NavLink } from 'react-router-dom';

import { Menu } from 'antd';

const MenuComponent = (props) => {
    return (
        <Menu
            className={props.className}
            theme="dark"
            mode="horizontal"
        >
            {
                props.items.map((item, index) => (
                    <Menu.Item key={index}>
                        <NavLink to={item.path}>{item.title}</NavLink>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
}

export default MenuComponent;
