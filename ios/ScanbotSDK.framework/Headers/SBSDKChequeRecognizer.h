//
//  SBSDKChequeRecognizer.h
//  ScanbotSDK
//
//  Created by Dmitry Zaytsev on 12/04/16.
//  Copyright © 2016 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <CoreMedia/CoreMedia.h>
#import "SBSDKChequeRecognizerResult.h"

/**
 * @class SBSDKChequeRecognizer
 * A realtime detector and recognizer for U.S. Cheques. It detects cheques on CMSampleBufferRef object
 * from an AVFoundation video stream. After successful detection it runs a recognition
 * operation to extract the data fields of the detected credit card.
 */
@interface SBSDKChequeRecognizer : NSObject

/**
 * Detects and recognizes a U.S. Cheque in the given image.
 * @param sampleBufferRef The video frame or still image as CMSampleBufferRef object to detect a cheque on.
 * @param orientation The orientation of the video frame.
 * @return A SBSDKChequeRecognizerResult object containing the field data or nil if detection or recognition failed.
 **/
- (nullable SBSDKChequeRecognizerResult *)recognizeChequeOnBuffer:(nonnull CMSampleBufferRef)sampleBufferRef
                                                      orientation:(AVCaptureVideoOrientation)videoOrientation;

@end
