import * as actionTypes from '../actionTypes';

const initialState = {
  collections: [],
  loading: true,
  creating: false,
  updating: null,
  deleting: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COLLECTIONS: {
      return {
        ...state,
        collections: action.collections,
        loading: false,
      }
    }

    case actionTypes.SET_COLLECTION_VALUES: {
      const collectionsClone = [...state.collections];
      collectionsClone[action.index] = {
        ...collectionsClone[action.index],
        ...action.data,
        shouldUpdate: true,
      }

      return {
        ...state,
        collections: collectionsClone,
      }
    }

    case actionTypes.ADD_COLLECTION: {
      return {
        ...state,
        collections: [
          ...state.collections,
          action.data,
        ]
      }
    }

    case actionTypes.UPDATE_COLLECTION: {
      if (action.index === null) return state;

      const collectionsClone = [...state.collections];
      collectionsClone[action.index] = {
        ...action.data, 
        shouldUpdate: false,
      }

      return {
        ...state,
        collections: collectionsClone,
      }
    }

    case actionTypes.DELETE_COLLECTION: {
      const collectionsClone = [...state.collections];
      collectionsClone.splice(action.index, 1);

      return {
        ...state,
        collections: collectionsClone,
      }
    }

    case actionTypes.SORT_COLLECTIONS: {
      if (state.collections.length === 0) return state;
      const collectionsClone = [...state.collections];
      collectionsClone.sort((a, b) => a.position - b.position);

      return {
        ...state,
        collections: [...collectionsClone],
      }
    }

    case actionTypes.START_COLLECTION_CREATING: {
      return {
        ...state,
        creating: true,
      }
    }

    case actionTypes.FINISH_COLLECTION_CREATING: {
      return {
        ...state,
        creating: false,
      }
    }

    case actionTypes.START_COLLECTION_UPDATING: {
      return {
        ...state,
        updating: action.index,
      }
    }

    case actionTypes.FINISH_COLLECTION_UPDATING: {
      return {
        ...state,
        updating: null,
      }
    }

    case actionTypes.START_COLLECTION_DELETING: {
      return {
        ...state,
        deleting: action.index,
      }
    }

    case actionTypes.FINISH_COLLECTION_DELETING: {
      return {
        ...state,
        deleting: null,
      }
    }

    default: return state;
  }
}

export default reducer;
