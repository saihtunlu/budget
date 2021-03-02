import {SET_EXPENSE, GET_EXPENSE} from '../actions/actionTypes';

const initialState = [];
export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case SET_EXPENSE:
      return payload;
    case GET_EXPENSE:
      return payload;
    default:
      return state;
  }
}
