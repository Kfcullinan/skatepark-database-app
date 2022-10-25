//used to store skateparks returned from server

const skateparks = (state = [], action) => {
  if(action.type === 'SET_SKATEPARKS') {
    console.log('in SET PARKS', action.payload)
    return action.payload;
  }
  return state;
}

export default skateparks;