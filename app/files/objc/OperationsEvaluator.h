//
//  OperationsEvaluator.h
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface OperationsEvaluator : NSObject

float logx(float value, float base);


+ (NSDecimalNumber *) decimalNumberPow:(NSDecimalNumber *)baseValue exponent:(NSDecimalNumber *)exponent;

+(unsigned long long) factorial:(unsigned long long)n;

+ (NSDecimalNumber *)decimalNumberSqrtDecimalNumber:(NSDecimalNumber *)value;

+(NSDecimalNumber *) evaluateBinaryOperation:(NSString *)operation operand1:(NSDecimalNumber *)value1 operand2:(NSDecimalNumber *)value2;

+(NSDecimalNumber *) evaluateUnaryOperation:(NSString *)operation operand:(NSDecimalNumber *)value;


@end
