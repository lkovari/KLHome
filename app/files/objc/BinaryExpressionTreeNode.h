//
//  BinaryExpressionTreeNode.h
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ExpressionTreeNode.h"

@interface BinaryExpressionTreeNode : NSObject <ExpressionTreeNode> 

@property (nonatomic, strong) NSString *operation;
@property (nonatomic, strong) id<ExpressionTreeNode> leftExpressionTreeNode;
@property (nonatomic, strong) id<ExpressionTreeNode> rightExpressionTreeNode;

- (BinaryExpressionTreeNode *) initWithOperation: (NSString *)opr;

@end
