import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout } from 'antd';
import './Layout.css';

import Header from './Header/Header';
import Filter from '../Filter/Filter';
import Content from './Content/Content';
import Footer from './Footer/Footer';
import { signInLocallyActionCreator } from '../../store/authorization/actions';
import ModalSpinner from '../UI/ModalSpinner/ModalSpinner';

const LayoutComponent = (props) => {
  const { signInLocally, loading } = props;

  useEffect(() => {
    signInLocally();
  }, [signInLocally])

  return (
    <Layout className='main-layout'>
      {loading ? <ModalSpinner /> : null}
      <Header />

      <Layout>
        <Route path='/music' component={Filter} exact />
        <Layout style={{ padding: '24px' }}>
          <Content />
        </Layout>
      </Layout>

      <Footer />
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInLocally: () => { dispatch(signInLocallyActionCreator()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);
