//
//  SBSDKCreditCardRecognizer.h
//  CreditCardRecognizer
//
//  Created by Max Tymchiy on 2/23/16.
//  Copyright © 2016 Max Tymchiy. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <CoreMedia/CoreMedia.h>
#import "SBSDKCreditCardRecognizerResult.h"

/**
 * @class SBSDKCreditCardRecognizer
 * A realtime detector and recognizer for credit cards. It detects credit cards on UIImage objects or on
 * CMSampleBufferRef object from an AVFoundation video stream. After successful detection it runs a recognition
 * operation to extract the data fields of the detected credit card.
 */
@interface SBSDKCreditCardRecognizer : NSObject

/**
 * Detects and recognizes a credit card in the given image.
 * @param image The UIImage object to detect a credit card on.
 * @return A SBSDKCreditCardRecognizerResult object containing the field data or nil if detection or recognition failed.
 **/
- (nonnull SBSDKCreditCardRecognizerResult *)recognizeCreditCardInfoOnImage:(nonnull UIImage *)image;

/**
 * Detects and recognizes a credit card in the given image.
 * @param sampleBufferRef The video frame or still image as CMSampleBufferRef object to detect a credit card on.
 * @param orientation The orientation of the video frame.
 * @return A SBSDKCreditCardRecognizerResult object containing the field data or nil if detection or recognition failed.
 **/
- (nullable SBSDKCreditCardRecognizerResult *)recognizeCreditCardInfoOnBuffer:(nonnull CMSampleBufferRef)sampleBufferRef
                                                                  orientation:(AVCaptureVideoOrientation)orientation;
@end
