import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Running from './src/Running';
import {backgroundBlack, mainGreen} from './src/styles/styles';
import Menu from './src/Menu';
import History from './src/History';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: backgroundBlack},
          }}>
          {props => <Menu {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Running"
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: backgroundBlack},
          }}>
          {props => <Running {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="History"
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: backgroundBlack},
          }}>
          {props => <History {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
