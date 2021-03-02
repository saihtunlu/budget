import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_BALANCE} from './actionTypes';
import store from '../store';
/**
 * set Balance
 * @param data - Balance data
 */
export const setBalance = async (data) => {
  try {
    await AsyncStorage.removeItem('balance');
    const balance = JSON.stringify(data);
    await AsyncStorage.setItem('balance', balance);
    store.dispatch({
      type: SET_BALANCE,
      payload: data,
    });
  } catch (e) {
    // saving error
  }
};
