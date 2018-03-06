//
//  CalcAppDelegate.m
//  Calc
//
//  Created by László Kővári on 2012.01.16..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "CalcAppDelegate.h"

/*
 03/15/2012-14:29
 -added errorDisplay
 -added value check for unary operations
 -added decimal separator check, prevent pressed more than one in a number
 
 03/06/2012-20:18
 -added E for showing error
 -added call of clearAll when exception occurred
 -remove showMessage for catch of equalPressed
 
 03/06/2012-09:41
 -Finalize to add NSDecimalNumber
 -added stringFormattingAsLocaleDependentDecimalNumber, stringReplaceDecimalSeparatorWithDotSeparatorString to CalculatorUtils
 -added Locale dependent decimal separator on display and history
 
 02/26/2012-23:55
 -removed [infixStack pop]
 
 TODO:
 -infinite decimals handling
 -consistent error signalin E vs. press right parenthesis first only
 -rules for prevent idiot operations
 -is zero the default on display?
 -PI use locale dependent decimal separator
 -add Settings with ?
 -add space between numbers and operators in history
 -add E to represent Eror 
 -add horizontal scrollbar to history
 
 
 */
@implementation CalcAppDelegate

@synthesize window = _window;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Override point for customization after application launch.
    return YES;
}
							
- (void)applicationWillResignActive:(UIApplication *)application
{
    /*
     Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
     Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
     */
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    /*
     Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
     If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
     */
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    /*
     Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
     */
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    /*
     Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
     */
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    /*
     Called when the application is about to terminate.
     Save data if appropriate.
     See also applicationDidEnterBackground:.
     */
}

@end
