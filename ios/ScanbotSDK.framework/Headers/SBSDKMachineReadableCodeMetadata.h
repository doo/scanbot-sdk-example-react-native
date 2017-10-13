//
//  SBSDKMachineReadableCodeMetadata.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 23.06.14.
//  Copyright (c) 2014 doo. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>

/**
 * @class SBSDKMachineReadableCodeMetadata
 * A class that holds transformed metadata for a detected AVMetadataMachineReadableCodeObject.
 * Pass these objects to SBSDKMachineReadableCodeManager to parse and transform them into more user-friendly
 * representations.
 */
@interface SBSDKMachineReadableCodeMetadata : NSObject

/**
 * The designated initializer.
 */
- (instancetype)initWithAVMetaDataCodeObject:(AVMetadataMachineReadableCodeObject *)codeObject;

/**
 * Convenience class initializer.
 */
+ (instancetype)metadataWithAVMetaDataCodeObject:(AVMetadataMachineReadableCodeObject *)codeObject;

/**
 * The AVMetadataMachineReadableCodeObject we got from AVCaptureMetadataOutput.
 */
@property(nonatomic, readonly)AVMetadataMachineReadableCodeObject *codeObject;

/**
 * Returns the transformed bounds of the code in the video frame. Unified coordinates (0.0f, 0.0f) - (1.0f, 1.0f).
 */
@property(nonatomic, readonly) CGRect bounds;

/**
 * Returns the transformed corners of the code in the video frame. Unified coordinates (0.0f, 0.0f) - (1.0f, 1.0f).
 */
@property(nonatomic, copy, readonly) NSArray *corners;

/**
 * The string value of the detected code object.
 */
@property(nonatomic, copy, readonly) NSString *stringValue;

/**
 * Returns the transformed center of the bounds of the QR code in the video frame.
 * Unified coordinates (0.0f, 0.0f) - (1.0f, 1.0f).
 */
- (CGPoint) center;

/**
 * Returns the transformed normalized distance of the bounds center from the video frame center.
 */
- (CGFloat) distanceFromCenter;

@end
