//
//  CalculatorEngine.m
//  Calc
//
//  Created by László Kővári on 2012.01.28..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "CalculatorEngine.h"
#import "ExpressionTreeNode.h"


@implementation CalculatorEngine

@synthesize currentNumberInText = _currentNumberInText;
@synthesize currentNumber = _currentNumber;
@synthesize currentOperator = _currentOperator;

@synthesize infixCalcStack = _infixCalcStack;
@synthesize postfixCalcStack = _postfixCalcStack;
@synthesize expressionTreeBuilder = _expressionTreeBuilder;

@synthesize numberOfLeftParenthesises = _numberOfLeftParenthesises;
@synthesize numberOfRightParenthesises = _numberOfRightParenthesises;

- (id) init {
    self = [super init]; 
    if (self) {
        self.numberOfLeftParenthesises = 0;
        self.numberOfRightParenthesises = 0;
    }
    return self;
}

- (CalcStack *) infixCalcStack {
    if (!_infixCalcStack) 
        _infixCalcStack = [[CalcStack alloc] init];
    return _infixCalcStack;    
}

- (ExpressionTreeBuilder *) expressionTreeBuilder {
    if (!_expressionTreeBuilder) 
        _expressionTreeBuilder = [[ExpressionTreeBuilder alloc] init];
    return _expressionTreeBuilder;    
    
}



/*
 *
 */
- (void) enterOperand:(NSDecimalNumber *)value {
    self.currentNumber = value;
    [self.infixCalcStack push:value];
}

/*
 *
 */
- (void) enterOperator:(NSString *)value {
    self.currentOperator = value;
    [self.infixCalcStack push:value];
}

/*
 *
 */
- (void) enterLeftParenthesis:(NSString *)value {
    [self.infixCalcStack push:value];
    self.numberOfLeftParenthesises++;
}

/*
 *
 */
- (void) enterRightParenthesis:(NSString *)value {
    [self.infixCalcStack push:value];
    self.numberOfRightParenthesises++;
}

/*
 *  Evaluate expression 
 */
- (NSDecimalNumber *) enterEqual:(NSString *)value {
    NSDecimalNumber *result = nil;
    
    _postfixCalcStack = [CalculatorUtils callStackConvertInfixToPostfixCallStack:_infixCalcStack];
    // set postfix stack
    [self.expressionTreeBuilder setPostfixStack:_postfixCalcStack];
    id<ExpressionTreeNode> treeNode = [_expressionTreeBuilder buildExpessionTree];
    result = [treeNode getValue];
    return result;
}

/*
 *  clear all values
 */
- (void) clearValues {
    [self.infixCalcStack clear];
    self.infixCalcStack = nil;
    self.currentOperator = @"";
    self.currentNumberInText = @"";
    self.currentNumber = nil;
    [self.postfixCalcStack clear];
    self.postfixCalcStack = nil;
    [self.expressionTreeBuilder clearExpressionTree];
    self.numberOfLeftParenthesises = 0;
    self.numberOfRightParenthesises = 0;
//    _expressionTreeBuilder = nil;
}


/*
 *  add a value tostored value in memory
 */
- (void) memoryAdd:(NSDecimalNumber *)value {
    if (memoryNumber == nil) {
        memoryNumber = [[NSDecimalNumber alloc] initWithDouble:0.0];        
    }    
    memoryNumber = [memoryNumber decimalNumberByAdding:value];
}

/*
 *  sub a value from stored value in memory
 */
- (void) memorySub:(NSDecimalNumber *)value {
    if (memoryNumber == nil) {
        memoryNumber = [[NSDecimalNumber alloc] initWithDouble:0.0];        
    }    
    memoryNumber = [memoryNumber decimalNumberBySubtracting:value];
    
}

/*
 *  read value from memory
 */
- (NSDecimalNumber *) memoryRead {
    if (memoryNumber != nil) 
        self.currentNumber = memoryNumber;    
    return memoryNumber;
}

/*
 *  clear value of memory
 */
- (void) memoryClear {
   memoryNumber = nil;
}

/*
 *  change the sign of the curren number
 */
- (void) signChange {
    NSDecimalNumber *minusOne = [NSDecimalNumber decimalNumberWithString:@"-1.0"];
    self.currentNumber = [self.currentNumber decimalNumberByMultiplyingBy:minusOne];
}

- (void) releaseMemoryNumber {
    memoryNumber = nil;
}

@end
