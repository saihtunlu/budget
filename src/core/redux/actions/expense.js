import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_EXPENSE} from './actionTypes';
import store from '../store';
/**
 * set Expense
 * @param data - expense data
 */
export const setExpense = async (data) => {
  try {
    await AsyncStorage.removeItem('expense');
    const expenses = JSON.stringify(data);
    await AsyncStorage.setItem('expense', expenses);
    store.dispatch({
      type: SET_EXPENSE,
      payload: data,
    });
  } catch (e) {
    // saving error
  }
};
