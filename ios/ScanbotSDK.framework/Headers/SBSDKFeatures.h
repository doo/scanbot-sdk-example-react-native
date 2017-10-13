//
//  SBSDKFeatures.h
//  Scanbot SDK
//
//  Created by Sebastian Husche on 08.06.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#ifndef dooImageProcessing_SBSDKFeatures_h
#define dooImageProcessing_SBSDKFeatures_h

typedef enum: int8_t {
    OperatingSystemIOS = 1 << 0,
    OperatingSystemAndroid = 1 << 1
} OperatingSystem;

typedef enum: int64_t {
    FeaturePayformDetection = 1 << 0,
    FeatureEdgeDetection = 1 << 1,
    FeatureEdgeDetectionUI = 1 << 2,
    FeatureImageProcessing = 1 << 3,
    FeatureOCR = 1 << 4,
    FeatureDataIntelligence = 1 << 5,
    FeaturePDFCreation = 1 << 6,
    FeatureCloudUpload = 1 << 7,
    FeatureCreditCardRecognition = 1 << 8,
    FeatureQRCode = 1 << 9,
    FeatureW2Detection = 1 << 10,
    FeatureCheque = 1 << 11,
    FeatureInvoiceDetection = 1 << 12,
    FeatureMRZRecognition = 1 << 13
} dooFeature;

#endif
