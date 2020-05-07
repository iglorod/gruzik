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
import { fetchPlaylistsActionCreator } from '../../store/songs/actions';
import ModalSpinner from '../UI/ModalSpinner/ModalSpinner';

const LayoutComponent = (props) => {
  const { signInLocally, loading, fetchPlaylists } = props;

  useEffect(() => {
    signInLocally();
  }, [signInLocally])

  useEffect(() => {
    if (props.localId) {
      fetchPlaylists(props.localId);
    }
  }, [fetchPlaylists, props.localId])

  return (
    <Layout className='main-layout'>
      {loading ? <ModalSpinner /> : null}
      <Header />

      <Layout>
        <Route path='/' component={Filter} exact />
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
    localId: state.auth.localId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInLocally: () => { dispatch(signInLocallyActionCreator()) },
    fetchPlaylists: (userId) => { dispatch(fetchPlaylistsActionCreator(userId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);