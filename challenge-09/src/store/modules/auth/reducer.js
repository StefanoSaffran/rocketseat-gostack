import produce from 'immer';

const initial_state = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = initial_state, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.signed = true;
      });
    default:
      return state;
  }
}
