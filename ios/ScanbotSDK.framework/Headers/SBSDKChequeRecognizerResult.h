//
//  SBSDKChequeRecognizerResult.h
//  ScanbotSDK
//
//  Created by Dmitry Zaytsev on 12/04/16.
//  Copyright © 2016 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SBSDKPolygon.h"

/**
 * @class SBSDKChequeRecognizerResult
 * Contains the result of a cheque recognition.
 */
@interface SBSDKChequeRecognizerResult : NSObject

/** The 9-digit routing number. Empty if it was not found. **/
@property (nonatomic, readonly, strong, nullable) NSString *routingNumber;

/** The account number. Empty if it was not found. **/
@property (nonatomic, readonly, strong, nullable) NSString *accountNumber;

/** The polygon of the cheque withinin the image. **/
@property (nonatomic, readonly, copy, nullable) SBSDKPolygon *polygon;

@end
