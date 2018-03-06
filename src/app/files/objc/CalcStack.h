//
//  CalcStack.h
//  Calc
//
//  Created by László Kővári on 2012.01.28..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <Foundation/Foundation.h>

/*
 *  CalcStack simple object stack interface
 */
@interface CalcStack : NSObject

@property (nonatomic, strong) NSMutableArray *stack;

@property (nonatomic, strong) NSMutableArray *tempArray;

- (id) init;

/*
 *  return YES if has object else NO
 */
- (BOOL)boolHasObjects;
/*
 *  return an object from the top of stack NOT remove it
 */
- (id) peek;
/*
 *  return an object from the top of stack /remove it of corse/
 */
- (id) pop;
/*
 *  add an object to the stack
 */
- (int) push:(id)obj;
/*
 *  get the size of stack
 */
- (int) size;
/*
 *
 */
- (BOOL) boolIsEmpty;
/*
 *  clear the stack content
 */
- (void) clear;

/*
 *
 */
- (void) reverse;

/*
 *  is Number on top of stack
 */
-(BOOL) boolIsNumberOnTop;

/*
 *  is String on top of stack
 */
-(BOOL) boolIsStringOnTop;

/*
 *
 */
-(NSArray*) arrayGetObjects;

@end
