//
//  SBSDKMachineReadableCodeParsing.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 30.05.14.
//  Copyright (c) 2014 doo. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SBSDKMachineReadableCode.h"
#import "SBSDKMachineReadableCodeMetadata.h"

/**
 * @protocol SBSDKMachineReadableCodeParsing
 * The protocol any machine readable code parser must conform to.
 * Each parser converts a SBSDKMachineReadableCodeMetadata into a subclass of SBSDKMachineReadableCode or nil.
 */
@protocol SBSDKMachineReadableCodeParsing

/**
 * Parses machine readable code metadata and, on success, returns an instance of a SBSDKMachineReadableCode subclass.
 * @return The machine readable code subclass the receiver extracted from the MRC metadata or nil, if parsing failed.
 */
- (nullable SBSDKMachineReadableCode *)parseMetadata:(nonnull SBSDKMachineReadableCodeMetadata *)metadata;

@end
