import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import SignUp from '../../Authorization/SignUp/SignUp';
import SignIn from '../../Authorization/SignIn/SignIn';
import Band from '../../Band/Band';
import Music from '../../Music/Music';

const ContentComponent = () => {
  const { Content } = Layout;

  return (
    <Content className="content-layout-background">
      <Switch>
        <Route path='/sign-up' component={SignUp} exact />
        <Route path='/sign-in' component={SignIn} exact />
        <Route path='/band' component={Band} exact />
        <Route path='/' component={Music} />
      </Switch>
    </Content>
  )
}

export default ContentComponent;
