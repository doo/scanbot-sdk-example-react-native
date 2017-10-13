//
//  SBSDKScanbotSDKConstants.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 25.06.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#ifndef SBSDK_iOS_SBSDKScanbotSDKConstants_h
#define SBSDK_iOS_SBSDKScanbotSDKConstants_h

#import <UIKit/UIKit.h>

/** @name Blocks */
///@{
/**
 * @typedef SBSDKCompletionHandler
 *  The type of the completion block that each asynchronous ScanbotSDK operation call upon completion.
 * @param finished YES, if the operation was finished succesfully. NO, if the operation failed or was cancelled.
 * @param error An error describing the reason for an unsuccessful operation.
 * @param resultInfo A dictionary containing the results
 */
typedef void (^SBSDKCompletionHandler)(BOOL finished, NSError *_Nullable error, NSDictionary<NSString *, NSObject *> *_Nullable resultInfo);
///@}


/** @name Result info dictionary keys */
///@{
/** NSURL: the operations source file. */
extern NSString *_Nonnull const SBSDKResultInfoSourceFileURLKey;

/** NSURL: the operations destination file. */
extern NSString *_Nonnull const SBSDKResultInfoDestinationFileURLKey;

/** UIImage: the operations destination or output image. */
extern NSString *_Nonnull const SBSDKResultInfoDestinationImageKey;

/** SBSDKOCRResult: the result of a text recognition operation. */
extern NSString *_Nonnull const SBSDKResultInfoOCRResultsKey;

/** SBSDKPageAnalyzerResult: the result of a page layout analysis operation. */
extern NSString *_Nonnull const SBSDKResultInfoPageAnalyzerResultsKey;

/** SBSDKImageStorage: source image storage for operations on multiple images. */
extern NSString *_Nonnull const SBSDKResultInfoImageStorageKey;
///@}


/** @name Error handling */
///@{
/** The constant SBSDK error domain string. */
extern NSString *_Nonnull const SBSDKErrorDomain;

/** The key for an NSError userInfo dictionary that contains the reason for the error. */
extern NSString *_Nonnull const SBSDKErrorReasonKey;

///@}

/**
 * @enum SBSDKErrorCode
 *  The error codes in the SBSDKErrorDomain.
 */
typedef NS_ENUM(NSInteger, SBSDKErrorCode) {
    /** The operation was cancelled. */
    SBSDKErrorOperationCancelled = 1,
    
    /** The image storage was invalid or nil. */
    SBSDKErrorInvalidImageStorage = 2,

    /** The image storage was invalid or nil. */
    SBSDKErrorImageStorageCopyingFailed = 3,
    
    /** The image file did not contain valid image data. */
    SBSDKErrorInvalidImageData = 4,
    
    /** The file does not exist. */
    SBSDKErrorInvalidFileURL = 5,
    
    /** There was an unknown error while rendering a PDF page. */
    SBSDKErrorPDFCreation = 6,
    
    /** Optical text recognition failed. */
    SBSDKErrorTextRecognition = 7,

    /** Page analysis failed. */
    SBSDKErrorPageAnalysis = 8,
    
    /** Language data for text recognition is missing. */
    SBSDKErrorOCRLanguageMissing = 9,
    
    /** Some other error. */
    SBDKErrorUnknown = 999
};

/**
 * @enum SBSDKImageMode
 *  Enum describing the image color mode of output images.
 */
typedef NS_ENUM(NSInteger, SBSDKImageMode) {
    
    /** 24/32 bit RGB(A) images. **/
    SBSDKImageModeColor = 0,
    
    /** 8 bit grayscale images. **/
    SBSDKImageModeGrayscale= 1
};

/**
 * @enum SBSDKScannerStatus
 * This enum describes the possible scanning states of an SBSDKScannerViewController.
 */
typedef NS_ENUM(NSInteger, SBSDKScannerStatus) {
    /** Scanning is paused or hasn't yet been started. **/
    SBSDKScannerStatusIdle = 0,
    
    /** Scanning is active. **/
    SBSDKScannerStatusScanning = 1,
    
    /** A document has been detected. **/
    SBSDKScannerStatusDetected = 2
};

#endif
