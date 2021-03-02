import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_INCOME} from './actionTypes';
import store from '../store';
/**
 * set income
 * @param data - Income data
 */
export const setIncome = async (data) => {
  try {
    await AsyncStorage.removeItem('income');
    const incomeString = JSON.stringify(data);
    await AsyncStorage.setItem('income', incomeString);
    store.dispatch({
      type: SET_INCOME,
      payload: data,
    });
  } catch (e) {
    // saving error
  }
};
