const initialState = {
  activeComponent: "login", 
};

const SET_ACTIVE_COMPONENT = "SET_ACTIVE_COMPONENT";

export const setActiveComponent = (component) => ({
  type: SET_ACTIVE_COMPONENT,
  payload: component,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_ACTIVE_COMPONENT:
          return {
              ...state,
              activeComponent: action.payload, 
          };
      default:
          return state;
  }
};

export default authReducer;
