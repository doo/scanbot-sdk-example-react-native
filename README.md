# Document Scan SDK with the option to scan QR codes, MRZ and barcodes

## Scanbot SDK example app for React Native

This example app shows how to integrate the Scanbot SDK React Native Module. 

The Scanbot SDK React Native Module is available as [npm package](https://www.npmjs.com/package/react-native-scanbot-sdk).

For more details please see this [documentation](https://scanbotsdk.github.io/documentation/react-native/).



## What is Scanbot SDK?
The Scanbot SDK brings scanning and document creation capabilities to your mobile apps. 
It contains modules which are individually licensable as license packages. 
For more details visit our website https://scanbot.io/sdk



## How to run this app

Install [React Native CLI](https://facebook.github.io/react-native/). 
Fetch this repository and navigate to the project directory.

`cd scanbot-sdk-example-react-native`

Install node modules:

`npm install`

### Run on Android

`react-native run-android`

### Run on iOS (Xcode required)

- Open the project file `ScanbotSDKDemo.xcodeproj` from the `ios` directory in Xcode 
- Adjust *Provisioning* and *Code Signing* settings
- Start the App in Xcode or via `react-native run-ios`



## Please note

The Scanbot SDK will run without a license for one minute per session!

After the trial period is over all Scanbot SDK functions as well as the UI components (like Document Scanner UI) will stop working or may be terminated.
You have to restart the app to get another trial period.

To get an unrestricted "no-strings-attached" 30 day trial license, please submit the [Trial License Form](https://scanbot.io/sdk/trial.html) on our website.
