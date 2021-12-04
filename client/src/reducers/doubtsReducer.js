export function doubtsReducer(state = [], action) {
  console.log("doubtsReducer", action);
  switch (action.type) {
    case "SET_DOUBTS":
      return action.payload;
    case "ADD_DOUBT":
      return [...state, action.payload];
    default:
      return state;
  }
}
