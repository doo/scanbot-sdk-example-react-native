//
//  ScanbotSDK.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 15.07.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#import <UIKit/UIKit.h>

/**
 * @class ScanbotSDK
 * Main class of Scanbot SDK. Lets you install the license and allows basic configuration.
 */
@interface ScanbotSDK : NSObject

/**
 * Enables or disables the Scanbot SDK logging. If enabled Scanbot SDK logs various warnings,
 * errors and info to the console. By default logging is off.
 * @param enabled YES, if Scanbot SDK should log, NO otherwise.
 */
+ (void)setLoggingEnabled:(BOOL)enabled;

/**
 * Installs the Scanbot SDK license from a string.
 * @param licenseString The string containing the license.
 * @return YES, if the license was installed and is active, NO otherwise.
 */
+ (BOOL)setLicense:(nonnull NSString *)licenseString;

/**
 * Checks the active license.
 * @return YES, if a valid license is installed and not expired or if the trial period is running. NO otherwise.
 */
+ (BOOL)isLicenseValid;

+ (void)setSharedApplication:(nonnull UIApplication *)application;

+ (nullable UIApplication *)sharedApplication;

@end
