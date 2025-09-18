import ScanbotSDK from 'react-native-scanbot-sdk';

async function analytics() {
  try {
    /**
     * Add an analytics subscriber callback to handle
     * any analytics event triggered in the RTU UI flows
     */
    ScanbotSDK.setAnalyticsSubscriber(analyticsEvent => {
      console.log(`Received Analytics Event: ${analyticsEvent.name}`);
    });
  } catch (error) {
    console.error(error);
  }
}
