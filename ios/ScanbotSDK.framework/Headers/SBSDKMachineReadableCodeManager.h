//
//  SBSDKMachineReadableCodeManager.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 21.09.17.
//  Copyright © 2017 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SBSDKMachineReadableCodeParsing.h"
#import "SBSDKMachineReadableCode.h"
#import "SBSDKMachineReadableCodeMetadata.h"

/**
 * @class SBSDKMachineReadableCodeManager
 * Helper class to parse and transform SBSDKMachineReadableCodeMetadata into specific SBSDKMachineReadableCode
 * subclass instances.
 * To transform a metadata object into a machine readable code object a matching parser is needed.
 *
 * Parsers must conform to the SBSDKMachineReadableCodeParsing protocol and must be registered using the registerParser
 * method.
 *
 * Typically a parsers parseMetadata method takes an SBSDKMachineReadableCodeMetadata object, parses its
 * stringValue and eventually returns an instance of a SBSDKMachineReadableCode subclass.
 * If the parsing fails or the stringValue does not match the parsers pattern, the parser should return nil.
 *
 * ScanbotSDK comes with some basic default parsers and can be extended with custom machine readable codes and their
 * matching parsers.
 */
@interface SBSDKMachineReadableCodeManager: NSObject

/**
 * @return The default instance with pre-registered ScanbotSDK parsers and machine readable codes.
 * If you don't want to invoke the default parsers, create your own instance using the init method and register your
 * custom parsers there.
 */
+ (instancetype _Nonnull)defaultManager;

/**
 * Registers your custom machine readable code parser. Make sure you register each custom parser once only.
 * @param parser Your custom SBSDKMachineReadableCode parser.
 */
- (void)registerParser:(nonnull id<SBSDKMachineReadableCodeParsing>)parser;

/**
 * Traverses through all registered parsers in reverse order and tries to transform the metadata object into a
 * machine readable code object. Returns the first successfully parsed machine readable code.
 * @param metadata The SBSDKMachineReadableCodeMetadata to transform into SBSDKMachineReadableCode.
 * @return First successfully parsed machine readable code object, or nil, if no parser was matching.
 */
- (nullable SBSDKMachineReadableCode *)parseCodeFromMetadata:(nonnull SBSDKMachineReadableCodeMetadata *)metadata;

/**
 * Traverses through all registered parsers in reverse order and tries to transform the metadata object into a
 * machine readable code object. Returns all successfully parsed machine readable codes.
 * @param metadata The SBSDKMachineReadableCodeMetadata to transform into SBSDKMachineReadableCode.
 * @return An array of successfully parsed machine readable code objects. Returns an empty array
 * if no parser was matching.
 */
- (nonnull NSArray<SBSDKMachineReadableCode *> *)parseAllCodesFromMetadata:(nonnull SBSDKMachineReadableCodeMetadata *)metadata;

@end
