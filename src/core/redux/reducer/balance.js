import {SET_BALANCE, GET_BALANCE} from '../actions/actionTypes';

const initialState = null;
export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case SET_BALANCE:
      return payload;
    case GET_BALANCE:
      return payload;
    default:
      return state;
  }
}
