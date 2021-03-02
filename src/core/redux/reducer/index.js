import {combineReducers} from 'redux';
import Theme from './Theme';
import income from './income';
import expense from './expense';
import balance from './balance';

export default combineReducers({
  Theme,
  income,
  expense,
  balance,
});
