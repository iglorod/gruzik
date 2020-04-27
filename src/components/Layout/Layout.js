import React from 'react';
import { Route } from 'react-router-dom';

import { Layout } from 'antd';
import './Layout.css';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';

const LayoutComponent = () => {
    return (
        <Layout className='main-layout'>
            <Header />
            <Layout>
                <Route path='/music' component={Sidebar} exact />
                <Layout style={{ padding: '24px' }}>
                    <Content />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default LayoutComponent;
