import { createStore } from './dataTools';
import userControls from './reducers/userControls';

const store = createStore(userControls);

export default store;
