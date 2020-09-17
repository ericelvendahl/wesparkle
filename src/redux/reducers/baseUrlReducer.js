const baseUrlReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_BASE_URL":
      return {url: action.payload};
    default:
      return state;
  }
};

export default baseUrlReducer;
