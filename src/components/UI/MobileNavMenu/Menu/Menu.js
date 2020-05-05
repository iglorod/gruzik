import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Menu } from 'antd';

import { logoutActionCreator } from '../../../../store/authorization/actions';
import { clearPlaylistActionCreator } from '../../../../store/songs/actions';
import classes from './Menu.module.css';

const MenuComponent = (props) => {
  const logoutAndCleanup = () => {
    props.logout();
    props.clearPlaylists();
  }

  let authSection = ['sign in', 'sign up']
    .map((item, index) => (
      <Menu.Item key={index}>
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

  if (props.email) authSection = (
    <Menu.Item>
      <div
        className={classes.navLink}
        onClick={logoutAndCleanup}>
        {'Logout'}
      </div>;
    </Menu.Item>
  )



  return (
    <Menu className={classes.menu}>
      {
        props.items.map((item, index) => (
          <Menu.Item key={index}>
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
      <Menu.Divider />
      {authSection}
    </Menu>
  )
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch(logoutActionCreator()) },
    clearPlaylists: () => { dispatch(clearPlaylistActionCreator()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
