//
//  ExpressionTreeNode.h
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol ExpressionTreeNode <NSObject> 

- (NSDecimalNumber *) getValue;

- (NSString *) stringToString;

@end
