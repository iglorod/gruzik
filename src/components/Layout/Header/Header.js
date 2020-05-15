import React from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';

import SearchBar from '../../SearchBar/SearchBar';
import Logo from '../../../assets/images/logo.png';
import DesktopMenu from '../../UI/DesktopNavMenu/DesktopNavMenu';
import DropdownNav from '../../UI/DropdownNav/DropdownNav';

const { Header } = Layout;

const HeaderComponent = (props) => {
  const disableLinks = props.loading || props.creating;

  const linkToMyBand = {
    name: 'my band',
    to: {
      pathname: '/band',
      state: {
        localId: props.localId,
      }
    }
  }

  const profileLinks = [];
  if (props.isBand.toString() === 'true') profileLinks.push(linkToMyBand)

  let authSection = (
    <DesktopMenu
      items={['sign in', 'sign up']}
      disabled={disableLinks}
      position={'right'} />
  )
  if (props.email) {
    authSection = (
      <DropdownNav
        items={profileLinks}
        disabled={disableLinks}
        visible='desktop'
        icon={<UserOutlined />} />
    )
  }

  const linkToMyMusic = {
    name: 'music',
    to: '/',
  }

  const actionLinks = [linkToMyMusic];
  if (props.email) actionLinks.push('playlists');

  return (
    <Header className='header'>
      <div className='logo'>
        <img src={Logo} alt={'logo'} />
      </div>

      <DesktopMenu items={actionLinks} disabled={disableLinks} position={'left'} />
      <DropdownNav items={[...profileLinks, ...actionLinks]} disabled={disableLinks} visible='mobile' icon={<MenuFoldOutlined />} />

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
    loading: state.songs.loading,
    creating: state.songs.creating,
  }
}

export default connect(mapStateToProps)(HeaderComponent);
