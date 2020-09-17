

const linkReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LINKS':
            return [...action.payload];
        default:
            return state;
    }
}

export default linkReducer;