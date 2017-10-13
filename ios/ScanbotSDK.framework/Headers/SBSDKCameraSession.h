//
//  SBSDKCameraSession.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 22.04.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import "SBSDKFeatures.h"

/**
 * A delegate protocol that gathers AVCaptureVideoDataOutputSampleBufferDelegate
 * and AVCaptureMetadataOutputObjectsDelegate protocols.
 */
@protocol SBSDKCameraSessionDelegate <AVCaptureVideoDataOutputSampleBufferDelegate,
AVCaptureMetadataOutputObjectsDelegate>
@end

/**
 * @class SBSDKCameraSession
 * An easy-to-use wrapper around the AVFoundations video capture session. Sets up and configures the
 * camera device and the preview layer. Provides functionality to capture still images.
 */
@interface SBSDKCameraSession : NSObject

/**
 * The preview layer that the camera device uses to ouput the current video frames.
 * Can be added to any superlayer.
 */
@property (nonatomic, readonly, nonnull) AVCaptureVideoPreviewLayer *previewLayer;

/**
 * Sets or gets the current video orientation.
 */
@property (nonatomic, assign) AVCaptureVideoOrientation videoOrientation;

/**
 * The delegate object for camera output.
 * Its receives the video frames, still image captures and meta data capture, like QR code.
 * Delegates can implement all functions from AVCaptureVideoDataOutputSampleBufferDelegate and
 * AVCaptureMetadataOutputObjectsDelegate protocols.
 */
@property (nonatomic, weak, nullable) id<SBSDKCameraSessionDelegate> videoDelegate;

/**
 * Returns YES if the camera is currenty in the process of taking a still image, NO otherwise.
 */
@property (nonatomic, readonly) BOOL isCapturingStillImage;

/**
 * Returns YES if the camera device has a torch light and the torch light is available.
 **/
@property (nonatomic, readonly) BOOL torchLightAvailable;

/**
 * Turns the torch light on or off.
 **/
@property (nonatomic, assign, getter = isTorchLightEnabled) BOOL torchLightEnabled;

/**
 * A block being executed when the torch light status changes (mode or availability).
 **/
@property (nonatomic, copy, nullable) void (^updateTorchlightBlock)(void);

@property (nonatomic, readonly, nullable) AVCaptureSession* captureSession;

/**
 * The designated initializer of the class. Does not start the capture session.
 * @param feature The feature you want to use the camera for. Relevant features are Document Detection,
 * Payform Detection and QR Codes.
 * @return Newly created and configured instance.
 */
- (nonnull instancetype)initForFeature:(dooFeature)feature;

/**
 * Starts the camera capture session. Does nothing if the session is already running.
 */
- (void)startSession;

/**
 * Stops the camera capture session. Does nothing if the session is already stopped.
 */
- (void)stopSession;

/**
 * Returns YES if the camera session has already been started, NO otherwise.
 */
- (BOOL)isSessionRunning;

/** 
 * Pauses the detection of documents and QR codes.
 */
- (void)pauseDetection;

/**
 * Resumes the detection of documents and QR codes.
 */
- (void)resumeDetection;

/**
 * Returns YES, if detection is paused, NO otherwise.
 */
- (BOOL)isDetectionPaused;

/**
 * Captures a still image asynchronously and passes the CMSampleBufferRef and if needed an error to the
 * completion handler. The CMSampleBufferRef can be converted to any image format/object like UIImage.
 * @param completion The completion handler that is called when the still image has been captured.
 */
- (void)captureStillImageWithCompletionHandler:(nullable void (^)(CMSampleBufferRef _Nullable,  NSError* _Nullable))completion;

/**
 * Captures a still image asynchronously and passes the JPEG image data as NSData and if needed an error to the
 * completion handler.
 * @param completion The completion handler that is called when the still image has been captured.
 */
- (void)captureJPEGStillImageWithCompletionHandler:(nullable void (^)(NSData* _Nullable, NSError* _Nullable))completion;

/**
 * Returns YES, if the camera is currently adjusting autofocus, exposure or white balance, NO otherwise.
 */
- (BOOL)isCameraAdjusting;

@end
