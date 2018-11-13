import produce from 'immer';

// action types
const FETCH_DOG_REQUEST = 'FETCH_DOG_REQUEST';
const FETCH_DOG_SUCCESS = 'FETCH_DOG_SUCCESS';
const FETCH_DOG_FAILURE = 'FETCH_DOG_FAILURE';

// reducer with initial state
const initialState = {
  loading: false,
  dog: null,
  error: null,
};

export function reducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case FETCH_DOG_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case FETCH_DOG_SUCCESS:
        draft.loading = false;
        draft.dog = action.dog;
        break;
      case FETCH_DOG_FAILURE:
        draft.loading = false;
        draft.dog = null;
        draft.error = action.error;
        break;
      default:
        break;
    }
  });
}
