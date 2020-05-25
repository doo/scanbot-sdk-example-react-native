/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {HomeScreen} from './pages/HomeScreen';
import {ImageResultScreen} from './pages/ImageResultScreen';
import {BarcodeFormatsScreen} from './pages/BarcodeFormatsScreen';
import {ImageDetailScreen} from './pages/ImageDetailScreen';
import {Navigation} from "./utils/Navigation";

const Stack = createStackNavigator();

const nearWhite = 'rgb(250, 250, 250)';
const ScanbotTheme = {
  dark: false,
  colors: {
    primary: nearWhite,
    background: nearWhite,
    card: '#c8193c',
    text: nearWhite,
    border: nearWhite,
  },
};

export class App extends React.Component {
  render() {
    return (
      <NavigationContainer theme={ScanbotTheme}>
        <Stack.Navigator initialRouteName={Navigation.HOME}>
          <Stack.Screen name={Navigation.HOME} component={HomeScreen} />
          <Stack.Screen
            name={Navigation.IMAGE_RESULTS}
            component={ImageResultScreen}
          />
          <Stack.Screen
            name={Navigation.BARCODE_FORMATS}
            component={BarcodeFormatsScreen}
          />
          <Stack.Screen
            name={Navigation.IMAGE_DETAILS}
            component={ImageDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// @ts-ignore
export default App;
