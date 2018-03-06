//
//  BinaryExpressionTreeNode.m
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "BinaryExpressionTreeNode.h"
#import "OperationsEvaluator.h"

@implementation BinaryExpressionTreeNode

@synthesize operation = _operation;
@synthesize leftExpressionTreeNode = _leftExpressionTreeNode;
@synthesize rightExpressionTreeNode = _rightExpressionTreeNode;

/*
 *  Constructor with operator parameter
 */
- (BinaryExpressionTreeNode *) initWithOperation: (NSString *)opr {
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
    NSDecimalNumber *valueOperationLeft = [self.leftExpressionTreeNode getValue];
    NSDecimalNumber *valueOperationRight = [self.rightExpressionTreeNode getValue];
    // calculate value of operation
    NSDecimalNumber *value = [OperationsEvaluator evaluateBinaryOperation:_operation operand1:valueOperationRight operand2:valueOperationLeft];
    return value;
}

/*
 *  convert to string with operator
 */
- (NSString *) stringToString {
    NSDecimalNumber *value = [self getValue];
    return value.stringValue;
}

@end
