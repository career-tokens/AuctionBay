export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isAuthReady: true };
    case "SET_AUTH_READY":
      return { ...state, user: action.payload, isAuthReady: true };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      break;
  }
};
