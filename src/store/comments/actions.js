import * as actionTypes from '../actionTypes';

export const startAddingCommentActionCreator = () => {
  return {
    type: actionTypes.START_ADD_COMMENT,
  }
}

export const finishAddingCommentActionCreator = () => {
  return {
    type: actionTypes.FINISH_ADD_COMMENT,
  }
}

export const startLoadingCommentsActionCreator = () => {
  return {
    type: actionTypes.FINISH_LOADING_COMMENTS,
  }
}

export const clearCommentsActionCreator = () => {
  return {
    type: actionTypes.CLEAR_COMMENTS,
  }
}

