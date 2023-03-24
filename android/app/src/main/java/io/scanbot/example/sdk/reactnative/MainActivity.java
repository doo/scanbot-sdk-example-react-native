package io.scanbot.example.sdk.reactnative;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

import io.scanbot.sdk.reactnative.ScanbotSDKReactNative;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ScanbotSDKExampleReact";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    ScanbotSDKReactNative.initializeUiModule(this);
  }
}
