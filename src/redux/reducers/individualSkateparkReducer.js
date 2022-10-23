const initialDetails = {
    "id": 0,
    "name": '',
    "location": '',
    "space_type": '',
    "difficulty": '',
}

const individualSkateparkReducer = (state = initialDetails, action) => {
    switch (action.type) {
        case 'SET_INDIVIDUAL_SKATEPARK':
            return action.payload;
        default:
            return state;
    }
}

export default individualSkateparkReducer;