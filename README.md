# Scanbot Barcode & Document Scanning Example App for React Native

This example app shows how to integrate the [Scanbot Barcode Scanner SDK](https://scanbot.io/developer/react-native-barcode-scanner/), [Scanbot Document Scanner SDK](https://scanbot.io/developer/react-native-document-scanner/), and [Scanbot Data Capture SDK](https://scanbot.io/developer/react-native-data-capture/) for React Native.

The Scanbot SDK React Native Module is available as an [npm package](https://www.npmjs.com/package/react-native-scanbot-sdk).

For more details please see this [documentation](https://docs.scanbot.io/document-scanner-sdk/react-native/introduction/).


## What is the Scanbot SDK?

The Scanbot SDK lets you integrate barcode & document scanning, as well as data extraction functionalities, into your mobile apps and website. It contains different modules that are licensable for an annual fixed price. For more details, visit our website https://scanbot.io.


## Trial License

The Scanbot SDK will run without a license for one minute per session!

After the trial period has expired, all SDK functions and UI components will stop working. You have to restart the app to get another one-minute trial period.

To test the Scanbot SDK without crashing, you can get a free “no-strings-attached” trial license. Please submit the [Trial License Form](https://scanbot.io/trial/) on our website.

## Free Developer Support

We provide free "no-strings-attached" developer support for the implementation & testing of the Scanbot SDK.
If you encounter technical issues with integrating the Scanbot SDK or need advice on choosing the appropriate
framework or features, please visit our [Support Page](https://docs.scanbot.io/support/).

## Documentation
👉 [Scanbot SDK documentation](https://docs.scanbot.io/document-scanner-sdk/react-native/introduction/)

## How to run this app

### Set up Environment 

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

Testing on an actual device is essential, so ensure you have one available.

### Install node modules
```bash 
yarn install
```

### Prepare iOS

If Cocoapods are not installed locally the following command should be run
```bash 
bundle install
```
and then we can install the pods
```bash 
cd ios
bundle exec pod install
```
or if pods are installed
```bash 
cd ios
pod install
```

#### Signing
- Open the **workspace** file `ScanbotBarcodeExampleReact.xcworkspace` (not .xcodeproj) from the `ios` directory in Xcode.
- Adjust *Provisioning* and *Signing* settings.

### Run on Android
```bash
react-native run-android
```

### Run on iOS
```bash
react-native run-ios
```

###### Still at a loss? It is probably a cache issue

```bash
yarn run clean
```
* `npm cache clean --force && watchman watch-del-all`
* Restart metro server!
