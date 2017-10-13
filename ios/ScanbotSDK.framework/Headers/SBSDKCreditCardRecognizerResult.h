//
//  SBSDKCreditCardRecognizerResult.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 11.03.16.
//  Copyright © 2016 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SBSDKPolygon.h"

/**
 * @class SBSDKCreditCardRecognizerResult
 * Contains the result of a credit card recognition.
 */
@interface SBSDKCreditCardRecognizerResult : NSObject

/** The credit cards number. **/
@property (nonatomic, readonly, strong, nullable) NSString *number;

/** The holder of the credit card. **/
@property (nonatomic, readonly, strong, nullable) NSString *holder;

/** The expiration date of the credit card. **/
@property (nonatomic, readonly, strong, nullable) NSString *expirationDate;

/** The polygon of the credit card withinin the image. **/
@property (nonatomic, readonly, copy, nullable) SBSDKPolygon *polygon;

@end
