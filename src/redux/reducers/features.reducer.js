//used to store skatepark features

const featuresReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FEATURES':
            return action.payload;
        default:
            return state;
    }
}

export default featuresReducer;