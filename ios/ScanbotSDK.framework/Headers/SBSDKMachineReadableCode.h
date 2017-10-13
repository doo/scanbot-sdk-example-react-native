//
//  SBSDKMachineReadableCode.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 26.05.14.
//  Copyright (c) 2014 doo. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SBSDKMachineReadableCodeMetadata.h"

/**
 * @class SBSDKMachineReadableCode
 * The base class for a machine readable code. Contains string value and metadata.
 * Provides some basic functions to support sharing, opening and displaying QR- or barcode data.
 *
 * Custom machine readable code parsers return subclasses.
 */
@interface SBSDKMachineReadableCode : NSObject

/**
 * The designated initializer.
 */
- (instancetype)initWithMetadata:(SBSDKMachineReadableCodeMetadata *)metadata;

/**
 * Convenience class initializer.
 */
+ (instancetype)codeWithMetadata:(SBSDKMachineReadableCodeMetadata *)metadata;

/**
 * The underlying metadata object.
 */
@property(nonatomic, readonly) SBSDKMachineReadableCodeMetadata* metadata;

/**
 * The unprocessed string value of the receiver.
 */
@property(nonatomic, copy, readonly) NSString *stringValue;

/**
 * An URL that can be opened via -[UIApplication openURL] or nil.
 * Subclasses should override this function to return a meaningful URL.
 */
@property(nonatomic, copy, readonly) NSURL *externalURL;

/**
 * Whether UIApplication can open the external URL or not.
 */
@property(nonatomic, readonly) BOOL canOpenExternally;

/**
 * An array of objects that are forwareded to an UIActivityViewController when the user hits the share button.
 * Subclasses here provide shareable objects here.
 */
@property(nonatomic, readonly) NSArray *sharedObjects;

/**
 * Opens the externalURL of the receiver via -[UIApplication openURL:].
 * Does nothing if [UIApplication canOpenURL:] returns NO.
 */
- (void)openExternally;

/**
 * @return YES, if the receiver represents a QR code, NO otherwise.
 */
- (BOOL)isQRCode;

/**
 * @return A string, describing the type of the receiver.
 * Subclasses should override this method to return a meaningful type description.
 */
- (NSString *)type;

@end
