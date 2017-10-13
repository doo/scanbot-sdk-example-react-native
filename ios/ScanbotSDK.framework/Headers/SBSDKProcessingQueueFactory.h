//
//  SBSDKProcessingQueueFactory.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 18.06.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * @class SBSDKProcessingQueueFactory
 * Factory class providing different NSOperationQueues to work on.
 * There are 3 main queues:
 * - A serial queue for image processing.
 * - A serial queue for text processing like optical character recognition.
 * - A concurrent queue for networking operations allowing 4 concurrent operations.
 */
@interface SBSDKProcessingQueueFactory : NSObject

/** 
 * The serial image processing queue.
 * If you do additional image processing on large images or other tasks that consumes a lot of memory 
 * it is highly recommended to use this queue.
 */
+ (nonnull NSOperationQueue *)serialImageProcessingQueue;

/**
 * The serial text processing queue.
 * If you perform additonal tasks that consume a lot of CPU power you should consider using this queue. On the other hand
 * text processing operations can take a very long time.
 */
+ (nonnull NSOperationQueue *)serialTextProcessingQueue;


/**
 * The concurrent networking queue.
 * If you perform additonal tasks that use the network it is highly recommended to use this queue.
 */
+ (nonnull NSOperationQueue *)concurrentNetworkQueue;

@end
