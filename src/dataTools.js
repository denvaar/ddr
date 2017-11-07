import deepFreeze from './utils/deepFreeze';

export const createStore = (reducerFunction) => {
  let state;
  let listeners = [];

  const getState = () => deepFreeze(state);

  const dispatch = (action) => {
    state = deepFreeze(reducerFunction(state, action));
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({}); /* force initial state to be applied */

  return { getState, dispatch, subscribe };
};

