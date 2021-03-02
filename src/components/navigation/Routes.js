import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function Routes() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
export default Routes;
