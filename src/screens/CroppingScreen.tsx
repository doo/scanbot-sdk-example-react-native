import {Image, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {ActionButton} from '@components';
import React, {useCallback, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {CroppingViewScreenRouteProp, infoMessageAlert} from '@utils';

import {
  CroppingViewResult,
  EncodeImageOptions,
  ScanbotCroppingView,
  ScanbotCroppingViewHandle,
} from 'react-native-scanbot-sdk';

export function CroppingScreen() {
  const route = useRoute<CroppingViewScreenRouteProp>();
  const ref = useRef<ScanbotCroppingViewHandle>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isPortrait, setIsPortrait] = useState(false);

  const onResetPolygons = useCallback(() => {
    ref.current?.resetPolygon();
  }, []);

  const onDetect = useCallback(() => {
    ref.current?.detectPolygon();
  }, []);

  const onExtractCroppedArea = useCallback(() => {
    ref.current?.extractCroppedArea();
  }, []);

  const onClockwiseRotate = useCallback(() => {
    ref.current?.rotate('CLOCKWISE');
  }, []);

  const onCounterClockwiseRotate = useCallback(() => {
    ref.current?.rotate('COUNTERCLOCKWISE');
  }, []);

  const onCroppedAreaResult = useCallback(
    async (result: CroppingViewResult) => {
      if (result.sourceImage) {
        setCroppedImage(
          await result.sourceImage.encodeImage(new EncodeImageOptions()),
        );
      }
    },
    [],
  );

  const onError = useCallback((message: string) => {
    infoMessageAlert(message);
  }, []);

  const onLayoutChange = useCallback(
    (layout: LayoutChangeEvent) => {
      const currentlyIsPortrait =
        layout.nativeEvent.layout.height > layout.nativeEvent.layout.width;
      if (currentlyIsPortrait !== isPortrait) {
        setIsPortrait(currentlyIsPortrait);
      }
    },
    [isPortrait],
  );

  if (croppedImage) {
    return (
      <View style={styles.resultContainer}>
        <Image
          resizeMode={'contain'}
          style={styles.result}
          source={{uri: 'data:image/jpeg;base64,' + croppedImage}}
        />
        <ActionButton
          label={'Crop Again'}
          onPress={() => setCroppedImage(null)}
        />
      </View>
    );
  }

  return (
    <View
      onLayout={onLayoutChange}
      style={isPortrait ? styles.container : styles.containerLandscape}>
      <ScanbotCroppingView
        ref={ref}
        src={{imageFileUri: route.params.fileURI}}
        onCroppedAreaResult={onCroppedAreaResult}
        onError={onError}
        edgeColor={'#C8193C'}
        anchorPointsColor={'#ff00aa'}
        edgeLineWidth={20}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <View style={styles.buttonCell}>
            <ActionButton
              textStyle={styles.buttonText}
              containerStyle={styles.button}
              onPress={onResetPolygons}
              label={'Reset polygon'}
            />
            <ActionButton
              textStyle={styles.buttonText}
              containerStyle={styles.button}
              onPress={onDetect}
              label={'Detect polygon'}
            />
          </View>
          <View style={styles.buttonCell}>
            <ActionButton
              textStyle={styles.buttonText}
              containerStyle={styles.button}
              onPress={onClockwiseRotate}
              label={'Rotate \u21BB'}
            />
            <ActionButton
              textStyle={styles.buttonText}
              containerStyle={styles.button}
              onPress={onCounterClockwiseRotate}
              label={'Rotate \u21BA'}
            />
          </View>
        </View>
        <ActionButton
          textStyle={styles.buttonText}
          containerStyle={styles.button}
          onPress={onExtractCroppedArea}
          label={'Extract polygon'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLandscape: {
    flexDirection: 'row',
    flex: 1,
  },
  resultContainer: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: '4%',
  },
  result: {
    flex: 1,
    maxHeight: '90%',
  },
  buttonContainer: {
    minWidth: 250,
    paddingVertical: 8,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 18,
  },
  buttonCell: {
    flex: 1,
    gap: 4,
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 100,
    padding: '1%',
  },
  buttonText: {
    textAlign: 'center',
  },
});
