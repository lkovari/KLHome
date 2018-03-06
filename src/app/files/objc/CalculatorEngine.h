//
//  CalculatorEngine.h
//  Calc
//
//  Created by László Kővári on 2012.01.28..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CalcStack.h"
#import "CalculatorUtils.h"
#import "ExpressionTreeBuilder.h"

@interface CalculatorEngine : NSObject {
    NSDecimalNumber *memoryNumber;
}

@property (nonatomic, strong) NSString *currentNumberInText;
@property (nonatomic, weak) NSDecimalNumber *currentNumber;
@property (nonatomic, strong) NSString *currentOperator;

@property (nonatomic, strong) CalcStack *infixCalcStack;
@property (nonatomic, strong) CalcStack *postfixCalcStack;
@property (nonatomic, strong) ExpressionTreeBuilder *expressionTreeBuilder;

@property (nonatomic) int numberOfLeftParenthesises;
@property (nonatomic) int numberOfRightParenthesises;


- (id) init;

- (CalcStack *) infixCalcStack;

- (ExpressionTreeBuilder *) expressionTreeBuilder;


// enter an operand
- (void) enterOperand:(NSDecimalNumber *)value;

// enter an operator
- (void) enterOperator:(NSString *)value;

// enter parenthesises
- (void) enterLeftParenthesis:(NSString *)value;
- (void) enterRightParenthesis:(NSString *)value;

//equal presed
- (NSDecimalNumber *) enterEqual:(NSString *)value;

// clear all values
- (void) clearValues;

// memory function related operations
- (void) memoryAdd:(NSDecimalNumber *)value;
- (void) memorySub:(NSDecimalNumber *)value;
- (NSDecimalNumber *) memoryRead;
- (void) memoryClear;
// change sign
- (void) signChange;

- (void) releaseMemoryNumber;

@end
