import { put, takeLatest } from 'redux-saga/effects';
import axios from "axios";


function* getData(action){
  try {
    const response = yield axios.get('/api/graph');
    yield put({ type: 'SET_CLICKS', payload: response.data });
  } catch (error){
    console.log('error with get graph Saga:', error)
  }
}


function* graphSaga() {
  
  yield takeLatest("FETCH_CLICKS", getData);
  

}

export default graphSaga;