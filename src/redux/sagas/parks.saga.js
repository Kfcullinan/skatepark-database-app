import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchAllSkateparks() {
    // get all parks from the DB
    console.log('in fetch')
    try {
        const skateparks = yield axios.get('/api/parks');
        console.log('get all:', skateparks.data);
        yield put({ type: 'SET_SKATEPARKS', payload: skateparks.data });
  
    } catch {
        console.log('get all skateparks error');
    }
        
  }
  
  function* parksSaga() {
    yield takeLatest ('FETCH_SKATEPARKS', fetchAllSkateparks);
  }

  export default parksSaga;