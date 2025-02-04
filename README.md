# Scanbot Document Scanning Example App for React Native

This example app shows how to integrate the [Scanbot Document Scanner SDK](https://scanbot.io/developer/react-native-document-scanner/) and [Scanbot Data Capture SDK](https://scanbot.io/developer/react-native-data-capture/) for React Native.

The Scanbot SDK React Native Module is available as an [npm package](https://www.npmjs.com/package/react-native-scanbot-sdk).

For more details please see this [documentation](https://docs.scanbot.io/document-scanner-sdk/react-native/introduction/).


## What is the Scanbot SDK?

The Scanbot SDK lets you integrate barcode & document scanning, as well as data extraction functionalities, into your mobile apps and website. It contains different modules that are licensable for an annual fixed price. For more details, visit our website https://scanbot.io.


## Trial License

The Scanbot SDK will run without a license for one minute per session!

After the trial period has expired, all SDK functions and UI components will stop working. You have to restart the app to get another one-minute trial period.

To try the Scanbot SDK without a one-minute limit, you can get a free “no-strings-attached” trial license. Please submit the [Trial License Form](https://scanbot.io/trial/) on our website.

## Free Developer Support

We provide free "no-strings-attached" developer support for the implementation & testing of the Scanbot SDK.
If you encounter technical issues with integrating the Scanbot SDK or need advice on choosing the appropriate
framework or features, please visit our [Support Page](https://docs.scanbot.io/support/).

## Documentation
👉 [Scanbot SDK documentation](https://docs.scanbot.io/document-scanner-sdk/react-native/introduction/)

## How to run this app

### Set up Environment 

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

Testing on an actual device is essential, so ensure you have one available.

### Install node modules
```bash 
# Install the required dependencies
yarn install
# OR using npm
npm install
```

### Prepare iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
cd ios 
bundle exec pod install
```

#### Signing
- Open the **workspace** file `ScanbotBarcodeExampleReact.xcworkspace` (not .xcodeproj) from the `ios` directory in Xcode.
- Adjust *Provisioning* and *Signing* settings.

### Run on Android
```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### Run on iOS
```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running on your device.

This is not the only way to run your app — you can also run it directly from within Android Studio and Xcode respectively:

###### Still at a loss? It is probably a cache issue

```bash
yarn run clean
```
* `npm cache clean --force && watchman watch-del-all`
* Restart metro server!
