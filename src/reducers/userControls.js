const initialState = {
  left: false,
  down: false,
  up: false,
  right: false
};

const userControls = (state = initialState, action) => {
  switch (action.type) {
    case 'UP_PRESSED':
      return { ...state, up: true };
    case 'DOWN_PRESSED':
      return { ...state, down: true };
    case 'UP_RELEASED':
      return { ...state, up: false };
    case 'DOWN_RELEASED':
      return { ...state, down: false };
    case 'LEFT_PRESSED':
      return { ...state, left: true };
    case 'RIGHT_PRESSED':
      return { ...state, right: true };
    case 'LEFT_RELEASED':
      return { ...state, left: false };
    case 'RIGHT_RELEASED':
      return { ...state, right: false };
    default:
      return state;
  };
};

export default userControls;
