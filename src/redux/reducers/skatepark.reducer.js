const skateparks = (state = [], action) => {
  if(action.type === 'SET_SKATEPARKS') {
    return action.payload;
  }
  return state;
}

export default skateparks;