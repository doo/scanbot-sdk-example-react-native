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
  public static HOME = 'Scanbot SDK Example React';
  public static BARCODE_FORMATS = 'Barcode Formats';
  public static IMAGE_RESULTS = 'Image Results';
  public static IMAGE_DETAILS = 'Image Details';

  render() {
    return (
      <NavigationContainer theme={ScanbotTheme}>
        <Stack.Navigator initialRouteName={App.HOME}>
          <Stack.Screen name={App.HOME} component={HomeScreen} />
          <Stack.Screen
            name={App.IMAGE_RESULTS}
            component={ImageResultScreen}
          />
          <Stack.Screen
            name={App.BARCODE_FORMATS}
            component={BarcodeFormatsScreen}
          />
          <Stack.Screen
            name={App.IMAGE_DETAILS}
            component={ImageDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// @ts-ignore
export default App;
