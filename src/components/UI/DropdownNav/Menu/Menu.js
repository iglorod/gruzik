import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Menu } from 'antd';

import ModalWrapper from '../../ModalWrapper/ModalWrapper';
import Profile from '../../../Profile/Profile';
import { logoutActionCreator } from '../../../../store/authorization/actions';
import { clearPlaylistActionCreator } from '../../../../store/songs/actions';
import classes from './Menu.module.css';

const MenuComponent = (props) => {
  const logoutAndCleanup = () => {
    props.logout();
    props.clearPlaylists();
  }

  let authButton = ['sign in', 'sign up']
    .map((item, index) => (
      <Menu.Item key={index} disabled={props.disabled}>
        <NavLink
          to={item.to || item.split(' ').join('-')}
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
          exact
        >
          {item.name || item}
        </NavLink>
      </Menu.Item>
    ));

  if (props.email) {
    authButton = (
      <Menu.Item>
        <div
          className={classes.navLink}
          onClick={props.disabled ? null : logoutAndCleanup}>
          {'Logout'}
        </div>;
      </Menu.Item>
    )
  }

  let profileButton = null;
  if (props.email && props.isBand.toString() == 'false') {
    profileButton = (
      <Menu.Item>
        <ModalWrapper
          className={classes.navLink}
          modal={Profile}
          label='My Profile'
          disabled={props.disabled} />
      </Menu.Item>
    )
  }

  return (
    <Menu className={classes.menu}>
      {
        props.items.map((item, index) => (
          <Menu.Item key={index} disabled={props.disabled}>
            <NavLink
              to={item.to || item.split(' ').join('-')}
              className={classes.navLink}
              activeClassName={classes.navLinkActive}
              exact
            >
              {item.name || item}
            </NavLink>
          </Menu.Item>
        ))
      }
      {profileButton}

      <Menu.Divider />
      {authButton}
    </Menu>
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
    logout: () => { dispatch(logoutActionCreator()) },
    clearPlaylists: () => { dispatch(clearPlaylistActionCreator()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
