import * as actionTypes from '../actionTypes';

const initialState = {
  comments: [],
  loading: false,
  submitting: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COMMENT: {
      return {
        ...state,
        comments: [
          ...state.comments,
          action.comment,
        ]
      }
    }

    case actionTypes.START_ADD_COMMENT: {
      return {
        ...state,
        submitting: true,
      }
    }

    case actionTypes.FINISH_ADD_COMMENT: {
      return {
        ...state,
        submitting: false,
      }
    }

    case actionTypes.FINISH_LOADING_COMMENTS: {
      return {
        ...state,
        loading: false,
      }
    }

    case actionTypes.CLEAR_COMMENTS: {
      return initialState;
    }

    default: return state;
  }
}

export default reducer;
