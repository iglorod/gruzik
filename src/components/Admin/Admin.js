import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';

import { Collapse, Select } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import ModalSpinner from '../UI/ModalSpinner/ModalSpinner';
import PanelHeat from './PanelHeat/PanelHeat';
import SaveCollection from './SaveCollection/SaveCollection';
import DeleteButton from './DeleteCollection/DeleteCollection';
import {
  fetchCollectionsActionCreator,
  newCollectionValuesActionCreator,
  createCollectionActionCreator,
  updateCollectionActionCreator,
  deleteCollectionActionCreator,
} from '../../store/admin/actions';
import './Admin.css';

const Admin = (props) => {
  const { Panel } = Collapse;
  const [createCollectionName, setCreateCollectionName] = useState('');
  const [createCollectionTags, setCreateCollectionTags] = useState([]);

  useEffect(() => {
    props.fetchCollection();
  }, [])

  if (!props.isAdmin) return <Redirect to='/' />;
  if (props.loading) return <div style={{ position: 'relative' }}><ModalSpinner /></div>

  const clearNewCollectionState = () => {
    setCreateCollectionName('');
    setCreateCollectionTags([]);
  }

  const handleCreateCollectionNameChange = (event) => {
    setCreateCollectionName(event.target.value);
  }

  const handleCreateCollectionTagsChange = (tags) => {
    if (tags.length > 12) {
      message.warn('Each collection must contain no more than 12 tags')
      return;
    }
    setCreateCollectionTags(tags);
  }

  const handleCollectionNameChange = (index, event) => {
    const name = event.target.value;
    props.setNewCollectionValues({ name }, index);
  }

  const handleCollectionTagsChange = (index, tags) => {
    if (tags.length > 12) {
      message.warn('Each collection must contain no more than 12 tags')
      return;
    }

    props.setNewCollectionValues({ tags }, index);
  }

  const createCollection = (event) => {
    event.stopPropagation();
    if (createCollectionName.length === 0 || createCollectionTags.length === 0) {
      return;
    }

    const collection = {
      name: createCollectionName,
      tags: createCollectionTags,
    }
    props.saveCollection(collection, props.idToken);
    setTimeout(() => clearNewCollectionState(), 500);
  }

  const updateCollection = (collection, index, event) => {
    event.stopPropagation();
    if (collection.name.length === 0 || collection.tags.length === 0) {
      return;
    }

    props.updateCollection(collection, index, props.idToken);
  }

  const deleteCollection = (collection, index, idToken, event) => {
    event.stopPropagation();
    props.deleteCollection(collection, index, idToken);
  }

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      className='site-collapse-custom-collapse'
    >
      {
        props.collections.map((collection, index) => (
          <Panel
            key={index}
            header={
              <PanelHeat
                value={collection.name}
                onChange={handleCollectionNameChange.bind(this, index)} />
            }
            extra={
              <div className={'action-buttons'}>
                <SaveCollection
                  loading={props.updating === index}
                  onClick={updateCollection.bind(this, collection, index)}
                  enabled={collection.shouldUpdate} />
                <DeleteButton
                  loading={props.deleting === index}
                  onClick={deleteCollection.bind(this, collection, index, props.idToken)} />
              </div>
            }
            className={`site-collapse-custom-panel ${collection.shouldUpdate ? 'pane-should-update' : null}`}
          >
            <Select
              tokenSeparators={['#', '.', ',']}
              mode='tags'
              style={{ width: '100%' }}
              placeholder='Collection tags'
              value={collection.tags}
              onChange={handleCollectionTagsChange.bind(this, index)} />
          </Panel>
        ))
      }
      <Panel
        key={props.collections.length + 1}
        header={
          <PanelHeat
            value={createCollectionName}
            onChange={handleCreateCollectionNameChange} />
        }
        extra={
          <SaveCollection
            loading={props.creating}
            onClick={createCollection}
            enabled={createCollectionName.length > 0 && createCollectionTags.length > 0} />
        }
        className='site-collapse-custom-panel'
      >
        <Select
          tokenSeparators={['#', '.', ',']}
          mode='tags'
          style={{ width: '100%' }}
          placeholder='Collection tags'
          value={createCollectionTags}
          onChange={handleCreateCollectionTagsChange} />
      </Panel>
    </Collapse>
  )
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
    collections: state.adm.collections,
    loading: state.adm.loading,
    creating: state.adm.creating,
    updating: state.adm.updating,
    deleting: state.adm.deleting,
    idToken: state.auth.idToken,
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchCollection: () => { dispatch(fetchCollectionsActionCreator()) },
    setNewCollectionValues: (data, index) => { dispatch(newCollectionValuesActionCreator(data, index)) },
    saveCollection: (data, token) => { dispatch(createCollectionActionCreator(data, token)) },
    updateCollection: (data, index, token) => { dispatch(updateCollectionActionCreator(data, index, token)) },
    deleteCollection: (data, index, token) => { dispatch(deleteCollectionActionCreator(data, index, token)) },
  }
}

export default connect(mapStateToProps, dispatchToProps)(Admin);
