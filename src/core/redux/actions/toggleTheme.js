import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOGGLE_THEME} from './actionTypes';
import store from '../store';
/**
 * set income
 * @param data - Income data
 */
export const toggleTheme = async (data) => {
  try {
    await AsyncStorage.removeItem('theme');
    await AsyncStorage.setItem('theme', data);
    store.dispatch({
      type: TOGGLE_THEME,
      payload: data,
    });
  } catch (e) {
    // saving error
  }
};
