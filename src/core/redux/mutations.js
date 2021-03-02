import store from './store';
import {
  GET_INCOME,
  GET_EXPENSE,
  GET_BALANCE,
  GET_THEME,
} from './actions/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toggleTheme} from './actions/toggleTheme';

/**
 * getting income data from storage
 */
export const getIncome = async () => {
  try {
    const income = await AsyncStorage.getItem('income');
    if (income) {
      store.dispatch({
        type: GET_INCOME,
        payload: JSON.parse(income),
      });
    }
    return [];
  } catch (e) {
    return [];
  }
};

/**
 * getting expense data from storage
 */
export const getExpense = async () => {
  try {
    const expense = await AsyncStorage.getItem('expense');
    if (expense) {
      store.dispatch({
        type: GET_EXPENSE,
        payload: JSON.parse(expense),
      });
    }
  } catch (e) {
    // error
  }
};

/**
 * getting balance data from storage
 */
export const getBalance = async () => {
  try {
    const balance = await AsyncStorage.getItem('balance');
    if (balance) {
      store.dispatch({
        type: GET_BALANCE,
        payload: JSON.parse(balance),
      });
    }
  } catch (e) {
    // error
  }
};

/**
 * getting theme data from storage
 */
export const getTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    if (theme) {
      toggleTheme(theme);
    }
  } catch (e) {
    // error
  }
};
