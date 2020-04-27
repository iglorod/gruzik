import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    authStart: false,
    errorMessage: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_LOADING: {
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        }

        case actionTypes.FINISH_LOADING: {
            return {
                ...state,
                loading: false,
            }
        }

        default: return state;
    }
}

export default reducer;
