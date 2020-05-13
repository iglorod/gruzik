import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import SignUp from '../../Authorization/SignUp/SignUp';
import SignIn from '../../Authorization/SignIn/SignIn';
import Band from '../../Band/Band';
import Main from '../../Main/Main';
import Playlists from '../../Playlists/Playlists';
import Playlist from '../../Playlist/Playlist';
import Collection from '../../Collection/Collection';

const ContentComponent = () => {
  const { Content } = Layout;

  return (
    <Content className='content-layout-background'>
      <Switch>
        <Route path='/sign-up' component={SignUp} exact />
        <Route path='/sign-in' component={SignIn} exact />
        <Route path='/band' component={Band} exact />
        <Route path='/playlist' component={Playlist} exact />
        <Route path='/playlists' component={Playlists} exact />
        <Route path='/collection' component={Collection} exact />
        <Route path='/' component={Main} />
      </Switch>
    </Content>
  )
}

export default ContentComponent;
