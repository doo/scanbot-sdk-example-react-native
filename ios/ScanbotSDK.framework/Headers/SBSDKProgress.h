//
//  SBSDKProgress.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 24.06.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>

@class SBSDKProgress;

/**
 * @name Progress kind info identifiers
 * Can be used to set the progress' `kind` property,
 * resulting in nice localizable descriptions for the progress. 
 */
///@{

/** The progress describes a text recognition operation. */
extern NSString *_Nonnull const SBSDKProgressKindTextRecognition;

/** The progress describes a document/PDF creation operation. */
extern NSString *_Nonnull const SBSDKProgressKindCreatePages;

/** The progress describes an image processing operation. */
extern NSString *_Nonnull const SBSDKProgressKindProcessImage;
///@}


/**
 * @typedef SBSDKProgessUpdateHandler
 * @param progress The progress object that called the update handler.
 */
typedef void (^SBSDKProgessUpdateHandler)(SBSDKProgress *_Nonnull progress);


/**
 * @class SBSDKProgress
 * A NSProgress subclass with a simpler update mechanism and linked operation cancelling.
 * To cancel the underlying operation simply call `-cancel` on the progress object.
 */
@interface SBSDKProgress : NSProgress
/**
 * The standard process for observing a NSProgress progressing is to use KVO on the NSProgress instance.
 * The SBSDKProgressUpdateHandler simplifies observing the progress largely.
 * It is called on main thread whenever the progress changes. Usually here you update your UI, e.g. UIProgressView.
 */
@property (nonatomic, copy, nullable) SBSDKProgessUpdateHandler updateHandler;

/** 
 * A convenience initializer mimicking the behaviour of NSProgress.
 * @param unitCount The number of total work units the progress. See NSProgress.
 */
+ (nonnull SBSDKProgress *)progressWithTotalUnitCount:(int64_t)unitCount;

@end
