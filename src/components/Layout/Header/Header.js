import React from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import SearchBar from '../../SearchBar/SearchBar';
import { logoutActionCreator } from '../../../store/authorization/actions';
import { clearPlaylistActionCreator } from '../../../store/songs/actions';
import Logo from '../../../assets/images/logo.png';
import DesktopMenu from '../../UI/DesktopNavMenu/DesktopNavMenu';
import MobileMenu from '../../UI/MobileNavMenu/MobileNavMenu';

const { Header } = Layout;

const HeaderComponent = (props) => {
  const logoutAndCleanup = () => {
    props.logout();
    props.clearPlaylists();
  }

  let authSection = <DesktopMenu position={'right'} items={['sign in', 'sign up']}></DesktopMenu>
  if (props.email) authSection = <div className={'logout-btn'} onClick={logoutAndCleanup}>Logout</div>;


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

      <DesktopMenu position={'left'} items={actionLinks}></DesktopMenu>
      <MobileMenu items={actionLinks}></MobileMenu>
    
      {authSection}
      <SearchBar />
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
    logout: () => { dispatch(logoutActionCreator()) },
    clearPlaylists: () => { dispatch(clearPlaylistActionCreator()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
