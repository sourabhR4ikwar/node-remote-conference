import { combineReducers } from 'redux';

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const rootReducer = combineReducers({
    todos
});

export default rootReducer;