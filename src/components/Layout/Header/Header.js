import React from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import { logoutActionCreator } from '../../../store/authorization/actions';
import Logo from '../../../assets/images/logo.png';
import Menu from '../../UI/Menu/Menu';

const { Header } = Layout;

const HeaderComponent = (props) => {
  let authSection = <Menu position={'right'} items={['sign in', 'sign up']}></Menu>
  if (props.email) authSection = <div className={'logout-btn'} onClick={props.logout}>Logout</div>;


  const linkToMyBand = {
    name: 'my band',
    to: {
      pathname: '/band',
      state: {
        localId: props.localId,
      }
    }
  }

  const linkToMyMusic = {
    name: 'music',
    to: '/',
  }

  const actionLinks = [linkToMyMusic];
  if (props.email) actionLinks.push('playlists');
  if (props.isBand) actionLinks.push(linkToMyBand)

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
    localId: state.auth.localId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch(logoutActionCreator()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
