import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//Screens
import Home from '../screens/Home';
import Expense from '../screens/Expense';
import Income from '../screens/Income';
import EditIncome from '../screens/EditIncome';
import AddIncome from '../screens/AddIncome';
import Setting from '../screens/Setting';
import EditExpense from '../screens/EditExpense';
import AddExpense from '../screens/AddExpense';

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Expense" component={Expense} />
      <Stack.Screen name="Income" component={Income} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="EditExpense" component={EditExpense} />
      <Stack.Screen name="AddExpense" component={AddExpense} />
      <Stack.Screen name="EditIncome" component={EditIncome} />
      <Stack.Screen name="AddIncome" component={AddIncome} />
    </Stack.Navigator>
  );
};

export default AppStack;
