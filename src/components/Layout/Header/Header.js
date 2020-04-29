import React from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import { logoutActionCreator } from '../../../store/actions/authorization';
import Logo from '../../../assets/images/logo.png';
import Menu from '../../UI/Menu/Menu';

const { Header } = Layout;

const HeaderComponent = (props) => {
    let authSection = <Menu position={'right'} items={['sign in', 'sign up']}></Menu>
    if (props.email) authSection = <div className={'logout-btn'} onClick={props.logout}>Logout</div>;

    const actionLinks = ['music'];
    if (props.isBand) actionLinks.push('my band')
    else if (props.email) actionLinks.push('following')

    return (
        <Header className='header'>
            <div className='logo'>
                <img src={Logo} alt={'logo'} />
            </div>

            <Menu position={'left'} items={actionLinks}></Menu>

            {authSection}
        </Header>
    )
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        isBand: state.auth.isBand,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(logoutActionCreator()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
