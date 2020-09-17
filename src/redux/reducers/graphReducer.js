const graphReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_CLICKS':
          return [...action.payload];
      default:
          return state;
  }
}

export default graphReducer;