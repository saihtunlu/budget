import React, {useEffect} from 'react';
import Routes from './components/navigation/Routes';
import {Provider} from 'react-redux';
import {theme, GalioProvider} from 'galio-framework';
import {
  getIncome,
  getExpense,
  getBalance,
  getTheme,
} from './core/redux/mutations';
import store from './core/redux/store';
const customTheme = {
  SIZES: {BASE: 18, BUTTON_SHADOW_RADIUS: 16},
  // this will overwrite the Galio SIZES BASE value 16
  COLORS: {PRIMARY: 'rgb(91, 134, 229)'},
  // this will overwrite the Galio COLORS PRIMARY color #B23AFC
};

export const Providers = () => {
  useEffect(() => {
    getIncome();
    getExpense();
    getBalance();
    getTheme();
  }, []);

  return (
    <Provider store={store}>
      <GalioProvider theme={customTheme}>
        <Routes />
      </GalioProvider>
    </Provider>
  );
};
