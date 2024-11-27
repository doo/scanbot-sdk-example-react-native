import ScanbotSDK, {Page, CroppingConfiguration} from 'react-native-scanbot-sdk';

async function croppingScreen(page: Page) {
  const configuration: CroppingConfiguration = {
    doneButtonTitle: 'Apply',
    topBarBackgroundColor: '#ffffff',
    bottomBarBackgroundColor: '#ffffff',
  };

  const pageResult = await ScanbotSDK.UI.startCroppingScreen(
    page,
    configuration,
  );
}
