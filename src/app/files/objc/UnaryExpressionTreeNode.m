//
//  UnaryExpressionTreeNode.m
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "UnaryExpressionTreeNode.h"
#import "OperationsEvaluator.h"

@implementation UnaryExpressionTreeNode

@synthesize operation = _operation;
@synthesize singleExpressionTreeNode = _singleExpressionTreeNode;

/*
 *  Constructor with operator parameter
 */
- (UnaryExpressionTreeNode *) initWithOperation: (NSString *)opr {
    self = [super init];
    if ( self ) {
        [self setOperation:opr];
    }
    return self;
}

/*
 *  get the calculated value
 */
- (NSDecimalNumber *) getValue {
    // calculate value of subtrees 
    NSDecimalNumber * valueOperation = [self.singleExpressionTreeNode getValue];
    // calculate value of operation
    NSDecimalNumber * value = [OperationsEvaluator evaluateUnaryOperation:_operation operand:valueOperation];
    return value;
}

/*
 *  convert to string with operator
 */
- (NSString *) stringToString {
    return nil;
}

@end
