const initialState = [];
export const randomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "random":
      const cloneState = [...state, state.payload];
      return cloneState;
    default:
      return state;
  }
};
