import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { message } from 'antd';

export const setCollectionsActionCreator = (collections) => {
  return {
    type: actionTypes.SET_COLLECTIONS,
    collections,
  }
}

export const newCollectionValuesActionCreator = (data, index) => {
  return {
    type: actionTypes.SET_COLLECTION_VALUES,
    data,
    index,
  }
}

export const addCollectionToListActionCreator = (data) => {
  return {
    type: actionTypes.ADD_COLLECTION,
    data,
  }
}

export const setUpdatesToCollectionActionCreator = (data, index) => {
  return {
    type: actionTypes.UPDATE_COLLECTION,
    data,
    index,
  }
}

export const sortCollectionsActionCreator = () => {
  return {
    type: actionTypes.SORT_COLLECTIONS,
  }
}

export const deleteCollectionFromListActionCreator = (index) => {
  return {
    type: actionTypes.DELETE_COLLECTION,
    index,
  }
}

export const startCreatingActionCreator = () => {
  return {
    type: actionTypes.START_COLLECTION_CREATING,
  }
}

export const finishCreatingActionCreator = () => {
  return {
    type: actionTypes.FINISH_COLLECTION_CREATING,
  }
}

export const startUpdatingActionCreator = (index) => {
  return {
    type: actionTypes.START_COLLECTION_UPDATING,
    index,
  }
}

export const finishUpdatingActionCreator = () => {
  return {
    type: actionTypes.FINISH_COLLECTION_UPDATING,
  }
}

export const startDeletingActionCreator = (index) => {
  return {
    type: actionTypes.START_COLLECTION_DELETING,
    index,
  }
}

export const finishDeletingActionCreator = () => {
  return {
    type: actionTypes.FINISH_COLLECTION_DELETING,
  }
}

export const fetchCollectionsActionCreator = () => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/admin-collections.json`)
      .then(response => response.data)
      .then(data => data ? data : {})
      .then(collections => Object.entries(collections).map(([key, collection]) => ({ ...collection, key })))
      .then(collections => dispatch(setCollectionsActionCreator(collections)))
      .then(() => dispatch(sortCollectionsActionCreator()))
      .catch(error => message.error(error.message))
  }
}

export const createCollectionActionCreator = (data, token) => {
  return dispatch => {
    dispatch(startCreatingActionCreator())
    axios.post(`${process.env.REACT_APP_FIREBASE_DATABASE}/admin-collections.json/?auth=${token}`, data)
      .then((response) => {
        data.key = response.data.name;
        dispatch(addCollectionToListActionCreator(data));
        dispatch(sortCollectionsActionCreator());
        dispatch(finishCreatingActionCreator());
      })
  }
}

export const updateCollectionActionCreator = (data, index, token) => {
  return dispatch => {
    dispatch(startUpdatingActionCreator(index));
    const { name, tags, position } = data;
    axios.patch(`${process.env.REACT_APP_FIREBASE_DATABASE}/admin-collections/${data.key}.json/?auth=${token}`, { name, tags, position })
      .then(() => {
        dispatch(setUpdatesToCollectionActionCreator(data, index));
        dispatch(sortCollectionsActionCreator());
        dispatch(finishUpdatingActionCreator());
      })
  }
}

export const deleteCollectionActionCreator = (data, index, token) => {
  return dispatch => {
    dispatch(startDeletingActionCreator(index));
    axios.delete(`${process.env.REACT_APP_FIREBASE_DATABASE}/admin-collections/${data.key}.json/?auth=${token}`)
      .then(() => {
        dispatch(deleteCollectionFromListActionCreator(index));
        dispatch(sortCollectionsActionCreator());
        dispatch(finishDeletingActionCreator());
      })
  }
}

export const reorderActionCreator = (oldCollectionPosition, newCollectionPosition, token) => {
  return dispatch => {
    const { collection: firstCollection, index: oldIndex } = oldCollectionPosition;
    const { collection: secondCollection, index: newIndex } = newCollectionPosition;

    dispatch(updateCollectionActionCreator({ ...firstCollection, position: secondCollection.position }, oldIndex, token));
    dispatch(updateCollectionActionCreator({ ...secondCollection, position: firstCollection.position }, newIndex, token));
  }
}
