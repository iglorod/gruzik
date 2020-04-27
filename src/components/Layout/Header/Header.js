import React from 'react';

import { Layout } from 'antd';

import Logo from '../../../assets/images/logo.png';
import Menu from '../../UI/Menu/Menu';
import { authLinks, contentLinks } from '../../../utility/nav-links-list';

const { Header } = Layout;

const HeaderComponent = () => {
    return (
        <Header className='header'>
            <div className='logo'>
                <img src={Logo} alt={'logo'} />
            </div>

            <Menu
                className={'header-actions-menu'}
                items={contentLinks}
            ></Menu>

            <Menu
                className={'header-auth-menu'}
                items={authLinks}
            ></Menu>
        </Header>
    )
}

export default HeaderComponent;
