# Document Scanner SDK with the option to scan QR codes, MRZ and barcodes.

## Scanbot SDK example app for React Native. 

This example app demonstrates how to integrate the [Scanbot Document Scanner SDK for React Native](https://scanbot.io/developer/react-native-document-scanner/).

The Scanbot SDK React Native Module is available as an [npm package](https://www.npmjs.com/package/react-native-scanbot-sdk).

For more details please see this [documentation](https://docs.scanbot.io/document-scanner-sdk/react-native/introduction/).



## What is Scanbot SDK?

The Scanbot SDK brings scanning and document creation capabilities to your mobile apps.
It contains modules which are individually licensable as license packages.
For more details visit our website https://scanbot.io



## How to run this app. 

Make sure you have the latest versions of [React Native CLI](https://facebook.github.io/react-native/)
and [CocoaPods](https://cocoapods.org/) installed.

Install node modules:

```
cd scanbot-sdk-example-react-native/
npm install
```

### Run on Android

```
react-native run-android
```

### Run on iOS

Install CocoaPods dependencies:

```
cd ios/
pod install --repo-update
```

- Open the **workspace** file `ScanbotSDKExampleReactNative.xcworkspace` (not .xcodeproj) from the `ios` directory in Xcode.
- Adjust *Provisioning* and *Signing* settings.
- And run the app in Xcode or via `react-native run-ios`.



## Please note

The Scanbot SDK will run without a license for one minute per session!

After the trial period has expired all Scanbot SDK functions as well as the UI components (like Document Scanner UI) will stop working or may be terminated.
You have to restart the app to get another trial period.

To get a free "no-strings-attached" trial license, please submit the [Trial License Form](https://scanbot.io/trial/) on our website.
