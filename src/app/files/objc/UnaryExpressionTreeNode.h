//
//  UnaryExpressionTreeNode.h
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ExpressionTreeNode.h"


@interface UnaryExpressionTreeNode : NSObject <ExpressionTreeNode> 

@property (nonatomic, strong) NSString *operation;
@property (nonatomic, strong) id<ExpressionTreeNode> singleExpressionTreeNode;

- (UnaryExpressionTreeNode *) initWithOperation: (NSString *)opr;

@end
