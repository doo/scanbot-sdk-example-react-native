import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {HomeScreen} from './pages/HomeScreen';
import {ImageResultScreen} from './pages/ImageResultScreen';
import {BarcodeFormatsScreen} from './pages/BarcodeFormatsScreen';
import {ImageDetailScreen} from './pages/ImageDetailScreen';
import {Navigation} from './utils/Navigation';
import {Styles} from './model/Styles';
import ScanbotSDK, {InitializationOptions} from 'react-native-scanbot-sdk';
import {SDKUtils} from './utils/SDKUtils';

const Stack = createStackNavigator();

export class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.initScanbotSdk().then((r) => console.log(r));
  }

  async initScanbotSdk() {
    const options: InitializationOptions = {
      licenseKey: SDKUtils.SDK_LICENSE_KEY,
      loggingEnabled: true,
      storageImageFormat: 'JPG',
      storageImageQuality: 80,
      documentDetectorMode: 'ML_BASED',
    };
    return await ScanbotSDK.initializeSDK(options);
  }

  render() {
    return (
      <NavigationContainer theme={Styles.ScanbotTheme}>
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
