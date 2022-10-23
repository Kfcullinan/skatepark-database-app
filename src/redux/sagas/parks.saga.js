import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//all Skatepark Sagas
function* parksSaga() {
  yield takeLatest('FETCH_SKATEPARKS', fetchAllSkateparks);
  yield takeLatest('FETCH_DETAILS', fetchDetails);
  // yield takeLatest('FETCH_FEATURES', fetchFeatures);
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

//Get specific skatepark
// function* fetchDetails() {
//   try {
//     const details = yield axios.get('/api/parks');
//     yield put({ type: 'SET_DETAILS'})
//   }
 
// }





export default parksSaga;
