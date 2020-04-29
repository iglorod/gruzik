import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import SignUp from '../../Authorization/SignUp/SignUp';
import SignIn from '../../Authorization/SignIn/SignIn';
import Band from '../../Band/Band';

const ContentComponent = () => {
    const { Content } = Layout;

    return (
        <Content className="content-layout-background">
            <Switch>
                <Route path='/sign-up' component={SignUp} exact />
                <Route path='/sign-in' component={SignIn} exact />
                <Route path='/my-band' component={Band} exact />
                <Route path='/' render={() => <div>Content</div>} />
            </Switch>
        </Content>
    )
}

export default ContentComponent;
