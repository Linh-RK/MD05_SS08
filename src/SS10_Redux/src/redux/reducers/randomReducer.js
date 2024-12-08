const initialState = [];
export const randomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "random":
      const cloneState = [...state, action.payload];
      return cloneState;
    default:
      return state;
  }
};
