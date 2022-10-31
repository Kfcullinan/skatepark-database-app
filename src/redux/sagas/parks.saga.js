import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//parksSaga generator function
function* parksSaga() {
  yield takeLatest("ADD_SKATEPARK", addSkatepark);
  yield takeLatest("FETCH_SKATEPARKS", fetchAllSkateparks);
  yield takeLatest("FETCH_SKATEPARK_DETAILS", fetchSkateparkDetails);
  yield takeLatest("EDIT_SKATEPARK", editSkatepark);
  yield takeLatest("DELETE_SKATEPARK", deleteSkatepark);
}

function* fetchAllSkateparks() {
  // get all parks from the DB
  console.log("in fetch");
  try {
    const skateparks = yield axios.get("/api/parks");
    console.log("get all:", skateparks.data);
    yield put({ type: "SET_SKATEPARKS", payload: skateparks.data });
    console.log("end of fetchAllSkateparksSaga");
  } catch (error) {
    console.log(error);
  }
}

function* addSkatepark(action) {
  try {
    yield axios.post(`/api/parks`, action.payload);
    if (action.history) {
      action.history.push('/');
    }
  } catch (e) {
    console.log(e);
  }
}

function* fetchSkateparkDetails(action) {
  try {
    const skatepark = yield axios.get(`/api/parks/${action.payload}`);
    yield put({ type: 'SET_SKATEPARK_DETAILS', payload: skatepark.data})
    //fetch features
    const features = yield axios.get(`/api/features/${action.payload}`);
    yield put({ type: 'SET_FEATURES', payload: features.data})
  } catch (e) {
      console.log(e);
  }
}

function* editSkatepark(action) {
  try {
    yield axios.put(`/api/parks/${action.payload.id}`, action.payload);
    if (action.history) {
      action.history.goBack();
    }
  } catch (e){
    console.log(e);
  }
}

function* deleteSkatepark(action) {
  try {
    yield axios.delete(`/api/parks/${action.payload}`)
    yield put({type: 'SET_SKATEPARKS', payload: skateparks.data})
  } catch (e) {
  console.log(e)
  }
}

export default parksSaga;
