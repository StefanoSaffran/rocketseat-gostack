import { takeLatest, call, all, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const { status } = yield call(api.get, `students/${id}/checkins`);

    if (status !== 200) {
      Alert.alert('ID não encontrado, verifique seus dados');

      yield put(signFailure());
    }

    yield put(signInSuccess(id));
  } catch (err) {
    Alert.alert(err.response.data.error);
    yield put(signFailure());
  }
}

export function signOut() {}

export default all([
  takeLatest('@student/SIGN_IN_REQUEST', signIn),
  takeLatest('@student/SIGN_OUT', signOut),
]);
