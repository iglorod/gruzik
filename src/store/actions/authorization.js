import * as actionTypes from './actionTypes';

export const startLoadingActionCreator = () => {
    return {
        type: actionTypes.START_LOADING,
    }
}

export const finishLoadingActionCreator = () => {
    return {
        type: actionTypes.FINISH_LOADING,
    }
}
