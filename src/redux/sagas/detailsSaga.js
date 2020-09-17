import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchDetailSaga(action) {
    try {
        const response = yield axios.get('/api/details/'+ action.payload)
        yield put({ type: 'SET_DETAILS', payload: response.data })
    } catch (error) {
        console.log(error)
    }
}

function* saveTagsSaga(action) {
    try {
        const response = yield axios.put(`/api/details/${action.payload.details.id}`, action.payload)
        yield put({ type: 'FETCH_DETAILS', payload: response.data })
    } catch (error) {
        console.log(error)
    }
  }
function* detailsSaga() {
    yield takeLatest('FETCH_DETAILS', fetchDetailSaga);
    yield takeLatest('SAVE_TAGS', saveTagsSaga);
  }

export default detailsSaga;