import axios from 'axios';
import {takeLatest} from 'redux-saga/effects';

  function* fetchFeedback(action) {

    try {
      // send email via nodemailer
      yield axios.post( '/api/feedback', action.payload );
      
    } catch (error) {
      console.log('Feedback get request failed', error);
    }
  }

  function* feedbackSaga() {
    yield takeLatest('FETCH_FEEDBACK', fetchFeedback);
  }

export default feedbackSaga;