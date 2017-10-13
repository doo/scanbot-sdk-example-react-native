# Example App for Scanbot SDK React Native Module

This example app shows how to integrate the Scanbot SDK React Native Module. 

The Scanbot SDK React Native Module is available as [npm package](https://www.npmjs.com/package/react-native-scanbot-sdk).

For more details please see this [documentation](https://scanbotsdk.github.io/documentation/react-native/).



## What is Scanbot SDK?
The Scanbot SDK brings scanning and document creation capabilities to your mobile apps. 
It contains modules which are individually licensable as license packages. 
For more details visit our website [https://scanbot.io/sdk.html](https://scanbot.io/sdk.html)



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

This example app doesn't contain a Scanbot SDK license key and runs in a **trial mode (trial period of 1 minute)**!  
After the trial period is over the Scanbot SDK functions will stop working. 
The UI parts (like Camera UI) will stop working or may be terminated.
You have to restart the app to get another trial period.
