import React, {useCallback, useRef, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DocumentDetectionStatus,
  ScanbotDocumentScannerView,
  ScanbotDocumentScannerViewHandle,
} from 'react-native-scanbot-sdk';
import {COLORS} from '@theme';

export function DocumentScannerViewScreen() {
  const ref = useRef<ScanbotDocumentScannerViewHandle>(null);
  const [flashEnabled, setFlash] = useState<boolean>(false);
  const [finderEnabled, setFinder] = useState<boolean>(false);
  const [result, setResult] = useState<string | undefined>(undefined);
  const [detectionState, setDetectionState] = useState<DocumentDetectionStatus>(
    'ERROR_NOTHING_DETECTED',
  );

  const onToggleFinder = useCallback(() => {
    setFinder(f => !f);
  }, []);

  const onToggleFlash = useCallback(() => {
    setFlash(f => !f);
  }, []);

  const onSnap = useCallback(() => {
    ref.current?.snapDocument();
  }, []);

  const onDocumentResult = useCallback((base64Image: string) => {
    setResult(base64Image);
  }, []);

  const onDetectionResult = useCallback(
    (status: DocumentDetectionStatus) => {
      if (status !== detectionState) {
        setDetectionState(status);
      }
    },
    [detectionState],
  );

  if (result) {
    return (
      <View style={styles.container}>
        <Image
          resizeMode={'contain'}
          style={styles.result}
          source={{uri: 'data:image/jpeg;base64,' + result}}
        />
        <Button
          title={'Back to scanning'}
          onPress={() => setResult(undefined)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScanbotDocumentScannerView
        ref={ref}
        onDocumentScannerResult={onDocumentResult}
        onDetectionResult={onDetectionResult}
        autoSnappingEnabled={true}
        ignoreBadAspectRatio={true}
        flashEnabled={flashEnabled}
        finderEnabled={finderEnabled}
        finderLineColor={'#C8193C'}
        finderLineWidth={3}
        finderCornerRadius={20}
        polygonEnabled={!finderEnabled}
        polygonBackgroundColor={'#C8193CBF'}
        polygonBackgroundColorOK={'#FFFFFF00'}
        polygonColor={'#C8193C'}
        polygonAutoSnapProgressColor={'#ffffff'}
        polygonAutoSnapProgressEnabled={!finderEnabled}
      />
      <View pointerEvents={'box-none'} style={styles.overlayContainer}>
        <View />
        <Text style={styles.detectionStatusText}>{detectionState}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.actionButtonContainer}
            onPress={onToggleFinder}>
            <Text style={styles.actionButtonText}>Toggle Finder</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSnap}>
            <View style={styles.snapButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButtonContainer}
            onPress={onToggleFlash}>
            <Text style={styles.actionButtonText}>Toggle Flash</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '4%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 22,
  },
  snapButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  actionButtonContainer: {
    backgroundColor: COLORS.SCANBOT_RED,
    padding: '4%',
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detectionStatusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    flex: 1,
  },
});
