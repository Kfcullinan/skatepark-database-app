//selectedSkatepark = skateparkToDisplay - store selected skatepark

const individualSkateparkReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_INDIVIDUAL_SKATEPARK':
            return action.payload;
        default:
            return state;
    }
}

export default individualSkateparkReducer;