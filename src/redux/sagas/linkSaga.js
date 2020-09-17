import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Saga to add a link POST route
function* addLink(action) {
  try {
    const response = yield axios.post("/api/link", action.payload);
    yield put({ type: "FETCH_LINKS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* getLink(action) {
  try {
    const response = yield axios.get("/api/link");
    yield put({ type: "SET_LINKS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* getFilter(action) {
  try {
    const response = yield axios.get(
      `/api/tags/${action.payload.filterTag}`,
      action.payload
    );
    yield put({ type: "SET_LINKS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* disableLink(action) {
  try {
    const response = yield axios.put(`/api/link/${action.payload.id}`);
    yield put({ type: "FETCH_LINKS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

//sorts by oldest links first with and then without tags
function* getNewestLinks(action) {
  if (action.payload.filterTag !== "") {
    try {
      const response = yield axios.get(
        `/api/tags/newer/${action.payload.filterTag}`,
        action.payload
      );
      yield put({ type: "SET_LINKS", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      // If no tag selected, simply calls the original GET from /link
      const response = yield axios.get("/api/link");
      yield put({ type: "SET_LINKS", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  }
}

//sorts by oldest links first with and then without tags
function* getOldestLinks(action) {
  if (action.payload.filterTag !== "") {
    try {
      const response = yield axios.get(
        `/api/tags/older/${action.payload.filterTag}`,
        action.payload
      );
      yield put({ type: "SET_LINKS", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  } else {
    // No tags in the search
    try {
      const response = yield axios.get("/api/tags/");
      yield put({ type: "SET_LINKS", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  }
}

function* linkSaga() {
  yield takeLatest("ADD_LINK", addLink);
  yield takeLatest("FETCH_LINKS", getLink);
  yield takeLatest("REMOVE_LINK", disableLink);
  yield takeLatest("FETCH_FILTERED_LINKS", getFilter);
  yield takeLatest("FETCH_NEW_FILTERED_LINKS", getNewestLinks);
  yield takeLatest("FETCH_OLD_FILTERED_LINKS", getOldestLinks);
}

export default linkSaga;
