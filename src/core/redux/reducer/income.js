import {SET_INCOME, GET_INCOME} from '../actions/actionTypes';

const initialState = [];
export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case SET_INCOME:
      return payload;
    case GET_INCOME:
      return payload;
    default:
      return state;
  }
}
