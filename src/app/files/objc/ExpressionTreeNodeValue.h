//
//  ExpressionTreeNodeValue.h
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ExpressionTreeNode.h"

@interface ExpressionTreeNodeValue : NSObject <ExpressionTreeNode>

@property (nonatomic, strong) NSDecimalNumber *valueNumber;

- (ExpressionTreeNodeValue *) initWithNumber: (NSDecimalNumber *)value;

@end
