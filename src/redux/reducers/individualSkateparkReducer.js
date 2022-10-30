//individualSkateparkReducer = skateparkToDisplay - store selected skatepark

const individualSkateparkReducer = (state = {}, action) => {
    if(action.type === 'SET_SKATEPARK_DETAILS') {
        console.log('in SET PARK DETAILS', action.payload)
        return action.payload;


    // switch (action.type) {
    //     case 'SET_SKATEPARK_DETAILS':
    //         return action.payload;
    //     default:
    }
            return state;
   
}

export default individualSkateparkReducer;