import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchBaseUrl(action) {
  try {
    const response = yield axios.get("/api/base-url/");
    yield put({ type: "SET_BASE_URL", payload: response.data });
  } catch (error) {
    console.log("error with baseUrl Saga:", error);
  }
}

function* baseUrlSaga() {
  yield takeLatest("FETCH_BASE_URL", fetchBaseUrl);
}

export default baseUrlSaga;
