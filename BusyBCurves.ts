// <!-- Copyright (C) 2017 Richard David Fuhr - All rights reserved. -->
// <!-- richard.fuhr@gmail.com -->

// TODO: Started Mar 03, 2017
// TODO: Mar 03, 2017: Implement a Line class. - DONE
// TODO: Mar 03, 2017: Implement a PolyLine class. - DONE
// TODO: Mar 03, 2017: Implement a Rectangle class. - DEFERRED
// TODO: Mar 05, 2017: Refactor code in PolyLine evaluators - DONE
// TODO: Mar 06, 2017: Refactor code in PolyBezier evaluators - DONE
// TODO: Mar 08, 2017: Change CubicSpline constructor so it is more general (any number of control points and distinct knots and multiplicities) - DONE
// TODO: Mar 08, 2017: Test deBoorTriangleAt: - DONE
// TODO: Mar 08, 2017: Test CubicSpline::positionAtParm - DONE
// TODO: Mar 09, 2017: Need to take a careful look at findSpan when arg is max knot. Look at my Objective-C code. - SORT OF DONE
// TODO: Mar 10, 2017: Implement and test knot insertion for CubicSpline - SORT OF DONE
// TODO: Mar 11, 2017: Implement and test getKnotMultiplicityAtIndex for CubicSpline - DONE
// TODO: Mar 12, 2017: Implement, test, and use getDistinctKnotsAndMultiplicities - DONE
// TODO: Mar 13, 2017: Change the constructor for CubicSpline so that it takes control points and explicit knots, including multiple start and end knots.  Don't do any input checking. - DONE
// TODO: Mar 13, 2017: Implement a clone() function for CubicSpline. - DONE
// TODO: Mar 18, 2017: Implement function that generates array of graphs of cubic B-Splines given knots - DONE
// TODO: Mar 18, 2017: Add a globalMinParm and a globalMaxParm.  For Bezier these are 0.0 and 1.0 but what about for CubicSpline? - DONE
// TODO: Mar 18, 2017: Add a method to the CubicSpline class to draw the interior knots - DONE
// TODO: Mar 20, 2017: Implement and use positionAndDeBoorTriangleFromParm for CubicSpline class - DONE
// TODO: Mar 20, 2017: Implement a radio button set in the HTML file to toggle between Bezier and Spline and implement code in the TS file to respond to it. - DONE
// TODO: Mar 21, 2017: Implement an enumerated type for Bezier and Spline and a global variable that is set to one of these as governed by the radio button. - DONE
// TODO: Mar 21, 2017: Implement drawAllSplineArtifacts and implement the animation code for spline. - IN PROGRESS
// TODO: Mar 24, 2017: Implement a much more elegant way to scale and translate the graphs of the B-Spline basis functions that is actually understandable. - DONE
// TODO: Mar 27, 2017: Implement BCurve class (possibly abstract) from which CubicBezierCurve and CubicSpline are derived and see if we can handle the addEventListener calls using BCurve. - SORT OF DONE
// TODO: Mar 27, 2017: Consider making the main BCurve be a global - DONE
// TODO: Mar 28, 2017: Upload files to https://richardfuhr.neocities.org/BusyBCurves.html and https://richardfuhr.neocities.org/BusyBCurves.js - DONE!!
// TODO: Mar 29, 2017: Call drawAllDeBoorLines and drawAllDeBoorPoints inside drawAllBCurveArtifacts for CubicSpline. - DONE
// TODO: Mar 29, 2017: Continue working on the slider. In particular, have changes in tGlobal be reflected by the slider if user drags point. - DONE
// TODO: Apr 14, 2017: Implement a checkbox labeled Skeleton and when it is checked, draw only the DeCasteljau lines & points or the DeBoor lines & points. - DONE
// TODO: Apr 15, 2017: Separate MakeControlPointTargets and DrawControlPointTargets so that the Skeleton option still lets users click and drag. - DONE
// TODO: Apr 15, 2017: Figure out how to use the Skeleton option without having to reset the curve. - DONE
// TODO: Apr 18, 2017: Update the Help files to explain Skeleton mode. - DONE
// TODO: Apr 18, 2017: Update the Medium document to explain Skeleton mode.
// TODO: Apr 18, 2017: Upload the most recent source code to https://richardfuhr.neocities.org
// TODO: Apr 19, 2017: In the Bezier case, also draw the full-sized control point circles and make them be the targets, as in the Spline case. - DONE
// TODO: Apr 20, 2017: Update the header blocks. - DONE
// TODO: Apr 24, 2017: Draw faint polyline through all control points prior to drawing DeBoor skeleton. - DONE
// TODO: Apr 24, 2017: Add Updated Screen Shots To ~/iCloud Drive/BusyBCurves
// TODO: May 02, 2017: Make editPointOnCurve and editControlPoint be methods of just the BCurve class, since CubicBezier and CubicSpline are same for each - DONE
// TODO: May 06, 2017: Use just one animation function and simplify StartAnimation by using just the BCurve class. - DONE
// TODO: May 07, 2017: Reduce the jitter in the editControlPoint functionality. - DONE
// TODO: May 14, 2017: Make translate and scale be methods of just the BCurve class, since CubicBezier and CubicSpline are same for each. - DONE
// TODO: May 14, 2017: Make drawControlPolygon and drawControlPoints be methods of just the BCurve class, since CubicBezier and CubicSpline are same for each. - DONE
// TODO: May 14, 2017: Make drawControlPointsWithMaxRadius and makeControlPointTargetsWithMaxRadius be methods of just the BCurve class, since CubicBezier and CubicSpline are same for each. - DONE
// TODO: May 15, 2017: Make drawPointOnCurveForParm be a method of just the BCurve class, since CubicBezier and CubicSpline have the same implementation. - DONE
// TODO: Jun 06, 2017: Put a call to clearCanvas inside the implementations of drawAllBCurveArtifacts and remove those calls or calls to clearRect before calling drawAllBCurveArtifacts. - DONE
// TODO: Jun 06, 2017: As a benefit of the immediately previous TODO, remove canvas as a parameter in those functions where it is no longer needed (seems to be just the animation function). - DONE
// TODO: Jun 15, 2017: Only update the PolyBezier curve associated with the CubicSpline curve when it is necessary to do so.  Make it either a global or a data member of CubicSpline. - DONE - then UNDONE
// TODO: Jun 21, 2017: Implement methods to mirror BCurve objects about constant-y and constant-x lines.  Call the appropriate mirror method instead of using inline code. - DONE
// TODO: Aug 16, 2017: Change var to let in all for loops, since that is a better coding style, according to Basarat, and I agree. - DONE
// TODO: Aug 16, 2017: Make sure we set the PolyBezier data member to null for CubicSpline when and only when we need to do that. - DONE - then UNDONE
// TODO: Aug 18, 2017: Rethink whether we really want to implement the PolyBezier equivalent code at all, because the equivalents are always being recomputed for the basis functions. - DONE
// TODO: Aug 18, 2017: Back out the changes involving the PolyBezier equivalent; it was premature optimization. - DONE
// TODO: Aug 19, 2017: Clean up the code in the implementations of drawAllBCurveArtifacts.
// TODO: Sep 08, 2017: Implement a DeCasteljauTriangleAtParm method to complement the DeBoorTriangleAtParm method. - DONE
// TODO: Sep 09, 2017: Test the DeCasteljauTriangleAtParm method. - DONE
// TODO: Sep 11, 2017: Consider adding a keyboard shortcut to launch tests. See /Users/richardfuhr/Documents/Sandbox/javaScriptLearn/MyJavaScriptTests/keyevents.html - DONE
// TODO: Oct 13, 2017: See if there is a way, when using the keyboard shortcut to launch tests, to open up a new tab first. - DONE - window.open() opens new tab but results of doTests() don't go there.
// TODO: Oct 14, 2017: This is really just a test of SourceTree to make sure I see the commit button.
// TODO: Oct 14, 2017: This is another test of SourceTree to make sure I see the commit button.

// Git and GitHub notes.  I opened this file using Visual Studio Community Edition 2017
// and noticed that the following four files were created in this directory, which I
// have put under git and GitHub control.
// drwxr-xr-x@ 3 richardfuhr  staff     102 Mar  7 14:26 BusyBCurves
// -rw-r--r--@ 1 richardfuhr  staff      37 Mar  7 14:22 ProjectSettings.json
// -rw-r--r--@ 1 richardfuhr  staff     117 Mar  7 14:24 VSWorkspaceState.json
// -rw-r--r--@ 1 richardfuhr  staff  126976 Mar  7 14:24 slnx.sqlite
//  where BusyBCurves is a directory that contains the following
//  drwxr-xr-x@ 3 richardfuhr  staff  102 Mar  7 14:27 v15
//  and v15 is a directory that contains the following.
// drwxr-xr-x@ 3 richardfuhr  staff    102 Mar  7 14:27 .
// drwxr-xr-x@ 3 richardfuhr  staff    102 Mar  7 14:26 ..
// -rw-r--r--@ 1 richardfuhr  staff  15360 Mar  7 14:24 .suo
// I suppose I can mainly ignore these, since I will largely be using Visual Studio Code.



// We will implement the functionality from
// ~/Dropbox/Public/RichardFuhr/BusyBezier/BusyBezier.js
// Also, we will reformulate some of my Objective-C BusyBSpline code as TypeScript:
// /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/Resources/BusyBSplineResources

// As of Friday, January 22, 2016 we are also going to place the derived
// file BusyBCurves.js under git control and under GitHub management.
// Adding these comments is done as a test to see how this will appear in
// SourceTree.

// We may use JSDoc as described here.
// https://en.wikipedia.org/wiki/JSDoc


// For the record, here is a list of the variables that I am currently
// using as globals.
// globalPointOnCurveForParmTarget
// globalControlPointTargets
// globalLoop
// tGlobal
// tDeltaGlobal
// globalCircleAreaFactor
// globalCircleRadiusFactor
// globalIndexOfModifiedControlPoint
// globalModifyingPointOnCurve

// I just invoked git rm BusyBCurves.js at about 2:40 PM on 1/23/2016
// Adding these lines is a test to ensure that I no longer will be checking
// in versions of BusyBCurves.js

// I am trying to get SourceTree and git to stop tracking BusyBCurves.js
// This is just a test to see whether it will.

// What seemed to work was to right click on the file, select Stop Tracking,
// and then commit that change.
//
// I am adding this line using alm, just as a test.
// I am adding these lines using alm on Oct 5, 2016 to test whether
// the alm configuration files will be ignored.
// I am doing another test with alm to see whether
// the alm configuration files will be ignored.
// This time I modified .gitignore so that it just has a line
// with .alm in it.
// That didn't work either, so now I have changed .alm to .alm/ in .gitignore
// I did git rm --cached .alm/sessionsV1.json
// I did git rm --cached .alm/sessionsV2.json
// One more test to make sure the .alm files are ignored by git.
//
// Now that Dropbox no longer supports web hosting, I will no longer put my
// updates there for public access.  Instead I am going to be using
// neocities.  Look at https://neocities.org
// In particular, look at http://richardfuhr.neocities.org
// And also look at http://richardfuhr.neocities.org/BusyBCurves.html

// Begin declaring some of the globals

var globalBCurve : BCurve = null;
var globalPointOnCurveForParmTarget : Circle; // cannot be made a const
var globalControlPointTargets : Array<Circle> = new Array();
var tGlobal : number = 0.0; // cannot be made a const
var tDeltaGlobal : number = 0.001; // cannot be made a const
var globalMinParm : number;
var globalMaxParm : number;
const globalCircleAreaFactor : number = 2.0;
const globalCircleRadiusFactor : number = Math.sqrt(globalCircleAreaFactor);
const globalConstPointOnCurveRadius : number = globalCircleRadiusFactor*15.0;
// The following are declared here but are computed in initializeGlobalMetrics().
var globalSumOfControlPointAreas : number; /* = globalCircleAreaFactor*10000.0; */
var globalMaxRadius : number; /* = Math.sqrt(globalSumOfControlPointAreas/Math.PI); */
var globalMaxDiameter : number; /* = 2.0*globalMaxRadius; */
var globalSkeleton : boolean;
var globalControlPointDelta : Point;

var globalGraphsOfCubicBSplineBasisFunctions : CubicSpline[];

//   End declaring some of the globals

// The Point class
class Point
{ // Begin class Point
  // To keep things more readable, I will not start the
  // names of properties with underscores.
  x : number;
  y : number;

  // To keep things more readable, I will use the same names
  // for input parameters in the constructor as the corresponding
  // property names.
  // As a convention, if the class has a constructor, it will appear as
  // the first function after the declaration of the class.

  //////////////////////////////////////////////////////////////////////////////
  // constructor for Point
  // Creates an instance of a Point
  //
  // input: x - the x coordinate of the Point to be constructed
  // input: y - the y coordinate of the Point to be constructed
  //////////////////////////////////////////////////////////////////////////////
  constructor(x : number,
              y : number)
  {
    this.x = x;
    this.y = y;
  }

  // As a convention, if the class has a toString() method, it will appear
  // right after the constructor, if there is a constructor.  Otherwise, it
  // will appear as the first method.

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of Point
  // Returns the string representation of this Point
  //
  // returns: the string representation of this Point
  //////////////////////////////////////////////////////////////////////////////
  toString() :  string
  {
  	return "("+this.x+", "+this.y+")";
  }

  //////////////////////////////////////////////////////////////////////////////
  // norm - method of Point
  // Returns the norm of this Point
  //
  // return: the norm of this Point
  // note: we currently are not creating a separate Vector class
  //////////////////////////////////////////////////////////////////////////////
  norm() : number
  {
    return Math.sqrt((this.x*this.x)+(this.y*this.y));
  }

  //////////////////////////////////////////////////////////////////////////////
  // plus - method of Point
  // Returns the sum of this Point with another Point
  //
  // input: that - a Point to be added to this Point
  // returns: this + that
  //////////////////////////////////////////////////////////////////////////////
  plus(that : Point) : Point
  {
     var x : number = this.x + that.x;
     var y : number = this.y + that.y;
     return new Point(x,y);
  }

  //////////////////////////////////////////////////////////////////////////////
  // minus - method of Point
  // Returns the difference of this Point and another Point
  //
  // input: that - a Point to be subtracted from this Point
  // returns: this - that
  //////////////////////////////////////////////////////////////////////////////
  minus(that : Point) : Point
  {
     var x : number = this.x - that.x;
     var y : number = this.y - that.y;
     return new Point(x,y);
  }

  //////////////////////////////////////////////////////////////////////////////
  // scalarMult - method of Point
  // Returns a scalar multiple of this Point
  //
  // input: s - the scalar factor to be applied to this Point
  // returns: s*this
  //////////////////////////////////////////////////////////////////////////////
  scalarMult(s : number) : Point
  {
     var x : number = s*this.x;
     var y : number = s*this.y;
     return new Point(x,y);
  }

  //////////////////////////////////////////////////////////////////////////////
  // dotProd - method of Point
  // Returns the dot product of this Point with another Point
  //
  // input: that - a Point to be dotted with this Point
  // returns: this*that
  //////////////////////////////////////////////////////////////////////////////
  dotProd(that : Point) : number
  {
     return this.x*that.x + this.y*that.y;
  }

  //////////////////////////////////////////////////////////////////////////////
  // distanceTo - method of Point
  // Returns the distance from this Point to another Point
  //
  // input: that - a Point to which the distance is to be calculated
  // returns: the distance between this Point and that Point
  //////////////////////////////////////////////////////////////////////////////
  distanceTo(that : Point) : number
  {
     var thisMinusThat : Point = this.minus(that);
     var distanceToThat : number = thisMinusThat.norm();
     return distanceToThat;
  }

  //////////////////////////////////////////////////////////////////////////////
  // isEqualWithinToleranceTo - method of Point
  // Determines whether two points are equal within tolerance
  //
  // input: that - a Point that is to be compared to this Point
  // returns: true if this point is equal within tolerance to that point
  //////////////////////////////////////////////////////////////////////////////
  isEqualWithinToleranceTo(that : Point) : boolean
  {
     const pointEqualityTol : number = 0.000001;
     var distanceToThat : number = this.distanceTo(that);
     var equalWithinTolerance : boolean;
     if (distanceToThat < pointEqualityTol)
     {
       equalWithinTolerance = true;
     }
     else
     {
       equalWithinTolerance = false;
     }
     return equalWithinTolerance;
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawCircleHere - method of Point
  // Draws a circle centered at this Point with specified radius and appearance
  //
  // input: radius - the radius of the circle to be drawn
  // input: drawData - an object containing information specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawCircleHere(radius : number,
                 drawData : CircleDrawData,
                 context : CanvasRenderingContext2D)
  {
     drawData.updateContext(context);
     context.beginPath();
     var anticlockwise : boolean = true; // It doesn't really matter for a full circle
     context.arc(this.x, this.y, radius, 0, Math.PI*2, anticlockwise);
     context.fill();
     context.stroke();
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawUnfilledCircleHere - method of Point
  // Draws a circle centered at this Point with specified radius and appearance
  //
  // input: radius - the radius of the circle to be drawn
  // input: drawData - an object containing information specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawUnfilledCircleHere(radius : number,
                       drawData : CircleDrawData,
                        context : CanvasRenderingContext2D)
  {
     drawData.updateContext(context);
     context.beginPath();
     var anticlockwise : boolean = true; // It doesn't really matter for a full circle
     context.arc(this.x, this.y, radius, 0, Math.PI*2, anticlockwise);
     context.stroke();
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawRectangleHere - method of Point
  // Draws a rectangle centered at this Point with specified width, height and appearance
  //
  // input: width - the width of the rectangle to be drawn
  // input: height - the height of the rectangle to be drawn
  // input: drawData - an object containing information specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawRectangleHere(width : number,
                    height : number,
                    drawData : RectangleDrawData,
                    context : CanvasRenderingContext2D)
  {
     drawData.updateContext(context);
     context.beginPath();
     var x : number = this.x - width/2;
     var y : number = this.y - height/2;
     context.rect(x, y, width, height)
     context.fill();
     context.stroke();
  }

  //////////////////////////////////////////////////////////////////////////////
  // isInsideCircle - method of Point
  // Determines whether this Point is inside the given Circle
  //
  // input: C - the Circle used for the containment test.
  // returns: true if this Point is inside C, false otherwise.
  // Note: the code could be made much more compact; in fact, a one-liner.
  //       return(C.containsPoint(this))
  //////////////////////////////////////////////////////////////////////////////
  isInsideCircle(C : Circle) : boolean
  {
     var insideCircle : boolean;
     if (C.containsPoint(this))
     {
       insideCircle = true;
     }
     else
     {
       insideCircle = false;
     }

     return insideCircle;
  }

} // End class Point

// Begin Point utilities.
////////////////////////////////////////////////////////////////////////////////
// linearCombination - utility function for Point (not a method of Point)
// Computes a linear combination of two points
//
// input: a - scalar
// input: P - Point
// input: b - scalar
// input: Q - Point
// returns: a*P + b*Q
////////////////////////////////////////////////////////////////////////////////
function linearCombination(a : number,
                           P : Point,
                           b : number,
                           Q : Point) : Point
{
   var aP : Point = P.scalarMult(a);
   var bQ : Point = Q.scalarMult(b);
   var aPplusbQ : Point = aP.plus(bQ);
   return aPplusbQ;
}
// End Point utilities

// The Circle class.
class Circle
{ // Begin class Circle
  center : Point;
  radius : number;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for Circle
  // Creates an instance of a Circle
  //
  // input: center - the center of the Circle to be constructed
  // input: radius - the radius of the Circle to be constructed
  //////////////////////////////////////////////////////////////////////////////
  constructor(center : Point,
              radius : number)
  {
    this.center = center;
    this.radius = radius;
  }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of Circle
  // Returns the string representation of this Circle
  //
  // returns: the string representation of this Circle
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
  	return "center " + this.center.toString() + "radius = " + this.radius;
  }

  //////////////////////////////////////////////////////////////////////////////
  // containsPoint - method of Circle
  // Determines whether this Circle contains the given Point
  //
  // input: P - the Point used for the containment test.
  // returns: true if P is inside this Circle, false otherwise.
  // Note: the code could be made much more compact; in fact, a one-liner.
  //       return (P.distanceTo(this.center) < this.radius)
  //
  //////////////////////////////////////////////////////////////////////////////
  containsPoint(P : Point) : boolean
  {
    if (P.distanceTo(this.center) < this.radius)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // draw - method of Circle
  // Draws this circle with specified appearance
  //
  // input: drawData - an object containing information specifying appearance
  // input: context - the context associated with the canvas
  //
  //////////////////////////////////////////////////////////////////////////////
  draw(drawData : CircleDrawData,
       context : CanvasRenderingContext2D)
  {
     var center : Point = this.center;
     var radius : number = this.radius;
     center.drawCircleHere(radius, drawData, context);
  }
} // End class Circle

// Note: We could possibly implement a superclass called DrawData and then
// implement CircleDrawData and CurveDrawData as subclasses of DrawData.


class CircleDrawData
{ // Begin class CircleDrawData
  fillColor : string;
  strokeColor : string;
  curveWidth : number;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for CircleDrawData
  // Creates an instance of CircleDrawData
  //
  // input: fillColor - the color with which to fill the Circle
  // input: strokeColor - the color with which to stroke the Circle
  // input: curveWidth - the width of the Circle to be drawn
  //////////////////////////////////////////////////////////////////////////////
  constructor(fillColor : string,
              strokeColor : string,
              curveWidth : number)
  {
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.curveWidth = curveWidth;
  }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of CircleDrawData
  // Returns the string representation of this CircleDrawData
  //
  // returns: the string representation of this CircleDrawData
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
     var stringRep : string = "fillColor = " + this.fillColor;
     stringRep = stringRep + "<p>";
     stringRep = stringRep + "strokeColor = " + this.strokeColor;
     stringRep = stringRep + "<p>";
     var curveWidthString : string;
     curveWidthString = this.curveWidth.toString();
     stringRep = stringRep + "curveWidth = " + curveWidthString;
     return stringRep;
  }

  //////////////////////////////////////////////////////////////////////////////
  // updateContext - method of CircleDrawData
  // Updates the context for the canvas using the data in CircleDrawData
  //
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  updateContext(context :CanvasRenderingContext2D)
  {
     context.fillStyle = this.fillColor;
     context.strokeStyle = this.strokeColor;
     context.lineWidth = this.curveWidth;
  }
} // End class CircleDrawData

class RectangleDrawData
{ // Begin class RectangleDrawData
  fillColor : string;
  strokeColor : string;
  curveWidth : number;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for RectangleDrawData
  // Creates an instance of RectangleDrawData
  //
  // input: fillColor - the color with which to fill the Rectangle
  // input: strokeColor - the color with which to stroke the Rectangle
  // input: curveWidth - the width of the Rectangle to be drawn
  //////////////////////////////////////////////////////////////////////////////
  constructor(fillColor : string,
              strokeColor : string,
              curveWidth : number)
  {
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.curveWidth = curveWidth;
  }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of RectangleDrawData
  // Returns the string representation of this RectangleDrawData
  //
  // returns: the string representation of this RectangleDrawData
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
     var stringRep : string = "fillColor = " + this.fillColor;
     stringRep = stringRep + "<p>";
     stringRep = stringRep + "strokeColor = " + this.strokeColor;
     stringRep = stringRep + "<p>";
     var curveWidthString : string;
     curveWidthString = this.curveWidth.toString();
     stringRep = stringRep + "curveWidth = " + curveWidthString;
     return stringRep;
  }

  //////////////////////////////////////////////////////////////////////////////
  // updateContext - method of RectangleDrawData
  // Updates the context for the canvas using the data in RectangleDrawData
  //
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  updateContext(context :CanvasRenderingContext2D)
  {
     context.fillStyle = this.fillColor;
     context.strokeStyle = this.strokeColor;
     context.lineWidth = this.curveWidth;
  }
} // End class RectangleDrawData


class CurveDrawData
{ // Begin class CurveDrawData
  strokeColor : string;
  curveWidth : number;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for CurveDrawData
  // Creates an instance of CurveDrawData
  //
  // input: strokeColor - the color with which to stroke the Curve
  // input: curveWidth - the width of the Curve to be drawn
  //////////////////////////////////////////////////////////////////////////////
  constructor(strokeColor : string,
              curveWidth : number)
  {
    this.strokeColor = strokeColor;
    this.curveWidth = curveWidth;
  }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of CurveDrawData
  // Returns the string representation of this CurveDrawData
  //
  // returns: the string representation of this CurveDrawData
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
     var stringRep : string = "strokeColor = " + this.strokeColor;
     stringRep = stringRep + "<p>";
     var curveWidthString : string;
     curveWidthString = this.curveWidth.toString();
     stringRep = stringRep + "<p>";
     stringRep = stringRep + "curveWidth = " + curveWidthString;
     return stringRep;
  }

  //////////////////////////////////////////////////////////////////////////////
  // updateContext - method of CurveDrawData
  // Updates the context for the canvas using the data in CurveDrawData
  //
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  updateContext(context :CanvasRenderingContext2D)
  {
     context.strokeStyle = this.strokeColor;
     context.lineWidth = this.curveWidth;
  }
} // End class CurveDrawData

class TextDrawData
{ // Begin class TextDrawData
  fontSpec : string;
  fillColor : string;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for TextDrawData
  // Creates an instance of TextDrawData
  //
  // input: fontSpec - the font with which to draw the text
  // input: fillColor - the color with which to fill the text
  //////////////////////////////////////////////////////////////////////////////
  constructor(fontSpec : string,
              fillColor : string)
  {
    this.fontSpec = fontSpec;
    this.fillColor = fillColor;
  }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of TextDrawData
  // Returns the string representation of this TextDrawData
  //
  // returns: the string representation of this TextDrawData
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
     var stringRep : string = "fontSpec = " + this.fontSpec;
     stringRep = stringRep + "<p>";
     stringRep = stringRep + "fillColor = " + this.fillColor;
     stringRep = stringRep + "<p>";
     return stringRep;
  }

  //////////////////////////////////////////////////////////////////////////////
  // updateContext - method of TextDrawData
  // Updates the context for the canvas using the data in TextDrawData
  //
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  updateContext(context : CanvasRenderingContext2D)
  {
    context.font = this.fontSpec;
    context.fillStyle = this.fillColor;
  }

} //   End class TextDrawData

class BCurveArtifactsDrawData
{ // Begin class BCurveArtifactsDrawData
  forBCurve : CurveDrawData;
  forControlPolygon : CurveDrawData;
  forControlPoints : CircleDrawData;
  forControlPointsWithMaxRadius : CircleDrawData;
  forPointOnCurve : CircleDrawData;
  forIntermediateLines : CurveDrawData;
  forIntermediatePoints : CircleDrawData;
  forGraphOfBasisFunction : CurveDrawData;
  forPointOnGraph : CircleDrawData;
  forVerticalLineFromCurveForParm : CurveDrawData;
  forTextNearPointOnCurve : TextDrawData;
  forTextNearPointOnGraph : TextDrawData;
  forKnots : RectangleDrawData;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for BCurveArtifactsDrawData
  // Creates an instance of BCurveArtifactsDrawData
  //
  // Set each data member to the default value
  //
  //////////////////////////////////////////////////////////////////////////////
  constructor()
  {
    this.forBCurve = defaultDrawDataForBCurve();
    this.forControlPolygon = defaultDrawDataForControlPolygon();
    this.forControlPoints = defaultDrawDataForControlPoints();
    this.forControlPointsWithMaxRadius = defaultDrawDataForControlPointsWithMaxRadius();
    this.forPointOnCurve = defaultDrawDataForPointOnCurve();
    this.forIntermediateLines = defaultDrawDataForIntermediateLines();
    this.forIntermediatePoints = defaultDrawDataForIntermediatePoints();
    this.forGraphOfBasisFunction = defaultDrawDataForGraphOfBasisFunction();
    this.forPointOnGraph = defaultDrawDataForPointOnGraph();
    this.forVerticalLineFromCurveForParm = defaultDrawDataForVerticalLineFromCurveForParm();
    this.forTextNearPointOnCurve = defaultDrawDataForTextNearPointOnCurve();
    this.forTextNearPointOnGraph = defaultDrawDataForTextNearPointOnGraph();
    this.forKnots = defaultDrawDataForKnots();
  }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of BCurveArtifactsDrawData
  // Returns the string representation of this BCurveArtifactsDrawData
  //
  // returns: the string representation of this BCurveArtifactsDrawData
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
    var stringRep : string = "Begin data for this BCurveArtifactsDrawData\n";

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forBCurve";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forBCurve.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forControlPolygon";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forControlPolygon.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forControlPoints";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forControlPoints.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forControlPointsWithMaxRadius";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forControlPointsWithMaxRadius.toString();    

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forPointOnCurve";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forPointOnCurve.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forIntermediateLines";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forIntermediateLines.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forIntermediatePoints";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forIntermediatePoints.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forGraphOfBasisFunction";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forGraphOfBasisFunction.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forPointOnGraph";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forPointOnGraph.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forVerticalLineFromCurveForParm";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forVerticalLineFromCurveForParm.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forTextNearPointOnCurve";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forTextNearPointOnCurve.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forTextNearPointOnGraph";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forTextNearPointOnGraph.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forKnots";
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forKnots.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "End data for this BCurveArtifactsDrawData";
    stringRep = stringRep + "<p>";

    return stringRep;
  }

} //   End class BCurveArtifactsDrawData


// Begin utilities that are used by the CubicBezierCurve class
////////////////////////////////////////////////////////////////////////////////
// doOneDeCasteljauStep - function
// Do one step of the DeCasteljau algorithm
//
// input: P - an array of Points
// input: t - a parameter value
// returns: An array of points resulting from one step of DeCasteljau algorithm
////////////////////////////////////////////////////////////////////////////////
function doOneDeCasteljauStep(P : Array<Point>,
                              t : number) : Array<Point>
{
	// Do one step of the DeCasteljau algorithm
	var s : number = 1.0 - t
	var Q : Array<Point> = new Array();
	var n : number = P.length;
	for (let i = 0; i < n-1; i++)
	{
		Q.push(linearCombination(s, P[i], t, P[i+1]));
	}
	return Q;
}

////////////////////////////////////////////////////////////////////////////////
// doAllDeCasteljauSteps - function
// Do all the steps of the DeCasteljau algorithm
//
// input: P - an array of Points
// input: t - a parameter value
// returns: The point resulting from all steps of DeCasteljau algorithm
////////////////////////////////////////////////////////////////////////////////
function doAllDeCasteljauSteps(P : Array<Point>,
                               t : number) : Point
{
   // Do all steps of the DeCasteljau algorithm
   var n : number = P.length
   if (n < 1)
   {
      return null;
   }
   else
   {
      for (let i = 0; i < n-1; i++)
      {
         P = doOneDeCasteljauStep(P, t); // so we are overwriting P
      }
      return P[0];
   }
}

////////////////////////////////////////////////////////////////////////////////
// drawAllDeCasteljauLines - function
// Draw all the lines of the DeCasteljau algorithm
//
// input: P - an array of Points
// input: t - a parameter value
// input: drawData - an object containing information specifying appearance
// input: context - the context associated with the canvas
// Note: Because of the math of the situation, we know that inside the i-loop
// the array P will be at least of length 2. In previous version of this
// code we checked the length, but we really don't have to, so we removed the
// code that did the checking.
////////////////////////////////////////////////////////////////////////////////
function drawAllDeCasteljauLines(P : Array<Point>,
                                 t : number,
                                 drawData : CurveDrawData,
                                 context : CanvasRenderingContext2D)
{
   var n : number = P.length;
   let ControlPolygon : PolyLine = new PolyLine(P);
   ControlPolygon.draw(drawData, context);
   for (let i = 0; i < n-1; i++)
   {  // begin i-loop
      P = doOneDeCasteljauStep(P, t); // so we are overwriting P
      let DeCasteljauPolyLine : PolyLine = new PolyLine(P);
      DeCasteljauPolyLine.draw(drawData, context);
    }  //  end i-loop
}

////////////////////////////////////////////////////////////////////////////////
// drawAllDeCasteljauPoints - function
// Draw all the points of the DeCasteljau algorithm
//
// input: P - an array of Points
// input: t - a parameter value
// input: drawData - an object containing information specifying appearance
// input: context - the context associated with the canvas
////////////////////////////////////////////////////////////////////////////////
function drawAllDeCasteljauPoints(P : Array<Point>,
                                  t : number,
                                  drawData : CircleDrawData,
                                  context : CanvasRenderingContext2D)
{
   var n : number = P.length;
   for (let k = 0; k < n; k++)
   {
     P[k].drawCircleHere(3.0, drawData, context)
   }
   for (let i = 0; i < n-1; i++)
   {  // begin i-loop
      P = doOneDeCasteljauStep(P, t); // so we are overwriting P
      var m : number = P.length;
      for (let j = 0; j < m; j++)
      {   // begin j-loop
          P[j].drawCircleHere(3.0, drawData, context)
      }   //   end j-loop
   }  //  end i-loop
}

////////////////////////////////////////////////////////////////////////////////
// drawAllDeBoorPoints - function
// Draw all the points of the de Boor algorithm
//
// input: D - a two-dimensional array that is the result of invoking the de Boor algorithm.
// input: drawData - an object containing information specifying appearance
// input: context - the context associated with the canvas
////////////////////////////////////////////////////////////////////////////////
function drawAllDeBoorPoints(D : Point[][],
                             drawData : CircleDrawData,
                             context : CanvasRenderingContext2D)
{
  const degree : number = 3;
  const order : number = degree + 1;
  for (let i = 0; i < order; i++)
  {
    for (let j = i; j < order; j++)
    {
      D[i][j].drawCircleHere(3.0, drawData, context);
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// drawAllDeBoorLines - function
// Draw all the lines (related to the points) of the de Boor algorithm
//
// input: D - a two-dimensional array that is the result of invoking the de Boor algorithm.
// input: drawData - an object containing information specifying appearance
// input: context - the context associated with the canvas
////////////////////////////////////////////////////////////////////////////////
function drawAllDeBoorLines(D : Point[][],
                            drawData : CurveDrawData,
                            context : CanvasRenderingContext2D)
{
  const degree : number = 3;
  const order : number = degree + 1
  for (let i = 0; i < order; i++)
  {
    for (let j = i; j < degree; j++)
    {
      var L : Line = new Line(D[i][j], D[i][j+1])
      L.draw(drawData, context);
    }
  }
}                            

////////////////////////////////////////////////////////////////////////////////
// bezierHodographPoints - function
// Given control points of Bezier curve return control points of its hodograph
//
// input: P - an array of Points that are Bezier control points of curve C
// returns: An array of Points that are control points of hodograph C'
////////////////////////////////////////////////////////////////////////////////
function bezierHodographPoints(P : Array<Point>) : Array<Point>
{
  // Assume we are given a list of points P that are the control
  // points of a Bezier curve C.  We will construct and return a
  // list of points Q for the hodograph of that curve.
  // That is, we will return a list of points Q that are the
  // control points for the Bezier curve C'
  var Q : Array<Point> = new Array();
  var d : number = P.length - 1; // so d can be interpreted as the degree of C
  for (let i = 0; i < d; i++)
  {
     var LinComb = linearCombination(d, P[i+1], -1.0*d, P[i]);
     Q.push(LinComb);
  }

  return Q;
}
//   End utilities that are used by the CubicBezierCurve class

// Begin Bernstein utilities
////////////////////////////////////////////////////////////////////////////////
// binom - function
// Compute a specified binomial coefficient
//
// input: n - an integer
// input: k - an integer
// returns: Binom(n, k)
// note: this implementation does not check whether n and k are reasonable.
////////////////////////////////////////////////////////////////////////////////
function binom(n : number,
               k : number) : number
{
    var  coeff : number = 1;
    for (let i = n-k+1; i <= n; i++) coeff *= i;
    for (let i = 1;     i <= k; i++) coeff /= i;
    return coeff;
}

////////////////////////////////////////////////////////////////////////////////
// bernsteinValue - function
// Computes value of specified Bernstein polynomial at given parameter
//
// input: i - an integer representing the index of the Bernstein polynomial
// input: n - an integer representing the degree of the Bernstein polynomial
// input: t - the parameter at which to evaluate the Bernstein polynomial
// returns: B(i,n,t)
////////////////////////////////////////////////////////////////////////////////
function bernsteinValue(i : number,
                        n : number,
                        t : number) : number
{
   var value : number;
   if ((i < 0) || (i > n))
   {
      value = 0.0;
   }
   else
   {
      value = binom(n,i)*Math.pow(t,i)*Math.pow(1.0-t,n-i);
   }
   return value;
}

////////////////////////////////////////////////////////////////////////////////
// bernsteinDeriv - function
// Computes derivative of specified Bernstein polynomial at given parameter
//
// input: i - an integer representing the index of the Bernstein polynomial
// input: n - an integer representing the degree of the Bernstein polynomial
// input: t - the parameter at which to evaluate the derivative
// returns: B'(i,n,t)
////////////////////////////////////////////////////////////////////////////////
function bernsteinDeriv(i : number,
                        n : number,
                        t : number) : number
{
   var deriv : number = n*(bernsteinValue(i-1,n-1,t) - bernsteinValue(i,n-1,t));
   return deriv;
}

////////////////////////////////////////////////////////////////////////////////
// annotateGraphOfCubicBernstein - function
// Decorate the graph of a cubic Bernstein function with current function value
//
// input: i - the index of the cubic Bernstein function
// input: t - the parameter at which the cubic Bernstein is being evalated
// input: graphOfCubicBernstein: s-->(s, B(i,n)(s))
// input: drawData - an object containing data specifying appearance
// input: context - the context associated with the canvas
////////////////////////////////////////////////////////////////////////////////
function annotateGraphOfCubicBernstein(i : number,
                                       t : number,
                                       graphOfCubicBernstein : CubicBezierCurve,
                                       drawData : TextDrawData,
                                       context : CanvasRenderingContext2D)
{
   const fontSpec : string = 'lighter 45px Sans-Serif';
   var P : Point = graphOfCubicBernstein.positionAtParm(t);
   // Don't assume degree is 3; compute it.
   var degree : number = graphOfCubicBernstein.CtrlPts.length - 1;

   // We still have to evaluate the value of the Bernstein polynomial
   var y : number = bernsteinValue(i, degree, t);
   // If and only if the index i is 3, we will shift the base point of the text
   // to the left so that it is on the other side of the graph
   if (i==3)
   {
      var textWidth : number = context.measureText(t.toFixed(2)).width;
      P.x = P.x - textWidth;
   }
   drawTextForNumber(y, P, drawData, context);
}

////////////////////////////////////////////////////////////////////////////////
// KroneckerDelta - function
// Invoke the Kronecker Delta function on two integers
//
// input: i - an integer
// input: j - an integer
//
// returns: 1 if i equals j
//          0 if i does not equal j
// note: we do not check whether i and j are integers
// note: we use this function in buildGraphOfCubicBernstein
////////////////////////////////////////////////////////////////////////////////
function KroneckerDelta(i : number, j : number) : number
{
   if (i==j)
   {
      return 1;
   }
   else
   {
      return 0;
   }
}


////////////////////////////////////////////////////////////////////////////////
// buildGraphOfCubicBernstein - function
// Construct the graph of a cubic Bernstein polynomial as a 2D curve
//
// input: iCubicBernstein - the index of the cubic Bernstein polynomial
// input: upperLeft -  point at upper left corner of bounding box of graph
// input: width - width of bounding box of graph
// input: height - height of bounding box of graph
//
// returns: graph of the cubic Bernstein function as a CubicBezierCurve
////////////////////////////////////////////////////////////////////////////////
function buildGraphOfCubicBernstein(iCubicBernstein : number,
                                          upperLeft : Point,
                                              width : number,
                                             height : number) : CubicBezierCurve
{
   const degree : number = 3;
   const order : number = degree + 1;
   var Q : Array<Point> = new Array();
   var iPoint : number;
   for (iPoint = 0; iPoint < order; iPoint++)
   {
      var x : number = iPoint/degree;
      var y = 1.0 - KroneckerDelta(iCubicBernstein, iPoint);
      Q[iPoint] = new Point(x,y);
   }

   var graphOfCubicBernstein : CubicBezierCurve =
      new CubicBezierCurve(Q[0], Q[1], Q[2], Q[3]);

    graphOfCubicBernstein.scale(width, height);
    graphOfCubicBernstein.translate(upperLeft);
    return graphOfCubicBernstein;
}
// End Bernstein utilities

abstract class BCurve
{  // Begin class BCurve
  CtrlPts : Array<Point>;
  

  //////////////////////////////////////////////////////////////////////////////
  // editPointOnCurve - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Called when user has clicked the point on this curve and is moving it.
  //
  // input: evt - the mouse event
  // input: drawDataForAllBCurveArtifacts - styles for drawing everything
  // input: context - the context associated with the canvas
  // input: canvas - the canvas on which we are drawing
  //
  // NOTE: to get the updated position of the point on the curve, we are
  // using information about the derivative of the curve, and we are using
  // the linear approximation theorem.  In effect, we are projecting the
  // updated mouse position onto the tangent line to the curve at the previous
  // point, and we use this projected point to get a dt value.  We update the
  // the current parameter, which is called tGlobal, and we use this to redraw
  // this Bezier curve and its associated artifacts.
  //
  // TODO: I think we can get by without passing the canvas as a parameter
  // because we should be able to get it from evt.
  //
  // TODO: We should document in detail how we get the updated position of the
  // point on the curve by using TeX and save the TeX as well as the generated
  // PDF file in this folder and put it under git control.
  //
  //////////////////////////////////////////////////////////////////////////////
  editPointOnCurve(evt : MouseEvent,
                   drawDataForAllBCurveArtifacts : BCurveArtifactsDrawData,
                   context : CanvasRenderingContext2D,
                   canvas : HTMLCanvasElement)
  {
     var P : Point = this.positionAtParm(tGlobal);
     var V : Point = this.derivativeAtParm(tGlobal);
     var M : Point = getMousePos(canvas, evt);
     var vdotv : number = V.dotProd(V);
     var dt : number = 0.0;
     if (vdotv > 0.0)
     {
        dt = ((M.minus(P)).dotProd(V))/vdotv
     }
     tGlobal += dt;
     if (tGlobal < globalMinParm) tGlobal = globalMinParm;
     if (tGlobal > globalMaxParm) tGlobal = globalMaxParm;
     UpdateSliderBasedOnTglobal();

     this.drawAllBCurveArtifacts(drawDataForAllBCurveArtifacts,
                                 context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // editControlPoint - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Called when user has clicked a control point on this curve and is moving it
  //
  // input: evt - the mouse event
  // input: drawDataForAllBCurveArtifacts - styles for drawing everything
  // input: context - the context associated with the canvas
  // input: canvas - the canvas on which we are drawing
  //
  // TODO: I think we can get by without passing the canvas as a parameter
  // because we should be able to get it from evt.
  //
  //////////////////////////////////////////////////////////////////////////////
  editControlPoint(evt : MouseEvent,
                   drawDataForAllBCurveArtifacts : BCurveArtifactsDrawData,
                   context : CanvasRenderingContext2D,
                   canvas : HTMLCanvasElement)
  {
     var mousePos : Point = getMousePos(canvas, evt);
     this.CtrlPts[globalIndexOfModifiedControlPoint] = mousePos.minus(globalControlPointDelta);
 
     this.drawAllBCurveArtifacts(drawDataForAllBCurveArtifacts,
                                 context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // scale - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Scales this BCurve using specified scale factors
  //
  // input: xScale - the scale factor in the x direction
  // input: yScale - the scale factor in the y direction
  //////////////////////////////////////////////////////////////////////////////
  scale(xScale : number,
        yScale : number)
  {
     for (let i = 0; i < this.CtrlPts.length; i++)
     {
        this.CtrlPts[i].x *= xScale;
        this.CtrlPts[i].y *= yScale;
     }
  }

  //////////////////////////////////////////////////////////////////////////////
  // translate - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Traslates this BCurve using specified displacement
  //
  // input: P - specified displacement
  //////////////////////////////////////////////////////////////////////////////
  translate(P : Point)
  {
     for (let i = 0; i < this.CtrlPts.length; i++)
     {
        this.CtrlPts[i].x += P.x;
        this.CtrlPts[i].y += P.y;
     }
  }  

  //////////////////////////////////////////////////////////////////////////////
  // mirrorAboutConstantX - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Mirrors this BCurve about the line x = xConst
  //
  // input: xConst - Mirror this BCurve about the line x = xConst 
  //////////////////////////////////////////////////////////////////////////////
  mirrorAboutConstantX(xConst : number)
  {
    for (let i = 0; i < this.CtrlPts.length; i++)
    {
      var delta : number = xConst - this.CtrlPts[i].x;
      this.CtrlPts[i].x = xConst + delta;
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // mirrorAboutConstantY - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Mirrors this BCurve about the line y = yConst
  //
  // input: yConst - Mirror this BCurve about the line y = yConst 
  //////////////////////////////////////////////////////////////////////////////
  mirrorAboutConstantY(yConst : number)
  {
    for (let i = 0; i < this.CtrlPts.length; i++)
    {
      var delta : number = yConst - this.CtrlPts[i].y;
      this.CtrlPts[i].y = yConst + delta;
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawControlPolygon - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Draws control polygon of this BCurve with specified appearance
  //
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawControlPolygon(drawData : CurveDrawData,
                     context : CanvasRenderingContext2D)
  {
    let ControlPolygon : PolyLine = new PolyLine(this.CtrlPts);
    ControlPolygon.draw(drawData, context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawControlPoints - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Draws control points of this BCurve with specified appearance
  //
  // input: radius - the radius of the circles representing the control points
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawControlPoints(radius : number,
                    drawData : CircleDrawData,
                    context : CanvasRenderingContext2D)
  {
     var controlPoints : Array<Point> = this.CtrlPts;
     var n : number = controlPoints.length;
     for (let i = 0; i < n; i++)
     {
        controlPoints[i].drawCircleHere(radius, drawData, context);
     }
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawControlPointsWithMaxRadius - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Draws control points all with the same radius
  //
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //
  // note: the sum of all the control point areas is now a global const
  //////////////////////////////////////////////////////////////////////////////
  drawControlPointsWithMaxRadius(drawData : CircleDrawData,
                                 context : CanvasRenderingContext2D)
  {
    this.makeControlPointTargetsWithMaxRadius();

    var nTargets : number = globalControlPointTargets.length;

    for (let i : number = 0; i < nTargets; i++)
    {
      var P : Point = globalControlPointTargets[i].center;
      P.drawUnfilledCircleHere(globalMaxRadius, drawData, context);
    }
  } 

  //////////////////////////////////////////////////////////////////////////////
  // makeControlPointTargetsWithMaxRadius - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Makes control point targets all with the same radius
  //
  //
  // note: the sum of all the control point areas is now a global const
  //////////////////////////////////////////////////////////////////////////////
  makeControlPointTargetsWithMaxRadius()
  {
     var controlPoints : Array<Point> = this.CtrlPts;
     var nControlPts : number = controlPoints.length;
     
     for (let i = 0; i < nControlPts; i++)
     {
         globalControlPointTargets[i] = new Circle(controlPoints[i], globalMaxRadius);
     }

  } 

  //////////////////////////////////////////////////////////////////////////////
  // drawPointOnCurveForParm - method of BCurve and used by CubicBezierCurve and CubicSpline
  // Draws point on curve at specified parameter with specified appearance
  //
  // input: t - parameter at which corresponding point is to be drawn
  // input: radius - the radius of the circle representing the point
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawPointOnCurveForParm(t : number,
                          radius : number,
                          drawData : CircleDrawData,
                          context : CanvasRenderingContext2D)
  {
     var P : Point = this.positionAtParm(t);
     P.drawCircleHere(radius, drawData, context);
  }    

 abstract drawAllBCurveArtifacts(drawDataForAllBCurveArtifacts : BCurveArtifactsDrawData,
                        context : CanvasRenderingContext2D) : void;
 
 abstract positionAtParm(t: number) : Point;
 abstract derivativeAtParm(t : number) : Point;
 

}  //   End class BCurve


class CubicBezierCurve extends BCurve
{ // Begin class CubicBezierCurve
 // CtrlPts : Array<Point>; it is a data member in BCurve hence does not need to be also declared here in CubicBezierCurve

  //////////////////////////////////////////////////////////////////////////////
  // constructor for CubicBezierCurve
  // Creates an instance of a CubicBezierCurve
  //
  // input: P0 - the 0th control point
  // input: P1 - the 1st control point
  // input: P2 - the 2nd control point
  // input: P3 - the 3rd control point
  //////////////////////////////////////////////////////////////////////////////
  constructor(P0 : Point,
              P1 : Point,
              P2 : Point,
              P3 : Point)
  {
    super();
    this.CtrlPts = new Array(P0, P1, P2, P3);
  }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of CubicBezierCurve
  // Returns the string representation of this CubicBezierCurve
  //
  // returns: the string representation of this CubicBezierCurve
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
     var stringRep = "Data for Bezier Curve\n";
     var n = this.CtrlPts.length;
     for (let i = 0; i < n; i++)
     {
        stringRep += "<p>"
        stringRep += "CtrlPts[" + i + "] = ";
        stringRep += this.CtrlPts[i].toString();
        stringRep += "</p>";
     }
     return stringRep;
  }

  //////////////////////////////////////////////////////////////////////////////
  // positionAtParm - method of CubicBezierCurve
  // Returns the point on this CubicBezierCurve at the input parameter
  //
  // input: t - parameter at which to get position on this CubicBezierCurve
  // returns: position on this CubicBezierCurve at parameter t
  //////////////////////////////////////////////////////////////////////////////
  positionAtParm(t : number) : Point
  {
     var P : Array<Point> = this.CtrlPts;
     var pos : Point = doAllDeCasteljauSteps(P, t);
     return pos;
  }

  //////////////////////////////////////////////////////////////////////////////
  // derivativeAtParm - method of CubicBezierCurve
  // Returns the derivative of this CubicBezierCurve at the input parameter
  //
  // input: t - parameter at which to get derivative of this CubicBezierCurve
  // returns: derivative of this CubicBezierCurve at parameter t
  //////////////////////////////////////////////////////////////////////////////
  derivativeAtParm(t : number) : Point
  {
     var Q : Array<Point> = bezierHodographPoints(this.CtrlPts);
     var der : Point = doAllDeCasteljauSteps(Q, t);
     return der;
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawCurve - method of CubicBezierCurve
  // Draws this CubicBezierCurve with specified appearance
  //
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawCurve(drawData : CurveDrawData,
            context : CanvasRenderingContext2D)
  {
     drawData.updateContext(context);
     context.beginPath();
     var P : Array<Point> = this.CtrlPts;
     context.moveTo(P[0].x, P[0].y);
     context.bezierCurveTo(P[1].x, P[1].y, P[2].x, P[2].y, P[3].x, P[3].y);
     context.stroke();
  }

 

  //////////////////////////////////////////////////////////////////////////////
  // drawControlPointsWeightedForParm - method of CubicBezierCurve
  // Draws control points with areas proportional to basis function values
  //
  // input: t - the parameter for the basis functions
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //
  // note: the sum of all the control point areas is now a global const
  //////////////////////////////////////////////////////////////////////////////
  drawControlPointsWeightedForParm(t : number,
                                   drawData : CircleDrawData,
                                   context : CanvasRenderingContext2D)
  {
    var controlPointCirclesWeightedForParm : Circle[] = this.getControlPointCirclesWeightedForParm(t);
    var nCircles : number = controlPointCirclesWeightedForParm.length;
    for (let i = 0; i < nCircles; i++)
    {
      controlPointCirclesWeightedForParm[i].draw(drawData, context);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // getControlPointCirclesWeightedForParm - method of CubicBezierCurve
  // Makes control point circles with areas proportional to basis function values
  //
  // input: t - the parameter for the basis functions
  //
  // returns: array of control point circles
  // note: the sum of all the control point areas is now a global const
  //////////////////////////////////////////////////////////////////////////////
  getControlPointCirclesWeightedForParm(t : number) : Circle[]
  {
     var controlPoints : Array<Point> = this.CtrlPts;
     var order : number = controlPoints.length;
     var degree : number = order - 1;
     var controlPointCirclesWeightedForParm : Circle[] = new Array();

     for (let i = 0; i < order; i++)
     {
        var actualArea : number = globalSumOfControlPointAreas*bernsteinValue(i, degree, t);
        // NOTE: actualArea = Math.PI*(actualRadius)^2
        // so actualRadius = sqrt(actualArea/Math.PI)
        var actualRadius : number = Math.sqrt(actualArea/Math.PI);
        controlPointCirclesWeightedForParm[i] = new Circle(controlPoints[i], actualRadius);
     }

     return controlPointCirclesWeightedForParm;
  }

  
  //////////////////////////////////////////////////////////////////////////////
  // drawVerticalLineFromCurveForParm - method of CubicBezierCurve
  // Draw a vertical line from a point on a curve to its local X-axis
  //
  // input: t - parameter that determines point on the curve
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawVerticalLineFromCurveForParm(t : number,
                                   drawData : CurveDrawData,
                                   context :CanvasRenderingContext2D)
  {
     var P : Point = this.positionAtParm(t);
     // Now, we will create a point Q that has the same x coordinate as P and whose
     // y coordinate is equal to the maximum of the y coordinates of the control points
     // of this CubicBezierCurve.  That is because y increases as we go downward.
     var controlPoints : Array<Point> = this.CtrlPts;
     var yMax : number = controlPoints[0].y;
     for (let i = 1; i < controlPoints.length; i++)
     {
        var yCurr : number = controlPoints[i].y;
        if (yMax < yCurr)
        {
           yMax = yCurr;
        }
     }
     var  Q : Point = new Point(P.x, yMax);

     let VerticalLine : Line = new Line(P, Q);
     VerticalLine.draw(drawData, context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawBasisFunctionsWithParm - method of CubicBezierCurve
  // Draw graphs of cubic Bernstein polynomials with a point on each graph
  //
  // input: t - the parameter where we should draw corresponding points
  // input: drawDataForAllBezierArtifacts - - styles for drawing everything
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawBasisFunctionsWithParm(t : number,
                             drawDataForAllBezierArtifacts : BCurveArtifactsDrawData,
                             context: CanvasRenderingContext2D)
  {
     // We will use globalMaxRadius to help position the graphs.

     var delta1 = new Point( 1.0*globalMaxRadius, -1.0*globalMaxRadius);
     var delta2 = new Point(-3.0*globalMaxRadius, -1.0*globalMaxRadius);
     var upperLeft

     for (let indx = 0; indx < 4; indx++)
     {
        if (indx % 2 == 0) // i.e., the even indices
        {
           upperLeft = (this.CtrlPts[indx]).plus(delta1);
        }
        else
        {
           upperLeft = (this.CtrlPts[indx]).plus(delta2);
        }
        var graphOfCubicBernstein = buildGraphOfCubicBernstein(indx,
                                                               upperLeft,
                                                               globalMaxDiameter,
                                                               globalMaxDiameter);

        graphOfCubicBernstein.drawCurve(drawDataForAllBezierArtifacts.forGraphOfBasisFunction, context);

        var pointOnGraphRadius : number = 3.0;

        graphOfCubicBernstein.drawPointOnCurveForParm(t,
                                                      pointOnGraphRadius,
                                                      drawDataForAllBezierArtifacts.forPointOnGraph,
                                                      context);

        graphOfCubicBernstein.drawVerticalLineFromCurveForParm(t,
                                                               drawDataForAllBezierArtifacts.forVerticalLineFromCurveForParm,
                                                               context);

        annotateGraphOfCubicBernstein(indx,
                                      t,
                                      graphOfCubicBernstein,
                                      drawDataForAllBezierArtifacts.forTextNearPointOnGraph,
                                      context);

     }

  }

  //////////////////////////////////////////////////////////////////////////////
  // drawAllBCurveArtifacts - method of CubicBezierCurve
  // Draw all information associated with this CubicBezierCurve
  //
  // input: drawDataForAllBCurveArtifacts - styles for drawing everything
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawAllBCurveArtifacts(drawDataForAllBCurveArtifacts : BCurveArtifactsDrawData,
                         context : CanvasRenderingContext2D) : void
  {
    clearCanvas();
    if (globalSkeleton==false)
    {
     this.drawCurve(drawDataForAllBCurveArtifacts.forBCurve, context);
     this.drawControlPolygon(drawDataForAllBCurveArtifacts.forControlPolygon, context);

     this.drawControlPointsWeightedForParm(tGlobal,
                                           drawDataForAllBCurveArtifacts.forControlPoints,
                                           context);

     this.drawControlPointsWithMaxRadius(drawDataForAllBCurveArtifacts.forControlPointsWithMaxRadius, context);                                            
    }
    else
    {
      this.makeControlPointTargetsWithMaxRadius();
    }

     this.drawPointOnCurveForParm(tGlobal,
                                  globalConstPointOnCurveRadius,
                                  drawDataForAllBCurveArtifacts.forPointOnCurve,
                                  context);

     var pointOnCurve : Point = this.positionAtParm(tGlobal);
     globalPointOnCurveForParmTarget  = new Circle(pointOnCurve, globalConstPointOnCurveRadius);

     if (globalSkeleton==false)
     { 
      

      var textLocation : Point = new Point(pointOnCurve.x, pointOnCurve.y - globalConstPointOnCurveRadius);

      drawTextForNumber(tGlobal,
                        textLocation,
                        drawDataForAllBCurveArtifacts.forTextNearPointOnCurve,
                        context);

       this.drawBasisFunctionsWithParm(tGlobal,
                                       drawDataForAllBCurveArtifacts,
                                       context);
     }

      drawAllDeCasteljauLines(this.CtrlPts,
                              tGlobal,
                              drawDataForAllBCurveArtifacts.forIntermediateLines,
                              context);


      drawAllDeCasteljauPoints(this.CtrlPts,
                               tGlobal,
                               drawDataForAllBCurveArtifacts.forIntermediatePoints,
                               context);
  }
  //////////////////////////////////////////////////////////////////////////////
  // DeCasteljauTriangleAtParm - method of CubicBezierCurve
  // Given a parameter value, generate and return the results of implementing
  // the DeCasteljau algorithm on this cubic Bezier curve with the given parameter value
  //
  // input: t - the parameter value at which to implement the DeCasteljau algorithm.
  //
  // returns: a two-dimensional array that contains the results of implementing
  // the DeCastlejau algorithm at parameter t on this spline. The results could
  // be displayed as a triangle, with the left side being the first column of
  // results and the point at the right vertex being the value of the position
  // evaluated on this curve at parameter t.
  //////////////////////////////////////////////////////////////////////////////
  DeCasteljauTriangleAtParm(t : number) : Point[][]
  {
   // There must be a better way to do this.
   // I have posted a question on Twitter.
   let P : Point = new Point(0,0);
   var D : Point[][] = [
   [P,P,P,P],
   [P,P,P,P],
   [P,P,P,P],
   [P,P,P,P]];

   var i : number;
   var j : number;
   const degree : number = 3;

   for (j = 0; j <= degree; j++)
   {  // Begin j-loop
      D[0][j] = this.CtrlPts[j];
   }  //   End j-loop 

   const s : number = 1.0 - t;
   for (i = 1; i <= degree; i++)
   {   // Begin i-loop
      for (j = i; j <= degree; j++)
      {  // Begin j-loop
         D[i][j] = linearCombination(s, D[i-1][j-1], t, D[i-1][j]);
      }  //   End j-loop
   }   //   End i-loop
   return D; 
  } 
    
} // End class CubicBezierCurve



// Begin Canvas utilities


////////////////////////////////////////////////////////////////////////////////
// getDrawingCanvas
// Get the drawing canvas
//
// returns: the drawing canvas
////////////////////////////////////////////////////////////////////////////////
function getDrawingCanvas() : HTMLCanvasElement
{
   // var document : Document;
   var drawingCanvas : HTMLCanvasElement =
     <HTMLCanvasElement>document.getElementById('drawingCanvas');
   return drawingCanvas;
}

////////////////////////////////////////////////////////////////////////////////
// getDrawingContext
// Get the drawing context
//
// returns: the drawing context
////////////////////////////////////////////////////////////////////////////////
function getDrawingContext() : CanvasRenderingContext2D
{
  var drawingCanvas : HTMLCanvasElement = getDrawingCanvas();
  var drawingContext : CanvasRenderingContext2D = <CanvasRenderingContext2D> drawingCanvas.getContext('2d');
  return drawingContext;
}

////////////////////////////////////////////////////////////////////////////////
// drawTextForNumber - function
// Draw the text representing a given number at a specified location
//
// input: t - The number for which the text is to be drawn
// input: textLocation - the location where the text is to be drawn
// input: drawData - an object containing data specifying appearance
// input: context - the context associated with the canvas
////////////////////////////////////////////////////////////////////////////////
function drawTextForNumber(t : number,
                           textLocation : Point,
                           drawData : TextDrawData,
                           context : CanvasRenderingContext2D)
{
   drawData.updateContext(context);
   context.fillText(t.toFixed(2), textLocation.x, textLocation.y);
}
// End Canvas utilities

// Begin code related to StartAnimation()



////////////////////////////////////////////////////////////////////////////////
// tGlobalUpdate - function
// Change the tGlobal parameter to prepare for the next step in the animation
//
// TODO - Consider ways to reformulate this without the use of global variables
////////////////////////////////////////////////////////////////////////////////
function tGlobalUpdate() // updates the global t
{
   tGlobal = tGlobal + tDeltaGlobal;
   if (tGlobal > globalMaxParm)
   {
      tGlobal = globalMaxParm;
      tDeltaGlobal = -1.0*tDeltaGlobal;
   }
   else
   if (tGlobal < globalMinParm)
   {
      tGlobal = globalMinParm;
      tDeltaGlobal = -1.0*tDeltaGlobal;
   }

   UpdateSliderBasedOnTglobal();
}

function initializeGlobalMetrics()
{
   var canvas : HTMLCanvasElement = getDrawingCanvas();
   globalMaxRadius  = 0.10*canvas.height;
   globalMaxDiameter = 2.0*globalMaxRadius;
   globalSumOfControlPointAreas = Math.PI*globalMaxRadius*globalMaxRadius;  
}

////////////////////////////////////////////////////////////////////////////////
// initializeCubicBezierCurve - function
// Construct CubicBezierCurve in its initial state
//
// returns: a CubicBezierCurve
////////////////////////////////////////////////////////////////////////////////
function initializeCubicBezierCurve() : CubicBezierCurve
{
  globalCurveType = CurveType.Bezier;
  initializeGlobalMetrics();
  UpdateRadioButtonBasedOnGlobalCurveType();
  globalSkeleton = (<HTMLInputElement> document.getElementById("Skeleton")).checked;
   
  var drawingCanvas : HTMLCanvasElement =
    <HTMLCanvasElement>document.getElementById('drawingCanvas');

  var width : number = drawingCanvas.width;
  var height : number = drawingCanvas.height;

  const lowerMargin : number = 0.18;
  const upperMargin : number = 1.0 - lowerMargin;
  const xDelta : number = (upperMargin - lowerMargin)/3.0;
  var P0 : Point = new Point(lowerMargin*width, lowerMargin*height)
  var P1 : Point = new Point(P0.x + xDelta*width, upperMargin*height);
  var P2 : Point = new Point(P1.x + xDelta*width, P0.y);
  var P3 : Point = new Point(upperMargin*width, P1.y);
  var Crv : CubicBezierCurve = new CubicBezierCurve(P0, P1, P2, P3);
  globalMinParm = 0.0;
  globalMaxParm = 1.0;
  globalControlPointTargets = new Array<Circle>(Crv.CtrlPts.length);
  return Crv;
}

////////////////////////////////////////////////////////////////////////////////
// initializeCubicSpline - function
// Construct CubicSpline in its initial state
//
// returns: a CubicSpline
////////////////////////////////////////////////////////////////////////////////
function initializeCubicSpline() : CubicSpline
{
  globalCurveType = CurveType.Spline;
  initializeGlobalMetrics();
  UpdateRadioButtonBasedOnGlobalCurveType();
  globalSkeleton = (<HTMLInputElement> document.getElementById("Skeleton")).checked;
 
  var drawingCanvas : HTMLCanvasElement =
    <HTMLCanvasElement>document.getElementById('drawingCanvas');

  var width : number = drawingCanvas.width;
  var height : number = drawingCanvas.height;

  const lowerMargin : number = 0.18;
  const upperMargin : number = 1.0 - lowerMargin;
  
  
  const degree : number = 3;
  const order : number = degree + 1;
  const nCtrlPts : number = 8;
  const nKts : number = nCtrlPts + order;
  const xDelta : number = (upperMargin - lowerMargin)/(nCtrlPts-1);
  var P : Point[] = new Array<Point>(nCtrlPts);
  P[0] = new Point(lowerMargin*width, lowerMargin*height)
  P[1] = new Point(P[0].x + xDelta*width, upperMargin*height);
  P[2] = new Point(P[1].x + xDelta*width, lowerMargin*height);
  P[3] = new Point(P[2].x + xDelta*width, upperMargin*height);
  P[4] = new Point(P[3].x + xDelta*width, lowerMargin*height);
  P[5] = new Point(P[4].x + xDelta*width, upperMargin*height);
  P[6] = new Point(P[5].x + xDelta*width, lowerMargin*height);
  P[7] = new Point(P[6].x + xDelta*width, upperMargin*height);
  
  var t : number[] = new Array<number>(nKts);
  t[0] = 0.0;
  t[1] = 0.0;
  t[2] = 0.0;
  t[3] = 0.0;
  t[4] = 1.0;
  t[5] = 2.0;
  t[6] = 3.0;
  t[7] = 4.0;
  t[8] = 5.0;
  t[9] = 5.0;
  t[10] = 5.0;
  t[11] = 5.0;
  // Normalize the t so that they go from 0 to 1.
  // This will make the animation  part easier
  // because we can use the same tDeltaGlobal
  // that we were using for Bezier.
  const bot : number = t[t.length-1] - t[0];
  for (let i : number = 0; i < t.length; i++)
  {
    let top = t[i] - t[0];
    t[i] = top/bot;
  }
 
  var Crv : CubicSpline = new CubicSpline(P, t);
  globalMinParm = t[0];
  globalMaxParm = t[t.length-1];
  globalGraphsOfCubicBSplineBasisFunctions = getGraphsOfCubicBSplineBasisFunctions(Crv.ExplicitKnots);
  globalControlPointTargets = new Array<Circle>(Crv.CtrlPts.length);
  return Crv;
}

////////////////////////////////////////////////////////////////////////////////
// clearCanvas - function
// Clear the drawing canvas
//
// Note: For possible efficiency, we will not call the functions
// getDrawingCanvas or getDrawingContext.  Not sure whether that matters though.
// Note: I have replaced calls to this function with inline code that does
// the same thing.
////////////////////////////////////////////////////////////////////////////////
function clearCanvas()
{
  var drawingCanvas : HTMLCanvasElement =
    <HTMLCanvasElement>document.getElementById('drawingCanvas');
  var drawingContext : CanvasRenderingContext2D = <CanvasRenderingContext2D> drawingCanvas.getContext('2d');
  var width : number = drawingCanvas.width;
  var height : number = drawingCanvas.height;
  drawingContext.clearRect(0, 0, width, height);
}

// Begin implementing functions that construct and return draw data.
////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForBCurve - function
// Return the default draw data for the BCurve.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForBCurve() : CurveDrawData
{
  const curveStrokeColor : string = "red";
  const curveWidth : number = 10;
  var drawDataForBCurve : CurveDrawData =
     new CurveDrawData(curveStrokeColor, curveWidth);
  return drawDataForBCurve;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForControlPolygon - function
// Return the default draw data for the control polygon.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForControlPolygon() : CurveDrawData
{
  const lineWidth : number = 5;
  const polygonStrokeColor : string = "black";
  var drawDataForControlPolygon : CurveDrawData =
     new CurveDrawData(polygonStrokeColor, lineWidth);
  return drawDataForControlPolygon;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForControlPoints - function
// Return the default draw data for the control points.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForControlPoints() : CircleDrawData
{
  const controlPointFillColor : string = "blue";
  const controlPointStrokeColor : string = "green";
  const controlPointStrokeWidth : number = 5.0;
  var drawDataForControlPoints : CircleDrawData =
    new CircleDrawData(controlPointFillColor,
                       controlPointStrokeColor,
                       controlPointStrokeWidth);
  return drawDataForControlPoints;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForControlPointsWithMaxRadius - function
// Return the default draw data for the control points with maximum radius.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForControlPointsWithMaxRadius() : CircleDrawData
{
  const controlPointFillColor : string = "white";
  const controlPointStrokeColor : string = "black";
  const controlPointStrokeWidth : number = 1.0;
  var drawDataForControlPointsWithMaxRadius : CircleDrawData =
    new CircleDrawData(controlPointFillColor,
                       controlPointStrokeColor,
                       controlPointStrokeWidth);
  return drawDataForControlPointsWithMaxRadius;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForPointOnCurve - function
// Return the default draw data for the point on the curve.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForPointOnCurve() : CircleDrawData
{
  const pointOnCurveFillColor : string = "yellow";
  const pointOnCurveStrokeColor : string = "black";
  const pointOnCurveStrokeWidth : number = 5.0;
  var drawDataForPointOnCurve : CircleDrawData =
    new CircleDrawData(pointOnCurveFillColor,
                       pointOnCurveStrokeColor,
                       pointOnCurveStrokeWidth);
  return drawDataForPointOnCurve;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForIntermediateLines - function
// Return the default draw data for the Intermediate Lines.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForIntermediateLines() : CurveDrawData
{
  const strokeColor : string = "brown";
  const curveWidth : number = 2;
  var drawDataForIntermediateLines : CurveDrawData = new CurveDrawData(strokeColor, curveWidth);
  return drawDataForIntermediateLines;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForIntermediatePoints - function
// Return the default draw data for the Intermediate Points.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForIntermediatePoints() : CircleDrawData
{
  const fillColor : string = "orange"
  const strokeColor : string = "orange"
  const strokeWidth : number = 5.0;
  var drawDataForIntermediatePoints = new CircleDrawData(fillColor,
                                                            strokeColor,
                                                            strokeWidth);
  return drawDataForIntermediatePoints;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForGraphOfBasisFunction - function
// Return the default draw data for the graphs of the basis functions, which
// include the Bernstein polynomials and the B-Splines.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForGraphOfBasisFunction() : CurveDrawData
{
  const graphStrokeColor : string = "green";
  const graphWidth : number = 2;
  var drawDataForGraphOfBasisFunction : CurveDrawData = new CurveDrawData(graphStrokeColor,
                                                                           graphWidth);
  return drawDataForGraphOfBasisFunction;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForPointOnGraph - function
// Return the default draw data for the point on each graph 
// of the cubic Bernstein polynomials or of the B-spline (basis) functions.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForPointOnGraph() : CircleDrawData
{
  const pointOnGraphFillColor = "black"
  const pointOnGraphStrokeColor = "black"
  const pointOnGraphStrokeWidth = 5.0;
  var drawDataForPointOnGraph = new CircleDrawData(pointOnGraphFillColor,
                                                   pointOnGraphStrokeColor,
                                                   pointOnGraphStrokeWidth);
  return drawDataForPointOnGraph;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForVerticalLineFromCurveForParm - function
// Return the default draw data for the vertical line from the curve for a given parm.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForVerticalLineFromCurveForParm() : CurveDrawData
{
  const lineStrokeColor : string = "black";
  const lineWidth : number = 2;
  var drawDataForVerticalLineFromCurveForParm : CurveDrawData = new CurveDrawData(lineStrokeColor,
                                                                           lineWidth);
  return drawDataForVerticalLineFromCurveForParm;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForTextNearPointOnCurve - function
// Return the default draw data for the text near the point on the main BCurve.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForTextNearPointOnCurve() : TextDrawData
{
  const fontSpec : string = 'lighter 45px Sans-Serif';
  const fillColor = "black";
  var drawDataForTextNearPointOnCurve : TextDrawData = new TextDrawData(fontSpec, fillColor);
  return drawDataForTextNearPointOnCurve;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForTextNearPointOnGraph - function
// Return the default draw data for the text near the points on graphs of the basis functions.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForTextNearPointOnGraph() : TextDrawData
{
  const fontSpec : string = 'lighter 45px Sans-Serif';
  const fillColor = "black";
  var drawDataForTextNearPointOnGraph : TextDrawData = new TextDrawData(fontSpec, fillColor);
  return drawDataForTextNearPointOnGraph;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForKnots - function
// Return the default draw data for the knots.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForKnots() : RectangleDrawData
{
  const knotFillColor : string = "black";
  const knotStrokeColor : string = "black";
  const knotStrokeWidth : number = 5.0;
  var drawDataForKnots : RectangleDrawData =
    new RectangleDrawData(knotFillColor,
                       knotStrokeColor,
                       knotStrokeWidth);
  return drawDataForKnots;
}


//   End implementing functions that construct and return draw data.

////////////////////////////////////////////////////////////////////////////////
// animation - function
// Manage the animation in which a point moves back and forth along a BCurve,
// and in which the size of the control points and the indicators on the graphs
// of the basis functions vary accordingly.  One call to this function generates
// one frame of the animation.
//
// input: drawingContext - the context associated with the canvas
// input: C - the main BCurve
// input: drawDataForAllBCurveArtifacts - styles for drawing everything
//
////////////////////////////////////////////////////////////////////////////////
function animation(drawingContext : CanvasRenderingContext2D,
                   C : BCurve,
                   drawDataForAllBCurveArtifacts : BCurveArtifactsDrawData)
{
   tGlobalUpdate(); // the global value of t is adjusted

   C.drawAllBCurveArtifacts(drawDataForAllBCurveArtifacts,
                            drawingContext);
}

////////////////////////////////////////////////////////////////////////////////
// DisableEnableButtons - function
// Disable and enable specified buttons
//
// input: startAnimationButtonDisabled - disable if true, enable if false
// input: stopAnimationButtonDisabled - disable if true, enable if false
// input: ResetCurveButtonDisabled - disable if true, enable if false
////////////////////////////////////////////////////////////////////////////////
function DisableEnableButtons(startAnimationButtonDisabled : boolean,
                              stopAnimationButtonDisabled : boolean,
                              ResetCurveButtonDisabled : boolean)
{
   var startAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StartAnimation");
   var stopAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StopAnimation");
   var ResetCurveButton : HTMLInputElement = <HTMLInputElement>document.getElementById("ResetCurve");
   startAnimationButton.disabled = startAnimationButtonDisabled;
   stopAnimationButton.disabled = stopAnimationButtonDisabled;
   ResetCurveButton.disabled = ResetCurveButtonDisabled;
}

////////////////////////////////////////////////////////////////////////////////
// DisableRadioButtons - function
// Disable the radio buttons that allow the user to specify the curve type.
//
////////////////////////////////////////////////////////////////////////////////
function DisableRadioButtons()
{
    var curvetypes = document.getElementsByName('curvetype')
    var n = curvetypes.length;
    for (let i : number = 0; i < n; i++)
    {
        var curItem : HTMLInputElement = <HTMLInputElement> curvetypes[i];
        curItem.disabled = true;
    }   
}

////////////////////////////////////////////////////////////////////////////////
// EnableRadioButtons - function
// Enable the radio buttons that allow the user to specify the curve type.
//
////////////////////////////////////////////////////////////////////////////////
function EnableRadioButtons()
{
    var curvetypes = document.getElementsByName('curvetype')
    var n = curvetypes.length;
    for (let i : number = 0; i < n; i++)
    {
        var curItem : HTMLInputElement = <HTMLInputElement> curvetypes[i];
        curItem.disabled = false;
    }   
}

////////////////////////////////////////////////////////////////////////////////
// Note:  It would be nice if we could replace globalLoop with a non-global, but that
// may not be possible  From experimentation, it seems that globalLoop is an integer
// that gets incremented by 1 each time that setInterval is called, with the first
// value seen (after calling setInterval the first time) being 1.
var globalLoop : number; //used by StartAnimation and StopAnimation


//////////////////////////////////////////////////////////////////////////////
// StartAnimation - function
// Enable and disable the appropriate buttons and set the animation interval.
// Initialize the data to be passed to the function that generates each frame
// of the animation.
////////////////////////////////////////////////////////////////////////////////
function StartAnimation()
{
  var startAnimationButtonDisabled: boolean = true;
  var stopAnimationButtonDisabled: boolean = false;
  var ResetCurveButtonDisabled: boolean = true;
  DisableEnableButtons(startAnimationButtonDisabled, stopAnimationButtonDisabled, ResetCurveButtonDisabled);
  DisableRadioButtons();

  var drawingCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('drawingCanvas');
  var drawingContext: CanvasRenderingContext2D = <CanvasRenderingContext2D>drawingCanvas.getContext('2d');

  var drawDataForAllBezierArtifacts: BCurveArtifactsDrawData = new BCurveArtifactsDrawData();

  globalLoop = setInterval(animation,
                           10,
                           drawingContext,
                           globalBCurve, 
                           drawDataForAllBezierArtifacts);      
}


//   End code related to StartAnimation()


// Begin code related to StopAnimation()
////////////////////////////////////////////////////////////////////////////////
// StopAnimation - function
// Clear the animation interval and reenable and disable the appropriate buttons
////////////////////////////////////////////////////////////////////////////////
function StopAnimation()
{
   var startAnimationButtonDisabled : boolean = false;
   var stopAnimationButtonDisabled : boolean = true;
   var ResetCurveButtonDisabled : boolean = false;
   DisableEnableButtons(startAnimationButtonDisabled, stopAnimationButtonDisabled, ResetCurveButtonDisabled);
   EnableRadioButtons();

   clearInterval(globalLoop);
}
//   End code related to StopAnimation()

// Begin code related to ResetCurve()
var globalIndexOfModifiedControlPoint : number = -1;
// -1 means none is being modified.
var globalModifyingPointOnCurve : boolean = false;

////////////////////////////////////////////////////////////////////////////////
// getMousePos - function
// Get current position of mouse in terms of canvas coordinates
//
// input: canvas - the canvas on which we are drawing
// input: evt - the mouse event
// returns: current position of mouse in terms of canvas coordinates
////////////////////////////////////////////////////////////////////////////////
function getMousePos(canvas : HTMLCanvasElement,
                     evt : MouseEvent) : Point
{
	var rect : ClientRect = canvas.getBoundingClientRect();
	var x : number = evt.clientX - rect.left;
	var y : number = evt.clientY - rect.top;
	var mousePos : Point = new Point(x,y);
	return mousePos;
}

////////////////////////////////////////////////////////////////////////////////
// onMouseDown - callback function
// This is called in reponse to a mousedown event detected by the canvas
//
// input: evt - the mouse event at the time of mousedown
// input: theCanvas - canvas on which we are drawing
//
//
////////////////////////////////////////////////////////////////////////////////
function onMouseDown(evt : MouseEvent,
                     theCanvas : HTMLCanvasElement)
{
   var mousePos : Point = getMousePos(theCanvas, evt);

   globalIndexOfModifiedControlPoint = -1;

   if (mousePos.isInsideCircle(globalPointOnCurveForParmTarget))
   {
      globalModifyingPointOnCurve = true;
      globalIndexOfModifiedControlPoint = -1;
   }
   else for (let i = 0; i < globalControlPointTargets.length; i++)
   {
         if(mousePos.isInsideCircle(globalControlPointTargets[i]))
         {
            globalIndexOfModifiedControlPoint = i;
            globalModifyingPointOnCurve = false;
            var selectedControlPoint : Point = globalControlPointTargets[i].center;
            globalControlPointDelta = mousePos.minus(selectedControlPoint);
            break;
         }
   }
}

////////////////////////////////////////////////////////////////////////////////
// onMouseMove - callback function
// This is called in response to a mousemove event detected by the canvas
//
// input: evt - the mouse event
// input: C - the BCurve
// input: drawDataForAllBCurveArtifacts - styles for drawing everything
// input: drawingContext - the context associated with the canvas
// input: drawingCanvas - the canvas on which we are drawing
///////////////////////////////////////////////////////////////////////////////
function onMouseMove(evt : MouseEvent,
                     C : BCurve,
                     drawDataForAllBCurveArtifacts : BCurveArtifactsDrawData,
  					         drawingContext : CanvasRenderingContext2D,
					           drawingCanvas : HTMLCanvasElement)
{
	if (globalModifyingPointOnCurve==true)
	{
	   C.editPointOnCurve(evt,
                        drawDataForAllBCurveArtifacts,
						            drawingContext,
						            drawingCanvas);
	}
	else if (globalIndexOfModifiedControlPoint > -1)
	{
	   C.editControlPoint(evt,
                        drawDataForAllBCurveArtifacts,
						            drawingContext,
						            drawingCanvas);
	}
	else
	{
	   // for now; do nothing
	}
}

////////////////////////////////////////////////////////////////////////////////
// onMouseUp - callback function
// This is called in reponse to a mouseup event detected by the canvas
//
// TODO - this function now references some globals; change them to
//        parameters in a future implementation.
///////////////////////////////////////////////////////////////////////////////
function onMouseUp()
{
   if(globalModifyingPointOnCurve==true)
   {
      globalModifyingPointOnCurve = false;
   }
   else if (globalIndexOfModifiedControlPoint > -1)
   {
      globalIndexOfModifiedControlPoint = -1;
   }
}

////////////////////////////////////////////////////////////////////////////////
// onKeyDown - callback function
// This is called in reponse to a keydown event detected by the canvas
// input: evt - the keyboard event
///////////////////////////////////////////////////////////////////////////////
function onKeyDown(evt : KeyboardEvent)
{
  const keyName : string = evt.key;
  if (keyName==='t')
  {
       doTests();
  }
}

////////////////////////////////////////////////////////////////////////////////
// touchHandler - callback function
// This is called response to touchstart, touchmove, and touchend.
//
// input: event - a touch event
// See http://stackoverflow.com/questions/5186441
//           /javascript-drag-and-drop-for-touch-devices/6362527#6362527
// Note: This function needs to be rewritten, because the method
// initMouseEvent has been deprecated according to
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
//
// The above-referenced web page says the following about initMouseEvent.
// This feature has been removed from the Web standards.
// Though some browsers may still support it, it is in the proecess of being
// dropped. Do not use it in old or new projects. Pages or Web apps using it
// may break at any time.
// The above-referenced web page goes on to say the following.
// Instead use specific event constructors, like MouseEvent().
// The page on creating and triggering events gives more information
// about the way to use these.
// Do a Google search for "touch events" "mouse events"
// Study: http://www.html5rocks.com/en/mobile/touchandmouse/
////////////////////////////////////////////////////////////////////////////////
function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();

}

////////////////////////////////////////////////////////////////////////////////
// ResetCurve - function
// Constructs the curve and declares callbacks for exploring with the mouse.
//
// TODO - There is a refactoring opportunity for constructing the curve.
// TODO - Look for other refactoring opportunities
// Note: This function is called when user clicks Reset Curve button
////////////////////////////////////////////////////////////////////////////////
function ResetCurve()
{  // Begin function ResetCurve
   var drawingCanvas : HTMLCanvasElement =
     <HTMLCanvasElement>document.getElementById('drawingCanvas');
   var drawingContext : CanvasRenderingContext2D = <CanvasRenderingContext2D> drawingCanvas.getContext('2d');

   if (globalCurveType==CurveType.Bezier)
   {
     globalBCurve = initializeCubicBezierCurve();
   }
   else
   if (globalCurveType==CurveType.Spline)
   {
     globalBCurve = initializeCubicSpline();
   }

   var drawDataForAllBCurveArtifacts : BCurveArtifactsDrawData = new BCurveArtifactsDrawData();

   tGlobal = 0.25; 
   UpdateSliderBasedOnTglobal();

   globalBCurve.drawAllBCurveArtifacts(drawDataForAllBCurveArtifacts, drawingContext);
   

      drawingCanvas.addEventListener('mousedown', function(evt)
         {
            onMouseDown(evt,
                        drawingCanvas);
         }, false);

      drawingCanvas.addEventListener('mousemove', function(evt)
         {
            onMouseMove(evt,
                        globalBCurve,
                        drawDataForAllBCurveArtifacts,
                        drawingContext,
                        drawingCanvas);
         }, true);

      drawingCanvas.addEventListener('mouseup', function(evt)
         {
            onMouseUp();
         }, false);

      document.addEventListener('keydown', function(evt)  
         {
           onKeyDown(evt);
         }, true);

// Begin adding code based on
// http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices/6362527#6362527
    drawingCanvas.addEventListener("touchstart", touchHandler, true);
    drawingCanvas.addEventListener("touchmove", touchHandler, true);
    drawingCanvas.addEventListener("touchend", touchHandler, true);
//   End adding code based on
// http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices/6362527#6362527
}  // End function ResetCurve

//   End code related to ResetCurve()

enum CurveType {Bezier, Spline};

var globalCurveType : CurveType;


////////////////////////////////////////////////////////////////////////////////
// UpdateRadioButtonBasedOnGlobalCurveType - function
// Change the relevant radio buttons' checked status based on value of globalCurveType
//
////////////////////////////////////////////////////////////////////////////////
function UpdateRadioButtonBasedOnGlobalCurveType()
{
    var curvetypes = document.getElementsByName('curvetype')
    var n = curvetypes.length;
    for (let i : number = 0; i < n; i++)
    {
        var curItem : HTMLInputElement = <HTMLInputElement> curvetypes[i];
        if (globalCurveType==CurveType.Bezier && curItem.value=="Bezier")
        {
          curItem.checked=true;
          break;
        }
        else if (globalCurveType==CurveType.Spline && curItem.value=="Spline")
        {
          curItem.checked=true;
          break;
        }
    } 
}

////////////////////////////////////////////////////////////////////////////////
// UpdateGlobalCurveTypeBasedOnRadioButton - function
// Change the value of globalCurveType based on the relevant radio buttons' checked status
//
////////////////////////////////////////////////////////////////////////////////
function UpdateGlobalCurveTypeBasedOnRadioButton()
{
    var curvetypes = document.getElementsByName('curvetype')
    var n = curvetypes.length;
    for (let i : number = 0; i < n; i++)
    {
        var curItem : HTMLInputElement = <HTMLInputElement> curvetypes[i];
        if (curItem.checked)
        {
            if (curItem.value=="Bezier")
            {
                globalCurveType = CurveType.Bezier;
                ResetCurve(); 
                break;
            }
            else if (curItem.value=="Spline")
            {
                globalCurveType = CurveType.Spline;
                ResetCurve();
                break;
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// UpdateGlobalSkeletonBasedOnCheckBox - function
// Change the value of globalSkeleton based on the relevant check box's checked status
//
////////////////////////////////////////////////////////////////////////////////
function UpdateGlobalSkeletonBasedOnCheckBox()
{
  var Skeleton : HTMLInputElement = <HTMLInputElement> document.getElementById("Skeleton");
  if (Skeleton.checked==true)
  {
    globalSkeleton = true;
  }
  else
  {
    globalSkeleton = false;
  }
}

////////////////////////////////////////////////////////////////////////////////
// HandleCurveTypeRadioButtonChange - function
// This is just a cover routine for UpdateGlobalCurveTypeBasedOnRadioButton
//
////////////////////////////////////////////////////////////////////////////////
function HandleCurveTypeRadioButtonChange()
{
  UpdateGlobalCurveTypeBasedOnRadioButton();
}

////////////////////////////////////////////////////////////////////////////////
// HandleSkeletonCheckBoxChange - function
// This updates the value of globalSkeleton and it redraws everything according
// to the new value that appears in the check box.
//
////////////////////////////////////////////////////////////////////////////////
function HandleSkeletonCheckBoxChange()
{
  UpdateGlobalSkeletonBasedOnCheckBox();
  var context : CanvasRenderingContext2D = getDrawingContext();
  var drawDataForAllBCurveArtifacts : BCurveArtifactsDrawData = new BCurveArtifactsDrawData();

  globalBCurve.drawAllBCurveArtifacts(drawDataForAllBCurveArtifacts, context);
}

////////////////////////////////////////////////////////////////////////////////
// UpdateSliderBasedOnTglobal - function
// Change the setting on the parameter range slider based on the value of tGlobal
//
////////////////////////////////////////////////////////////////////////////////
function UpdateSliderBasedOnTglobal()
{
  var ParameterRangeSlider : HTMLInputElement = <HTMLInputElement> document.getElementById("ParameterRange");
  var min : number = +ParameterRangeSlider.min;
  var max : number = +ParameterRangeSlider.max;
  var val : number = tGlobal*(max - min) + min;

  ParameterRangeSlider.value = val.toString();
}


////////////////////////////////////////////////////////////////////////////////
// UpdateTglobalBasedOnSlider - function
// Change the value of tGlobal based on the setting of the parameter range slider
//
////////////////////////////////////////////////////////////////////////////////
function UpdateTglobalBasedOnSlider()
{
  var ParameterRangeSlider : HTMLInputElement = <HTMLInputElement> document.getElementById("ParameterRange");
  var min : number = +ParameterRangeSlider.min;
  var max : number = +ParameterRangeSlider.max
  var val : number = +ParameterRangeSlider.value;
 
  tGlobal = (val - min)/(max - min);
}




////////////////////////////////////////////////////////////////////////////////
// HelpInTheFormOfAWebPage - function
// Display the appropriate web page containing help, depending upon the value
// of globalCurveType.
//
////////////////////////////////////////////////////////////////////////////////
function HelpInTheFormOfAWebPage()
{
  if (globalCurveType==CurveType.Bezier)
  {
    window.open("BezierHelp.html");
  }
  else
  if (globalCurveType==CurveType.Spline)
  {
    window.open("SplineHelp.html");
  }
}


// Begin code to support BusyBSpline

// Begin utilities that can be used by PolyBezier and CubicSpline objects

////////////////////////////////////////////////////////////////////////////////
// BinarySearchSortedArray - function
// Given a number t and an array a of non-decreasing numbers, find the largest
// index i such that a[i] <= t < a[i+1].
//
// input: i - a number
// input: a - a sorted array (we do NOT check inside this function whether a is sorted)
//
// returns the largest index i such that a[i] <= t < a[i+1]
// with the following exceptions...
////////////////////////////////////////////////////////////////////////////////
function BinarySearchSortedArray(t : number,
                                 a : Array<number>) : number
{
  var bottom : number = 0;
  var top : number = a.length - 1;

  while (top > bottom + 1)
  { // begin while (top > bottom + 1)
    var mid = Math.floor((top+bottom)/2);
    if (t >= a[mid])
    {
      bottom = mid;
    }
    else
    {
      top = mid;
    }
  } //   end while (top > bottom + 1)

  return bottom;
}

// Objective-C Code from
// /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/Resources/BusyBSplineResources/SplineUtilities.m
// commented out, so this will compile.
// The goal is to implement a TypeScript version right below it.

// +(void)deBoorTriangleAt:(float)t
// 			  SpanIndex:(int)ispan
// 				 Degree:(int)degree
// 			 lastColumn:(int)itop
// 				  Knots:(float *)kt
// 				  Coefs:(float *)pt
// 			   Triangle:(float[MAXORDER][MAXORDER])D
// /*---------------------------------------------------------------------$
//  $ DESCRIPTION: Given a parameter value, span index, degree, knot       $
//  $              sequence and B-spline coefficients, perform the         $
//  $              Cox - de Boor evaluation algorithm and return the       $
//  $              entire triangle of values that get computed.            $
//  $                                                                      $
//  $ ACCESS PATH: Internal and External                                   $
//  $                                                                      $
//  $ WRITTEN BY:  Richard Fuhr, June 2010                                 $
//  $                                                                      $
//  $ MODIFICATIONS: None                                                  $
//  $                                                                      $
//  $ INPUT PARAMETERS:   t - parameter at which to evaluate               $
//  $                 ispan - span index of t in terms of kt               $
//  $                degree - the degree of the B-splines on kt            $
//  $                  itop - the index of the last column to compute      $
//  $                         Normally, itop = degree - mult, where mult   $
//  $                         is the multiplicity of t (which may be 0)    $
//  $                    kt - the knot sequence                            $
//  $                    pt - the B-spline coefficients                    $
//  $                                                                      $
//  $ OUTPUT PARAMETERS:  D - the triangle of values which arise from      $
//  $                         the Cox - de Boor evaluation algorithm.      $
//  $                                                                      $
//  $ ERROR EXITS:  None                                                   $
//  $                                                                      $
//  $ METHOD: Perform the Cox - de Boor algorithm, but don't overwrite any $
//  $         of the array values.                                         $
//  $                                                                      $
//  $---------------------------------------------------------------------*/
// {
// 	int j,m;
// 	double a,abar;

// 	for (j = 0; j <= itop; j++)
// 		D[0][j] = pt[ispan-degree+j];

// 	for (m = 1; m <= itop; m++)
// 		for (j = m; j <= itop; j++)
// 		{
// 			a = (t - kt[ispan + j -degree])/(kt[ispan + j + 1 -m] - kt[ispan + j -degree]);
// 			abar = 1.0 - a;
// 			D[m][j] = a*D[m-1][j] + abar*D[m-1][j-1];
// 		}
// }

function DeBoorTriangleAt(t : number,
                          ispan : number,
                          degree : number,
                          itop : number,
                          kt : number[],
                          pt : Point[]) : Point[][]
 {
   var j : number;   // a loop index
   var m : number;   // a loop index
   var a : number;   // one of the scalar multipliers
   var abar : number // one of the scalar multipliers
   // There must be a better way to do this.
   // I have posted a question on Twitter.
   let P : Point = new Point(0,0);
   var D : Point[][] = [
   [P,P,P,P],
   [P,P,P,P],
   [P,P,P,P],
   [P,P,P,P]];

  // const order : number = 4;
  // /*let D : Point[][] = new Array(new Array()); // Does not work*/
  // var D: Point[][] = new Array(new Array(order*order)); // Does not work

   for (j = 0; j <= itop; j++)
   {  // Begin j-loop
      D[0][j] = pt[ispan-degree+j];
   }  //   End j-loop

   for (m = 1; m <= itop; m++)
   {   // Begin m-loop
       for (j = m; j <= itop; j++)
       {   // Begin j-loop
           a = (t - kt[ispan + j -degree])/(kt[ispan + j + 1 -m] - kt[ispan + j -degree]);
           abar = 1.0 - a;
           D[m][j] = linearCombination(a, D[m-1][j], abar, D[m-1][j-1]);
       }   //   End j-loop
   }   //   End m-loop

   return D;
 }

////////////////////////////////////////////////////////////////////////////////
// getGraphsOfCubicSplineBasisFunctions - function
// Given a knot sequence that defines a vector space of cubic splines, return
// an array of cubic splines that represents the graphs of the basis functions
// for the vector space of cubic splines determined by the knots.
//
// input: knots : an array of numbers that specifies the explicit knots
//
// returns : an array of CubicSpline objects that represents the graphs of the
// basis functions for the vector space of cubic splines determined by knots.
////////////////////////////////////////////////////////////////////////////////
 function getGraphsOfCubicBSplineBasisFunctions(knots : number[]) : CubicSpline[]
{
  const degree : number = 3;
  const nKts : number = knots.length;
  const nCtrlPts : number = nKts - degree - 1;
  var GraphsOfCubicBSplineBasisFunctions : CubicSpline[] = new Array<CubicSpline>(nCtrlPts);
  var iBasis : number;
  var jCtrlPt : number;
  var x : number[] = new Array(nCtrlPts);
  for (jCtrlPt = 0; jCtrlPt < nCtrlPts; jCtrlPt++)
  {
    x[jCtrlPt] = knots[jCtrlPt + 1] + knots[jCtrlPt + 2] + knots[jCtrlPt + 3];
    x[jCtrlPt] = x[jCtrlPt]/degree;
  }
  for (iBasis = 0; iBasis < nCtrlPts; iBasis++)
  {
    var CtrlPts : Point[] = new Array<Point>(nCtrlPts);
    for (jCtrlPt = 0; jCtrlPt < nCtrlPts; jCtrlPt++)
    {
      var y = KroneckerDelta(iBasis, jCtrlPt)
      CtrlPts[jCtrlPt] = new Point(x[jCtrlPt],y);
    }
    var CurrGraphOfBasisFunction : CubicSpline = new CubicSpline(CtrlPts, knots);
    GraphsOfCubicBSplineBasisFunctions[iBasis] = CurrGraphOfBasisFunction;
  }
  return GraphsOfCubicBSplineBasisFunctions;
}

////////////////////////////////////////////////////////////////////////////////
// alignBSplineGraphWithCorrespondingControlPointCircle - function
// Align the graph of a B-spline with its corresponding control point circle.
//
// input - the index of the B-spline, which is also the index of its corresponding
// control point circle.
//
// returns: a CubicSpline object that is the graph of the B-spline that has
// been aligned with its corresponding control point circle.
////////////////////////////////////////////////////////////////////////////////
function alignBSplineGraphWithCorrespondingControlPointCircle(basisIndex : number) : CubicSpline
{
  var alignedBSplineGraph : CubicSpline = null;
  // Do validity checks
  let validInput : boolean = true; // innocent until proven guilty
  if (globalGraphsOfCubicBSplineBasisFunctions.length!=globalControlPointTargets.length)
  {
    validInput = false;
    return alignedBSplineGraph;
  }

  let nControlPointTargets : number = globalControlPointTargets.length;

  if ((basisIndex < 0) || (basisIndex >= nControlPointTargets))
  {
    validInput = false;
    return alignedBSplineGraph;
  }

  if (validInput==true)
  {  // begin case of valid input
    alignedBSplineGraph = globalGraphsOfCubicBSplineBasisFunctions[basisIndex].clone();
    var CorrespondingControlPointCircle : Circle = globalControlPointTargets[basisIndex];

    // Reflect the graph about the line y = 0.5 because the positive direction is downward
    // Old code was as follows
    // for (let i : number = 0; i < alignedBSplineGraph.CtrlPts.length; i++)
    // {
    //   alignedBSplineGraph.CtrlPts[i].y = 1.0 - alignedBSplineGraph.CtrlPts[i].y;
    // }
    // New code is as follows
    const yConst : number = 0.5;
    alignedBSplineGraph.mirrorAboutConstantY(yConst);

    // Scale the alignedBSplineGraph

    var radius : number = CorrespondingControlPointCircle.radius;
    var diameter : number = 2.0*radius;

    var BoundingBoxOfUnscaledBSplineGraph : Rectangle = alignedBSplineGraph.getBoundingBox();

    const scaleFac : number = 1.5;
    var xScale : number = scaleFac*radius/BoundingBoxOfUnscaledBSplineGraph.width;
    var yScale : number = diameter/BoundingBoxOfUnscaledBSplineGraph.height;

    alignedBSplineGraph.scale(xScale, yScale);
   
   // Now translate the alignedBSplineGraph so that the lower left corner of its bounding box
   // coincides with the lower right corner of the bounding box of the CorrespondingControlPointCircle.

   var BoundingBoxOfScaledBSplineGraph : Rectangle = alignedBSplineGraph.getBoundingBox();
   var x0 : number = BoundingBoxOfScaledBSplineGraph.xMin;
   var y0 : number = BoundingBoxOfScaledBSplineGraph.yMin + BoundingBoxOfScaledBSplineGraph.height;
   var P0 : Point = new Point(x0,y0);

   var x1 : number = CorrespondingControlPointCircle.center.x + CorrespondingControlPointCircle.radius;
   var y1 : number = CorrespondingControlPointCircle.center.y + CorrespondingControlPointCircle.radius;
   var P1 : Point = new Point(x1,y1);

   var TranslationVector : Point = P1.minus(P0);

   alignedBSplineGraph.translate(TranslationVector);
  }  //   end case of valid input
  
  return alignedBSplineGraph;
}

//   End utilities that can be used by PolyBezier and CubicSpline objects


// See ~/Dropbox/Sandbox/typeScriptLearn/BusyBCurves001ts/BusyBSplineResources
// /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/BusyBCurves001ts/BusyBSplineResources

class PolyBezierHelper
{  // Begin class PolyBezierHelper
   currBezierIndex : number;
   currBezierNormalizedParm : number;

   constructor(currBezierIndex : number,
               currBezierNormalizedParm : number)
   {
      this.currBezierIndex = currBezierIndex;
      this.currBezierNormalizedParm = currBezierNormalizedParm;
   }
}  // End class PolyBezierHelper

class PolyBezier
{ // Begin class PolyBezier
  Component : Array<CubicBezierCurve>;
  Breakpoint : Array<number>;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for a PolyBezier curve
  // Creates an instance of a PolyBezier curve.
  //
  // input C : an array of CubicBezierCurve
  // input t : an array of breakpoints
  //
  // The input is checked for validity.
  // 1. Number of cubic Bezier curves must be at least 1.
  // 2. Number of breakpoints must be at least 2.
  // 3. Number of breakpoints must equal number of cubic Bezier curves + 1
  // 4. Breakpoints must be strictly increasing
  // 5. Last point of i-th curve must equal first point of (i+1)st curve.
  //////////////////////////////////////////////////////////////////////////////
  constructor(C : Array<CubicBezierCurve>,
              t : Array<number>)
  { // begin constructor of PolyBezier
    // We need to do some validity checking; if input is invalid we will construct
    // a PolyBezier object with no components.
    this.Component  = new Array<CubicBezierCurve>();
    this.Breakpoint = new Array<number>();
    var validInput : boolean = true; // innocent until proven guilty
    // Begin checking for validInput
    if ((C.length < 1) || (t.length < 2))
    {
      validInput = false;
    }
    else if (C.length + 1 != t.length)
    {
      validInput = false;
    }
    else
    { // begin checking that t is monotone increasing
      for (let i = 0; i < t.length - 1; i++)
      {  // begin i-loop
         if (t[i] >= t[i+1])
         {  // begin case where t not monotone increasing
            validInput = false;
            break; // no reason to continue
         }  //   end case where t not monotone increasing
      }  //   end i-loop
    } //   end checking that t is monotone increasing

    if (validInput)
    { // Begin checking that last pt of m-th curve = 1st pt of (m+1)-st curve
      for (let m = 0; m < C.length - 1; m++)
      {   // begin m-loop
          var endPt : Point = C[m].CtrlPts[3];
          var startPt : Point = C[m+1].CtrlPts[0];
          var curvesAreConnected : boolean;
          curvesAreConnected = endPt.isEqualWithinToleranceTo(startPt);
          if (curvesAreConnected==false)
          {  // begin case where successive curves aren't connected
             validInput = false;
             break; // no reason to continue
          }  //   end case where successive curves aren't connected
      }   //   end m-loop

    } //   End checking that last pt of m-th curve = 1st pt of (m+1)-st curve

    if (validInput)
    {  // begin constructing this PolyBezier curve
       for (let j = 0; j < C.length; j++)
       {   // begin j-loop
           this.Component.push(C[j]);
       }   //   end j-loop
       for (let k = 0; k < t.length; k++)
       {   // begin k-loop
           this.Breakpoint.push(t[k]);
       }   //   end k-loop
    }  //   end constructing this PolyBezier curve
  } // End constructor of PolyBezier

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of PolyBezier
  // Returns the string representation of this PolyBezier
  //
  // returns: the string representation of this PolyBezier
  //////////////////////////////////////////////////////////////////////////////
  toString() :  string
  {
    var stringRep : string = "Data for PolyBezier Curve\n";

    var nComponents : number = this.Component.length;
    for (let i = 0; i < nComponents; i++)
    {
       stringRep += "<p>"
       stringRep += "Component[" + i + "] = ";
       stringRep += this.Component[i].toString();
       stringRep += "</p>";
    }

    var nBreakpoints : number = this.Breakpoint.length;
    for (let j = 0; j < nBreakpoints; j++)
    {
       stringRep += "<p>"
       stringRep += "Breakpoint[" + j + "] = ";
       stringRep += this.Breakpoint[j].toString();
       stringRep += "</p>";
    }
    return stringRep;
  }

  //////////////////////////////////////////////////////////////////////////////
  // getCurrBezierIndexAndCurrBezierParm - method of PolyBezier
  // Given a parameter, find the index of the current Bezier and the normalized value of the
  // local parameter on that Bezier
  //
  // input: t - global parameter for PolyLine
  // returns: an object of PolyLineHelper class with currBezierIndex & currBezierNormalizedParm
  //////////////////////////////////////////////////////////////////////////////
  getCurrBezierIndexAndCurrBezierNormalizedParm(t : number) : PolyBezierHelper
  {
     let iLastBreakPoint : number = this.Breakpoint.length - 1;
     let startParm : number = this.Breakpoint[0];
     let endParm : number = this.Breakpoint[iLastBreakPoint];

     var currBezierIndex : number;
     var currBezierNormalizedParm : number;
     var numerator : number;
     var denominator : number;

     if ((startParm <= t) && (t <= endParm))
     {   // Begin case where t is in [startParm, endParm]
         currBezierIndex = BinarySearchSortedArray(t, this.Breakpoint);
     }   //   End case where t is in [startParm, endParm]
     else
     if (t < startParm)
     {   // Begin case where t < startParm
       currBezierIndex = 0;
     }   //   End case where t < startParm
     else
     {   // Begin case where t > endParm
         currBezierIndex = iLastBreakPoint - 1;
     }   //   End case where t > endParm

     numerator = t - this.Breakpoint[currBezierIndex];
     denominator = this.Breakpoint[currBezierIndex + 1] - this.Breakpoint[currBezierIndex];
     currBezierNormalizedParm = numerator/denominator;
     var Results : PolyBezierHelper = new PolyBezierHelper(currBezierIndex, currBezierNormalizedParm);
     return Results;
  }

  //////////////////////////////////////////////////////////////////////////////
  // positionAtParm - method of PolyBezier
  // Returns the point on this PolyBezier at the input parameter
  //
  // input: t - parameter at which to get position on this PolyBezier
  //
  // returns: position on this PolyBezier at parameter t
  //
  //  Note: For parameters out of range, we will extrapolate the first or last
  //  component.
  //////////////////////////////////////////////////////////////////////////////
  positionAtParm(t : number) : Point
  {
     var Results : PolyBezierHelper = this.getCurrBezierIndexAndCurrBezierNormalizedParm(t);
     var currBezierIndex : number = Results.currBezierIndex;
     var currBezierNormalizedParm : number = Results.currBezierNormalizedParm;

     var currBezierCurve : CubicBezierCurve = this.Component[currBezierIndex];
     var Pos : Point = currBezierCurve.positionAtParm(currBezierNormalizedParm);

     return Pos;
  }

  //////////////////////////////////////////////////////////////////////////////
  // derivativeAtParm - method of PolyBezier
  // Returns the derivative on this PolyBezier at the input parameter
  //
  // input: t - parameter at which to get derivative on this PolyBezier
  //
  // returns: derivative on this PolyBezier at parameter t
  //
  //  Note: For parameters out of range, we will extrapolate the first or last
  //  component.
  //////////////////////////////////////////////////////////////////////////////
  derivativeAtParm(t : number) : Point
  {
     var Results : PolyBezierHelper = this.getCurrBezierIndexAndCurrBezierNormalizedParm(t);
     var currBezierIndex : number = Results.currBezierIndex;
     var currBezierNormalizedParm : number = Results.currBezierNormalizedParm;

     var currBezierCurve : CubicBezierCurve = this.Component[currBezierIndex];
     var UnscaledDer : Point = currBezierCurve.derivativeAtParm(currBezierNormalizedParm);
     var scaleFac : number = 1.0/(this.Breakpoint[currBezierIndex + 1] - this.Breakpoint[currBezierIndex]);
     var Der : Point = UnscaledDer.scalarMult(scaleFac);

     return Der;
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawCurve - method of PolyBezier
  // Draws this PolyBezier with specified appearance
  //
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawCurve(drawData : CurveDrawData,
            context : CanvasRenderingContext2D)
  {
     var nComponents : number = this.Component.length;
     for (let i : number = 0; i < nComponents; i++)
     {
       this.Component[i].drawCurve(drawData, context);
     }
  }

} // End class PolyBezier


class DistinctKnotAndMultiplicity
{
  DistinctKnot : number;
  Multiplicity : number;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for a DistinctKnotAndMultiplicity object
  // input: DistinctKnot - the value of a distinct knot
  // input: Multiplicity - the multiplicity of DistinctKnot
  //////////////////////////////////////////////////////////////////////////////
  constructor(DistinctKnot : number,
              Multiplicity : number)
  {
    this.DistinctKnot = DistinctKnot;
    this.Multiplicity = Multiplicity;
  }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of DistinctKnotAndMultiplicity
  // Returns the string representation of this DistinctKnotAndMultiplicity object
  //
  // returns: the string representation of this DistinctKnotAndMultiplicity object
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
    var stringRep : string;
    stringRep = "Distinct Knot = " + this.DistinctKnot.toString() + " Multiplicity = " + this.Multiplicity.toString();
    return stringRep;
  }

}




class CubicSpline extends BCurve
{  // Begin class CubicSpline
  readonly degree: number;
  // CtrlPts : Array<Point>; it is a data member in BCurve hence does not need to be also declared here in CubicSpline
  ExplicitKnots : Array<number>;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for a cubic spline curve
  // Creates an instance of a CubicSpline
  //
  // input: CtrlPts - the array of control points
  // input: ExplicitKnots - the array of distinct knots
  //
  // Note: No input checking is done by this constructor
  //////////////////////////////////////////////////////////////////////////////
    constructor(CtrlPts : Point[],
                ExplicitKnots : number[])
    {
      super();
      this.degree = 3;

      this.CtrlPts = new Array<Point>();

      for (let iPt : number = 0; iPt < CtrlPts.length; iPt++)
      {
        var x : number = CtrlPts[iPt].x;
        var y : number = CtrlPts[iPt].y;
        var P : Point = new Point(x,y);
        this.CtrlPts.push(P)
      }

      this.ExplicitKnots = new Array<number>();

      for (let iKt : number = 0; iKt < ExplicitKnots.length; iKt++)
      {
        var t : number = ExplicitKnots[iKt];
        this.ExplicitKnots.push(t);
      }
    }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of CubicSpline
  // Returns the string representation of this CubicSpline
  //
  // returns: the string representation of this CubicSpline
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
     var stringRep : string = "Data for Spline Curve\n";

     stringRep += "<p>";
     stringRep += "degree = " + this.degree.toString();
     stringRep += "</p>";

     var nPts : number = this.CtrlPts.length;
     for (let i = 0; i < nPts; i++)
     {
        stringRep += "<p>";
        stringRep += "CtrlPts[" + i + "] = ";
        stringRep += this.CtrlPts[i].toString();
        stringRep += "</p>";
     }

     var nKts : number = this.ExplicitKnots.length;
     for (let j = 0; j < nKts; j++)
     {
        stringRep += "<p>";
        stringRep += "ExplicitKnots[" + j + "] = ";
        stringRep += this.ExplicitKnots[j].toString();
        stringRep += "</p>";
     }

     var DistinctKnotsAndMultiplicities : Array<DistinctKnotAndMultiplicity> = this.getDistinctKnotsAndMultiplicities();
     for (let k = 0; k < DistinctKnotsAndMultiplicities.length; k++)
     {
       stringRep += "<p>";
       stringRep += DistinctKnotsAndMultiplicities[k].toString();
       stringRep += "</p>";
     }

     stringRep += "</p>";

     return stringRep;
  }

  //////////////////////////////////////////////////////////////////////////////
  // isValid - method of CubicSpline
  // Determines the validity of this CubicSpline
  //
  // returns: true if this CubicSpline is valid; returns false otherwise
  // TODO: We could perform more validity checks, such as whether the knots
  // are proper; i.e., non-decreasing and with reasonable multiplicities.
  /////////////////////////////////////////////////////////////////////////////
  isValid() : boolean
  {
    var thisIsValid : boolean = true; // innocent until proven guilty
    var nControlPts : number = this.CtrlPts.length;
    var nKts : number = this.ExplicitKnots.length;

    var order : number = this.degree + 1;
    var delta : number = nKts - nControlPts;
    if (delta != order)
    {
      thisIsValid = false;
    }
    return thisIsValid;
  }

  //////////////////////////////////////////////////////////////////////////////
  // clone - method of CubicSpline
  // Create and return an exact copy of this CubicSpline
  //
  // returns: an exact copy of this CubicSpline
  /////////////////////////////////////////////////////////////////////////////
  clone() : CubicSpline
  {
    var ClonedSpline : CubicSpline = new CubicSpline(this.CtrlPts, this.ExplicitKnots)
    return ClonedSpline;
  }


  // Based on /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/Resources/BusyBSplineResources/CubicSplineModel.m
  //////////////////////////////////////////////////////////////////////////////
  // findSpan - method of CubicSpline
  // Returns the span index on this CubicSpline at the input parameter
  //
  // input: t - parameter at which to get span index on this CubicSpline
  //
  // returns: span index on this CubicSpline at parameter t
  //
  //////////////////////////////////////////////////////////////////////////////
  findSpan(t : number):number
  {
     const order : number = 4;
     let spanIndex : number = BinarySearchSortedArray(t, this.ExplicitKnots); // will we need to change the signature of BinarySearchSortedArray to include first and last?
     spanIndex = Math.min(spanIndex, this.ExplicitKnots.length - order - 1);
     return spanIndex;
  }

  //////////////////////////////////////////////////////////////////////////////
  // DeBoorTriangleAtParm - method of CubicSpline
  // Given a parameter value, generate and return the results of implementing
  // the Cox-de Boor algorithm on this spline with the given parameter value
  //
  // input: t - the parameter value at which to implement the Cox-de Boor algorithm.
  //
  // returns: a two-dimensional array that contains the results of implementing
  // the Cox-de Boor algorithm at parameter t on this spline. The results could
  // be displayed as a triangle, with the left side being the first column of
  // results and the point at the right vertex being the value of the position
  // evaluated on this curve at parameter t.
  //////////////////////////////////////////////////////////////////////////////
  DeBoorTriangleAtParm(t : number) : Point[][]
  {
    let ispan : number = this.findSpan(t);

    const itop : number = this.degree; // but we may have to make this degree - multiplicity
    var D : Point[][];

    D = DeBoorTriangleAt(t, ispan, this.degree, itop, this.ExplicitKnots, this.CtrlPts);   

    return D; 
  }

  // Based on /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/Resources/BusyBSplineResources/CubicSplineModel.m
  //////////////////////////////////////////////////////////////////////////////
  // positionAtParm - method of CubicSpline
  // Returns the point on this CubicSpline at the input parameter
  //
  // input: t - parameter at which to get position on this CubicSpline
  //
  // returns: position on this CubicSpline at parameter t
  //
  //////////////////////////////////////////////////////////////////////////////
  positionAtParm(t : number) : Point
  {
    let ispan : number = this.findSpan(t);

    const itop : number = this.degree; // but we may have to make this degree - multiplicity
    var D : Point[][];

    D = DeBoorTriangleAt(t, ispan, this.degree, itop, this.ExplicitKnots, this.CtrlPts); // will we get back D?

    let Pos : Point = D[this.degree][this.degree];

    return Pos;
  }

  //////////////////////////////////////////////////////////////////////////////
  // derivativeAtParm - method of CubicSpline
  // Returns the derivative of this CubicBezierCurve at the input parameter
  //
  // input: t - parameter at which to get derivative of this CubicBezierCurve
  // returns: derivative of this CubicSpline at parameter t
  //
  // Note: In this version, we are converting this CubicSpline to a 
  // PolyBezier and then taking the derivative of the PolyBezier.
  //////////////////////////////////////////////////////////////////////////////
  derivativeAtParm(t : number) : Point
  {
     var thePolyBezier : PolyBezier = this.convertToPolyBezier();
     var der : Point = thePolyBezier.derivativeAtParm(t);
     return der;
  }

//////////////////////////////////////////////////////////////////////////////
// addknot - method of CubicSpline
// Represents this CubicSpline in terms of the B-spline basis functions determined
// by the original knots together with the knot specified by the input parameter.
//
// input: kvalue - the number to be added as a new knot.
//
// Based upon /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/Resources/BusyBSplineResources/CubicSplineModel.m
// The new representation of this CubicSpline will include the original knots
// and the one specified knot, kvalue, inserted.  Also, degree-1 old control
// points will be replaced with degree new control points.  Since degree = 3
// 2 old control points will be replaced with 3 new control points.
//////////////////////////////////////////////////////////////////////////////
  addknot(kvalue : number)
  { // begin addknot
    // const degree : number = 3;
    let firstKnot : number = this.ExplicitKnots[0];
    let lastKnot : number = this.ExplicitKnots[this.ExplicitKnots.length-1];
    if ((firstKnot < kvalue) && (kvalue < lastKnot))
    { // begin case of kvalue in open interval of the domain
      var iSpan : number = this.findSpan(kvalue);
      var noldkts : number = this.ExplicitKnots.length;
      var noldpts : number = this.CtrlPts.length;
      var nnewkts : number = noldkts + 1;
      var nnewpts : number = noldpts + 1;
      var oldkt : Array<number> = new Array(noldkts);
      var oldpt : Array<Point> = new Array(noldpts);


      var newkt : Array<number> = new Array(nnewkts);
      var newpt : Array<Point> = new Array(nnewpts);

      var index : number; // to be used as the index in those cases where the old code used memcpy.

      for (index = 0; index < noldkts; index++)
      {
        oldkt[index] = this.ExplicitKnots[index];
      }

      for (index = 0; index < noldpts; index++)
      {
        oldpt[index] = this.CtrlPts[index];
      }


      let m : number = this.degree;
      let i : number = iSpan + 1;

      var nleft : number = i;
      for (index = 0; index < nleft; index++)
      {
        newkt[index] = oldkt[index];
      }

      newkt[i] = kvalue;

      var nright : number = nnewkts - nleft - 1;
      for (index = 0; index < nright; index++)
      {
        newkt[i+1+index] = oldkt[i + index];
      }

      nleft = i - m;
      for (index = 0; index < nleft; index++)
      {
        newpt[index] = oldpt[index];
      }

      nright = nnewpts - nleft - m;
      for (index = 0; index < nright; index++)
      {
        newpt[nleft + m + index] = oldpt[nleft + m - 1 + index];
      }


      var j : number;
      for (j = i - m; j <= i - 1; j++)
      {
        var a = (kvalue - oldkt[j])/(oldkt[j+m] - oldkt[j]);
        var abar = 1.0 - a;
        newpt[j] = linearCombination(a, oldpt[j], abar, oldpt[j-1]);
      }

      this.CtrlPts = newpt;
      this.ExplicitKnots = newkt;

    } // end case of kvalue in open interval of the domain
  } // end addknot

//////////////////////////////////////////////////////////////////////////////
// getKnotMultiplicityAtIndex - method of CubicSpline
// Get the multiplicity of the knot having a certain index.
//
// input - IndexOfExplicitKnot - the index of a knot whose multiplicity is sought.
//
// returns: the multiplicity of the knot whose index is IndexOfExplicitKnot
// So, for instance, if the knot sequence is 0,0,0,0,.1,.2,1,1,1,1
// and if IndexOfExplicitKnot is 0, 1, 2, or 3, then the function will return 4.
//////////////////////////////////////////////////////////////////////////////
  getKnotMultiplicityAtIndex(IndexOfExplicitKnot: number) : number
  {
    var multiplicity : number = 0; // we will return 0 if IndexOfExplicitKnot is outside of the legal range
    let bot : number = 0; // the index of the lowest explicit knot
    let top : number = this.ExplicitKnots.length - 1; // the index of the highest explicit knot
    var i : number; // loop index

    if ((bot <= IndexOfExplicitKnot) && (IndexOfExplicitKnot <= top))
    {  // begin case where IndexOfExplicitKnot is in the legal range
      multiplicity = 1; // we know that the multiplicity is going to be at least 1
      var ExplicitKnot : number = this.ExplicitKnots[IndexOfExplicitKnot];

      for (i = IndexOfExplicitKnot + 1; i <= top; i++)
      {
        if (this.ExplicitKnots[i]==ExplicitKnot)
        {
          ++multiplicity
        }
        else
        {
          break;
        }
      }

      for (i = IndexOfExplicitKnot - 1; i >=bot; i--)
      {
        if (this.ExplicitKnots[i]==ExplicitKnot)
        {
          ++multiplicity
        }
        else
        {
          break;
        }
      }

    }  //   end case where IndexOfExplicitKnot is in the legal range

    return multiplicity;
  }

//////////////////////////////////////////////////////////////////////////////
// getDistinctKnotsAndMultiplicities - method of CubicSpline
// Return an array of objects representing the distinct knots and their multiplicities
// for this CubicSpline
//
// returns: an array of objects representing the distinct knots and their multiplicities
// for this CubicSpline
//////////////////////////////////////////////////////////////////////////////
  getDistinctKnotsAndMultiplicities() : Array<DistinctKnotAndMultiplicity>
  {
    var DistinctKnotsAndMultiplicities : Array<DistinctKnotAndMultiplicity> = new Array();
    var numExplicitKnots = this.ExplicitKnots.length;
    var TempArray : Array<DistinctKnotAndMultiplicity> = new Array(numExplicitKnots);
    for (let i : number = 0; i < numExplicitKnots; i++)
    {
      var knot : number = this.ExplicitKnots[i];
      var multiplicity : number = this.getKnotMultiplicityAtIndex(i);

      TempArray[i] = new DistinctKnotAndMultiplicity(knot, multiplicity);
    }

    let i = 0;
    while (i < numExplicitKnots)
    {
       var currKnot : number = TempArray[i].DistinctKnot;
       var currMult : number = TempArray[i].Multiplicity;
       var currItem : DistinctKnotAndMultiplicity = new DistinctKnotAndMultiplicity(currKnot, currMult);
       DistinctKnotsAndMultiplicities.push(currItem);
       i = i + currMult;
    }

    return DistinctKnotsAndMultiplicities;
  }



  // The following is based on /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/Resources/BusyBSplineResources/CubicSplineModel.m
  //////////////////////////////////////////////////////////////////////////////
  // convertToPolyBezier - method of CubicSpline
  // Build and return a PolyBezier object that is parametrically equivalent to this CubicSpline
  //
  // returns: a PolyBezier object that is parametrically equivalent to this CubicSpline
  //////////////////////////////////////////////////////////////////////////////
  convertToPolyBezier() : PolyBezier
  {
    // Only do this if the degree is 3
    var polyBezierCurve : PolyBezier = null;
    if (this.degree==3)
    { // begin case where degree is 3

      var clone : CubicSpline = this.clone();
      var DistincKnotsAndMultiplicities0 : DistinctKnotAndMultiplicity[] = clone.getDistinctKnotsAndMultiplicities();
      var nInternalDistinctKnots = DistincKnotsAndMultiplicities0.length - 2;
      var i : number; // loop index
      var j : number; // loop index
      for (i = 1; i <= nInternalDistinctKnots; i++)
      {  // begin i-loop
        var currDistinctKnot : number = DistincKnotsAndMultiplicities0[i].DistinctKnot;
        var currMultiplicity : number = DistincKnotsAndMultiplicities0[i].Multiplicity;
        var nInsertionsHere : number = clone.degree - currMultiplicity;
        for (j = 0; j < nInsertionsHere; j++)
        {  // begin j-loop
          clone.addknot(currDistinctKnot);
        }  //  end j-loop
      }  // end i-loop

      // Begin validity checks
      var DistinctKnotsAndMultiplicities1 : DistinctKnotAndMultiplicity[] = clone.getDistinctKnotsAndMultiplicities();
      var allInternalKnotsHaveMultiplicityThree : boolean = true; // innocent until proven guilty
      for (i = 1; i < DistinctKnotsAndMultiplicities1.length - 1; i++)
      {
        if (DistinctKnotsAndMultiplicities1[i].Multiplicity != clone.degree)
        {
          allInternalKnotsHaveMultiplicityThree = false;
          break;
        }
      }

      var modularityOfNumberOfControlPointsIsCorrect : boolean = false; // guilty unless proven innocent
      var nCpts : number = clone.CtrlPts.length;
      if ( ((nCpts - 4) % 3) == 0)
      {
        modularityOfNumberOfControlPointsIsCorrect = true;
      }

       // If and only if the validity tests passed, represent the clone with multiplicity-degree
      // internal knots as a PolyBezier object.

      if (allInternalKnotsHaveMultiplicityThree && modularityOfNumberOfControlPointsIsCorrect)
      {  // Begin representing the clone as a PolyBezier object
        
        var nBezierComponents : number = (clone.CtrlPts.length - 4)/3 + 1;
        
        var iComponent : number;
        var iBreakPoint : number;
        var Components : CubicBezierCurve[] = new Array();
        var Breakpoints : number[] = new Array();
        for (iComponent = 0; iComponent < nBezierComponents; iComponent++)
        {  // begin iComponent loop
          var firstIndex : number = 3*iComponent;
          var currControlPoints : Point[] = new Array<Point>(4);
          for (let iCurrControlPoint : number = 0; iCurrControlPoint < 4; iCurrControlPoint++)
          {
            currControlPoints[iCurrControlPoint] = clone.CtrlPts[firstIndex + iCurrControlPoint];
          }

          var currBezierCurve : CubicBezierCurve = new CubicBezierCurve(currControlPoints[0],
            currControlPoints[1],
            currControlPoints[2],
            currControlPoints[3]);

            Components.push(currBezierCurve);
          }  //   end iComponent loop

          var nBreakpoints = DistinctKnotsAndMultiplicities1.length;
          for (iBreakPoint = 0; iBreakPoint < nBreakpoints; iBreakPoint++)
          {
            var currBreakPoint = DistinctKnotsAndMultiplicities1[iBreakPoint].DistinctKnot;
            Breakpoints.push(currBreakPoint);
          }

          polyBezierCurve = new PolyBezier(Components, Breakpoints);

        }  //   End representing the clone as a PolyBezier object

      } //   end case where degree is 3
      return polyBezierCurve;
    }

  //////////////////////////////////////////////////////////////////////////////
  // drawCurve - method of CubicSpline
  // Draws this CubicSpline with specified appearance
  //
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawCurve(drawData : CurveDrawData,
            context : CanvasRenderingContext2D)
  {
     var thePolyBezier : PolyBezier = this.convertToPolyBezier();
     thePolyBezier.drawCurve(drawData, context);
  }


  //////////////////////////////////////////////////////////////////////////////
  // drawKnots - method of CubicSpline
  // Draws knots of this CubicSpline with specified appearance
  //
  // input: width - the width of the rectangles representing the knots
  // input: height - the height of the rectangles representing the knots
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawKnots(width : number,
            height : number,
            drawData : RectangleDrawData,
            context : CanvasRenderingContext2D)
  {
     var DistinctKnotsAndMultiplicities : DistinctKnotAndMultiplicity[] = this.getDistinctKnotsAndMultiplicities()
     var numInternalKnots : number = DistinctKnotsAndMultiplicities.length - 2;
     
     for (let i = 1; i <= numInternalKnots; i++)
     {
        var t : number = DistinctKnotsAndMultiplicities[i].DistinctKnot;
        var P : Point = this.positionAtParm(t);
        P.drawRectangleHere(width, height, drawData, context);
     }
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawControlPointsWeightedForParm - method of CubicSpline
  // Draws control points with areas proportional to basis function values
  //
  // input: t - the parameter for the basis functions
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //
  // note: the sum of all the control point areas is now a global const
  // note: the bsplineValues are now being obtained by evaluating the 
  // appropriate element in a global array of graphs of cubic B-spline basis
  // functions.  
  //////////////////////////////////////////////////////////////////////////////
  drawControlPointsWeightedForParm(t : number,
                                   drawData : CircleDrawData,
                                   context : CanvasRenderingContext2D)
  {
     var controlPoints : Array<Point> = this.CtrlPts;
     var nControlPts : number = controlPoints.length;
     
     for (let i = 0; i < nControlPts; i++)
     {
        var bsplineValue : number = globalGraphsOfCubicBSplineBasisFunctions[i].positionAtParm(t).y;
        var actualArea : number = globalSumOfControlPointAreas*bsplineValue;
        // NOTE: actualArea = Math.PI*(actualRadius)^2
        // so actualRadius = sqrt(actualArea/Math.PI)
        var actualRadius : number = Math.sqrt(actualArea/Math.PI);
        controlPoints[i].drawCircleHere(actualRadius, drawData, context);
     }

  } 

  //////////////////////////////////////////////////////////////////////////////
  // drawAllBCurveArtifacts - method of CubicSpline
  // Draw all information associated with this CubicSpline
  //
  // input: drawDataForAllBCurveArtifacts - styles for drawing everything
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawAllBCurveArtifacts(drawDataForAllBCurveArtifacts : BCurveArtifactsDrawData,
                         context : CanvasRenderingContext2D) : void
  {
    clearCanvas();
    if (globalSkeleton==false)
    {
     this.drawCurve(drawDataForAllBCurveArtifacts.forBCurve, context);
     this.drawControlPolygon(drawDataForAllBCurveArtifacts.forControlPolygon, context);

     this.drawControlPointsWeightedForParm(tGlobal,
                                           drawDataForAllBCurveArtifacts.forControlPoints,
                                           context);

     this.drawControlPointsWithMaxRadius(drawDataForAllBCurveArtifacts.forControlPointsWithMaxRadius, context); 
    }
    else 
    {
     this.makeControlPointTargetsWithMaxRadius();
    }                                   

     this.drawPointOnCurveForParm(tGlobal,
                                  globalConstPointOnCurveRadius,
                                  drawDataForAllBCurveArtifacts.forPointOnCurve,
                                  context);

    if (globalSkeleton==false)
    {
     const width : number = 15.0;
     const height : number = 10.0;
     this.drawKnots(width, height, drawDataForAllBCurveArtifacts.forKnots, context);


     var nBasisFunctions : number = globalGraphsOfCubicBSplineBasisFunctions.length;
     
     var pointOnGraphRadius : number = 3.0;

     for (let basisIndex : number = 0; basisIndex < nBasisFunctions; basisIndex++)
     {
       var alignedBSplineGraph : CubicSpline = alignBSplineGraphWithCorrespondingControlPointCircle(basisIndex);
      
       alignedBSplineGraph.drawCurve(drawDataForAllBCurveArtifacts.forGraphOfBasisFunction, context);
       alignedBSplineGraph.drawPointOnCurveForParm(tGlobal, pointOnGraphRadius, drawDataForAllBCurveArtifacts.forPointOnGraph, context);
     }
    }

    if (globalSkeleton==true)
    {
      let strokeColor : string = "gray";
      let curveWidth : number = 1;
      let theDrawDataForFaintControlPolygon = new CurveDrawData(strokeColor, curveWidth);
      this.drawControlPolygon(theDrawDataForFaintControlPolygon, context);
    }

     var D : Point[][] = this.DeBoorTriangleAtParm(tGlobal);
     drawAllDeBoorPoints(D, drawDataForAllBCurveArtifacts.forIntermediatePoints, context);
     drawAllDeBoorLines(D, drawDataForAllBCurveArtifacts.forIntermediateLines, context);
     
     var pointOnCurve : Point = this.positionAtParm(tGlobal);
     globalPointOnCurveForParmTarget  = new Circle(pointOnCurve, globalConstPointOnCurveRadius);

     if (globalSkeleton==false)
     {
     var textLocation : Point = new Point(pointOnCurve.x, pointOnCurve.y - globalConstPointOnCurveRadius);

     drawTextForNumber(tGlobal,
                       textLocation,
                       drawDataForAllBCurveArtifacts.forTextNearPointOnCurve,
                       context);
     }
  }


  //////////////////////////////////////////////////////////////////////////////
  // drawVerticalLineFromCurveForParm - method of CubicSpline
  // Draw a vertical line from a point on a curve to its local X-axis
  //
  // input: t - parameter that determines point on the curve
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  // input: context - the context associated with the canvas
  // Note: This function was copied directly from CubicBezierCurve
  //////////////////////////////////////////////////////////////////////////////
  drawVerticalLineFromCurveForParm(t : number,
                                   drawData : CurveDrawData,
                                   context :CanvasRenderingContext2D)
  {
     var P : Point = this.positionAtParm(t);
     // Now, we will create a point Q that has the same x coordinate as P and whose
     // y coordinate is equal to the maximum of the y coordinates of the control points
     // of this CubicBezierCurve.  That is because y increases as we go downward.
     var controlPoints : Array<Point> = this.CtrlPts;
     var yMax : number = controlPoints[0].y;
     for (let i = 1; i < controlPoints.length; i++)
     {
        var yCurr : number = controlPoints[i].y;
        if (yMax < yCurr)
        {
           yMax = yCurr;
        }
     }
     var  Q : Point = new Point(P.x, yMax);

     let VerticalLine : Line = new Line(P, Q);
     VerticalLine.draw(drawData, context);
  }  

//////////////////////////////////////////////////////////////////////////////
// getBoundingBox - methodOfCubicSpline
// Build and return a bounding box for this CubicSpline
//
// returns: a bounding box for this CubicSpline.
// note: the bounding box that gets returned is based upon the control points,
// and thus is not the tightest bounding box for this CubicSpline
//////////////////////////////////////////////////////////////////////////////
  getBoundingBox() : Rectangle
  {
    var xMin : number = this.CtrlPts[0].x;
    var yMin : number = this.CtrlPts[0].y;
    var xMax : number = this.CtrlPts[0].x;
    var yMax : number = this.CtrlPts[0].y;
    var nPts : number = this.CtrlPts.length;
    for (let i = 1; i < nPts; i++)
    {
      var xCur = this.CtrlPts[i].x;
      var yCur = this.CtrlPts[i].y;
      xMin = Math.min(xMin, xCur);
      yMin = Math.min(yMin, yCur);
      xMax = Math.max(xMax, xCur);
      yMax = Math.max(yMax, yCur);
    }
    var width : number = xMax - xMin;
    var height : number = yMax - yMin;
    var BoundingBox : Rectangle = new Rectangle(xMin, yMin, width, height);
    return BoundingBox;
  }

} // End class CubicSpline

//   End code to support BusyBSpline




// Begin code for classes Line, PolyLine, Rectangle

class Line
{   // Begin class Line
    StartPt : Point;
    EndPt : Point;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for Line
  // Creates an instance of Line
  //
  // input: StartPt - the starting point for this Line
  // input: EndPt - the ending point for this Line
  //
  // Note:  To keep things simple, the domain of each line is will be [0,1].
  //////////////////////////////////////////////////////////////////////////////
  constructor(StartPt : Point,
              EndPt : Point)
    {
      this.StartPt = StartPt;
      this.EndPt = EndPt;
    }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of Line
  // Returns the string representation of this Line
  //
  // returns: the string representation of this Line
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
     var stringRep : string = "Data for Line";

     stringRep += "<p>";
     stringRep += "StartPt = ";
     stringRep += this.StartPt.toString();
     stringRep += "<p>";
     stringRep += "  EndPt = "
     stringRep += this.EndPt.toString();
     stringRep += "<p>";

     return stringRep;
  }

  //////////////////////////////////////////////////////////////////////////////
  // positionAtParm - method of Line
  // Returns the point on this Line at the input parameter
  //
  // input: t - parameter at which to get position on this Line
  //
  // returns: position on this Line at parameter t
  //
  // Note: This function assumes that the domain of each Line is [0,1].
  // Also, we allow the input parameter t to be any number, not just in [0,1].
  //////////////////////////////////////////////////////////////////////////////
  positionAtParm(t : number) : Point
  {
     var Pos : Point = linearCombination(1.0 - t, this.StartPt, t, this.EndPt);

     return Pos;
  }

  //////////////////////////////////////////////////////////////////////////////
  // derivativeAtParm - method of Line
  // Returns the derivative of this Line at the input parameter
  //
  // input: t - parameter at which to get derivative of this Line
  //
  // returns: derivative of this Line at parameter t
  //
  // Note:  Since this is a line with a uniform parameterization, the
  // derivative is constant, and therefore the input parameter is not needed.
  // However, we are including it just to be consistent with the implementations
  // of derivativeAtParm for other curve types.  Also, if, in the future, we
  // allow nonuniform parameterization for lines, then the input parameter t
  // would become necessary.  This function assumes that the domain of each
  // line is [0,1].
  //////////////////////////////////////////////////////////////////////////////
  derivativeAtParm(t : number) : Point
  {
    var Der : Point = this.EndPt.minus(this.StartPt)

    return Der;
  }

  //////////////////////////////////////////////////////////////////////////////
  // draw - method of Line
  // Draws this Line with specified appearance
  //
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  draw(drawData : CurveDrawData,
       context : CanvasRenderingContext2D)
  {
     drawData.updateContext(context);
     context.beginPath();
     context.moveTo(this.StartPt.x, this.StartPt.y);
     context.lineTo(this.EndPt.x, this.EndPt.y);
     context.stroke();
  }

}   //   End class Line

class PolyLineHelper
{  // Begin class PolyLineHelper
   currLineIndex : number;
   currLineParm : number;
  //////////////////////////////////////////////////////////////////////////////
  // constructor for PolyLineHelper
  // Creates an instance of PolyLineHelper
  //
  // input: currLineIndex - the index of the current Line component of the PolyLine
  // input: currLineParm - the value of the current local parameter of the current Line
  //
  // Note:  To keep things simple, the domain of each line is will be [0,1].
  //////////////////////////////////////////////////////////////////////////////
   constructor(currLineIndex : number,
               currLineParm : number)
   {
      this.currLineIndex = currLineIndex;
      this.currLineParm = currLineParm;
   }

}  //   End class PolyLineHelper

class PolyLine
{   // Begin class PolyLine
    Pt : Array<Point>;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for PolyLine
  // Creates an instance of PolyLine
  //
  // input: Pt - An array of Point objects
  //
  // Note:  To keep things simple, the straight line segment of this PolyLine
  // from Pt[i] to Pt[i+1] will be parameterized from i to i+1.
  //////////////////////////////////////////////////////////////////////////////
  constructor(Pt : Array<Point>)
  {
    this.Pt = new Array();
    const n : number = Pt.length;
    for (let i = 0; i < n ; i++)
    {
      this.Pt.push(Pt[i]);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of PolyLine
  // Returns the string representation of this PolyLine
  //
  // returns: the string representation of this PolyLine
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
     var stringRep : string = "Data for PolyLine";

     const n : number = this.Pt.length;

     for (let i : number = 0; i < n; i++)
     {
        stringRep += "<p>";
        stringRep += "Pt[" + i.toString() + "] = ";
        stringRep += this.Pt[i].toString();
        stringRep += "<p>";
     }

     return stringRep;
  }

  //////////////////////////////////////////////////////////////////////////////
  // getCurrLineIndexAndCurrLineParm - method of PolyLine
  // Given a parameter, find the index of the current line and the value of the
  // local parameter on that line
  //
  // input: t - global parameter for PolyLine
  // returns: an object of PolyLineHelper class with index & local parameter
  //////////////////////////////////////////////////////////////////////////////
  getCurrLineIndexAndCurrLineParm(t : number) : PolyLineHelper
  {
     const n : number = this.Pt.length;
     const lastLineIndex : number = n - 2;
     var currLineIndex : number;
     var currLineParm : number;

     if ((0 <= t) && (t < n-1))
     { // begin case where t is in [0,n-1)
       currLineIndex = Math.floor(t);
       currLineParm = t - currLineIndex;
     } //   end case where t is in [0,n-1)
     else
     if (t < 0)
     { // begin case where t is negative
       currLineIndex  = 0;
       currLineParm  = t;
     } //   end case where t is negative
     else
     { // begin case where t >= n - 1
       currLineIndex = lastLineIndex;
       currLineParm  = t - currLineIndex;
     } //   end case where t >= n - 1

     return new PolyLineHelper(currLineIndex, currLineParm);
  }

  //////////////////////////////////////////////////////////////////////////////
  // positionAtParm - method of PolyLine
  // Returns the point on this PolyLine at the input parameter
  //
  // input: t - parameter at which to get position on this Line
  //
  // returns: position on this PolyLine at parameter t
  //
  // Note: This function assumes that the domain of each PolyLine is [0,n-1].
  // Also, we allow the input parameter t to be any number, not just in [0,n-1].
  // We assume that the parameterization of the PolyLine is based upon the
  // parameterization of the component Line objects, and we determine the index
  // of the Line object to be floor(t) if t is in [0,n-1] and do special handling
  // otherwise.
  //////////////////////////////////////////////////////////////////////////////
  positionAtParm(t : number) : Point
  {
     var Results : PolyLineHelper = this.getCurrLineIndexAndCurrLineParm(t);
     var currLineIndex : number = Results.currLineIndex;
     var currLineParm : number = Results.currLineParm;

     let currLine : Line = new Line(this.Pt[currLineIndex], this.Pt[currLineIndex + 1]);
     var Pos : Point = currLine.positionAtParm(currLineParm);
     return Pos;
  }

  //////////////////////////////////////////////////////////////////////////////
  // derivativeAtParm - method of PolyLine
  // Returns the derivative on this PolyLine at the input parameter
  //
  // input: t - parameter at which to get derivative on this Line
  //
  // returns: derivative on this PolyLine at parameter t
  //
  // Note: This function assumes that the domain of each PolyLine is [0,n-1].
  // Also, we allow the input parameter t to be any number, not just in [0,n-1].
  // We assume that the parameterization of the PolyLine is based upon the
  // parameterization of the component Line objects, and we determine the index
  // of the Line object to be floor(t) if t is in [0,n-1] and do special handling
  // otherwise.
  //////////////////////////////////////////////////////////////////////////////
  derivativeAtParm(t : number) : Point
  {
     var Results : PolyLineHelper = this.getCurrLineIndexAndCurrLineParm(t);
     var currLineIndex : number = Results.currLineIndex;
     var currLineParm : number = Results.currLineParm;

     let currLine : Line = new Line(this.Pt[currLineIndex], this.Pt[currLineIndex + 1]);
     var Der : Point = currLine.derivativeAtParm(currLineParm);
     return Der;
  }

  //////////////////////////////////////////////////////////////////////////////
  // draw - method of PolyLine
  // Draws this PolyLine with specified appearance
  //
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  draw(drawData : CurveDrawData,
       context : CanvasRenderingContext2D)
  {
     drawData.updateContext(context);
     context.beginPath();
     context.moveTo(this.Pt[0].x, this.Pt[0].y);
     var n : number = this.Pt.length;
     for (let i : number = 1; i < n; i++)
     {
        context.lineTo(this.Pt[i].x, this.Pt[i].y);
     }
     context.stroke();
  }

}   //   End class PolyLine

class Rectangle
{   // Begin class Rectangle
  // This is based on https://www.w3.org/TR/2dcontext/#drawing-rectangles-to-the-canvas
  xMin : number;
  yMin : number;
  width : number;
  height : number;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for Rectangle
  // Creates an instance of Rectangle
  //
  // input: xMin - the minimum x coordinate of the rectangle
  // input: yMin - the minimum y coordinate of the rectangle
  // input: width - the width of the rectangle
  // input: height - the height of the rectangle
  //
  // Note:  This is based on 
  // https://www.w3.org/TR/2dcontext/#drawing-rectangles-to-the-canvas
  // in which the positive x direction is TO THE RIGHT 
  // and the positive y direction is DOWN when drawing to the canvas
  // Therefore the point (xMin, yMin) is at the upper left corner when drawn
  // Thus the four vertices of this Rectangle are as follows
  // (xMin, yMin)
  // (xMin + width, yMin)
  // (xMin, yMin + height)
  // (xMin + width, yMin + height)
  //////////////////////////////////////////////////////////////////////////////
  constructor(xMin : number,
              yMin : number,
              width : number,
              height: number)
 {
   this.xMin = xMin;
   this.yMin = yMin;
   this.width = width;
   this.height = height;
 }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of Rectangle
  // Returns the string representation of this Rectangle
  //
  // returns: the string representation of this Rectangle
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
     var stringRep : string = "<p>" + "Data for Rectangle" + "<p>";
     
     stringRep += "xMin = " + this.xMin.toString() + "<p>";
     stringRep += "yMin = " + this.yMin.toString() + "<p>";
     stringRep += "width = " + this.width.toString() + "<p>";
     stringRep += "height = " + this.height.toString() + "<p>";

     return stringRep;
  } 

  //////////////////////////////////////////////////////////////////////////////
  // stroke - method of Rectangle
  // Strokes this Rectangle with specified appearance
  //
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  stroke(drawData : RectangleDrawData,
       context : CanvasRenderingContext2D)
  {
     drawData.updateContext(context);
     context.beginPath();
     context.rect(this.xMin,this.yMin,this.width,this.height)
     context.stroke();
  }

  //////////////////////////////////////////////////////////////////////////////
  // fill - method of Rectangle
  // Fills this Rectangle with specified appearance
  //
  // input: drawData - an object containing data specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  fill(drawData : RectangleDrawData,
       context : CanvasRenderingContext2D)
  {
     drawData.updateContext(context);
     context.beginPath();
     context.rect(this.xMin,this.yMin,this.width,this.height)
     context.fill();
  }  
}   //   End class Rectangle

//   End code for classes Line, PolyLine, Rectangle

// Do this when the web page is loaded
// window.onload = StartAnimation;

// TODO: Do we just want this free-floating function here?
// Would it be better design to somehow put this in the HTML or have it
// be a function that automatically gets called?
// This call is the last line of the executable code; the remaining code
// consists of tests.

// TODO: We would like to make the size of the canvas adapt to the size
// of the browser.
// Look at the following:
// http://cssdeck.com/labs/emcxdwuz
// http://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
// http://htmlcheats.com/html/resize-the-html5-canvas-dyamically/

////////////////////////////////////////////////////////////////////////////////
// resize ( from http://cssdeck.com/labs/emcxdwuz )
// This resizes the drawingCanvas to match the window.
// But note that the original code that used drawingCanvas.style
// did not work properly.
// TODO:
// This still isn't perfect, because I am not taking window.innerWidth
// into consideration.  I solved a similar problem in BoGART years ago, so
// I can do it again.  In other words, if I resize the window from the bottom
// or top edge (changing innerHeight) then the drawingCanvas adjusts.
// But it does not adjust if I resize the window from the left or right edge.
// This should be fixed.
////////////////////////////////////////////////////////////////////////////////
function resize()
{
  var drawingCanvas : HTMLCanvasElement =
    <HTMLCanvasElement>document.getElementById('drawingCanvas');
  var height : number = window.innerHeight;
  var ratio : number = drawingCanvas.width/drawingCanvas.height;
  var width = height*ratio;

  var widthScaleFac : number = 0.9;
  var heightScaleFac : number = 0.8;

  // Note, the following did not work in conjunction with mouse actions.
  // drawingCanvas.style.width = scaleFac*width + 'px';
  // drawingCanvas.style.height = scaleFac*height + 'px';

  // This works
  // drawingCanvas.width = scaleFac*width;
  // drawingCanvas.height = scaleFac*height;

  // This works but doesn't preserve the aspect ratio.
  drawingCanvas.width = widthScaleFac*window.innerWidth;
  drawingCanvas.height = heightScaleFac*window.innerHeight;

  // ResetCurve();
  UpdateGlobalCurveTypeBasedOnRadioButton();
}

// I replaced window.onload = ResetCurve with the following.
window.onload = resize;
window.onresize = resize;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Miscellaneous tests of the above and utilities to help do tests.

function StartParagraph()
{
  document.writeln("<p>")
}

function EndParagraph()
{
  document.writeln("</p>")
}

function ArrayLogger<T>(ArrayDescription : string,
                        ItemDescription : string,
                        A:Array<T>)
{
  StartParagraph();
  document.writeln("Begin " + ArrayDescription);
  EndParagraph();
  let n : number = A.length;
  for (let i : number = 0; i < n; i++)
  {
    StartParagraph();
    document.writeln(ItemDescription + "[" + i + "] = ");
    document.writeln(A[i].toString())
    EndParagraph();
  }
  StartParagraph();
  document.writeln("  End " + ArrayDescription);
  EndParagraph();
}

function TestPointClass()
{
  var P = new Point(3,4);
  var Q = new Point(7,8);
  var R : Point = P.plus(Q);
  var d : number = P.dotProd(Q);
  document.writeln("<p>In TestPointClass()</p>")
  document.writeln("<p>    P = " + P.toString() + " </p>");
  document.writeln("<p>    Q = " + Q.toString() + "</p>");
  document.writeln("<p>P + Q = " + R.toString() + "</p>");
  document.writeln("<p>P*Q = " + d.toString() + "</p>");
}
// Canvas-related explorations
function TestCanvas()
{
  var document : Document;
  var canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("mycanvas");
  var ctx : CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");
}

function simpleAlert()
{
  // alert("Firefox");
  // alert("Safari");
  // alert("Chrome")
  // alert("Opera");
  alert("Just testing")
}

function TestJustTesting()
{
  document.writeln("In TestJustTesting()")
  document.writeln("<p>");
  document.writeln("Just testing")
  for (let i : number = 0; i < 10; i++)
  {
    // document.write(i.toString());
    document.write((i*i).toString());
    document.write("<p>")
  }
}

function TestCubicSpline()
{
  document.writeln("<p>Entering TestCubicSpline()</p>");
  var P0 : Point = new Point(1.00, 2.00);
  var P1 : Point = new Point(3.00, 4.00);
  var P2 : Point = new Point(5.00, 6.00);
  var P3 : Point = new Point(7.00, 8.00);
  var P4 : Point = new Point(9.00, 10.00);
  var P5 : Point = new Point(11.00, 12.00);

  var t0 : number = 0.00;
  var t1 : number = 1.00;
  var t2 : number = 2.00;
  var t3 : number = 3.00;

  var P : Array<Point> = new Array();
  var t : Array<number> = new Array();

  P.push(P0);
  P.push(P1);
  P.push(P2);
  P.push(P3);
  P.push(P4);
  P.push(P5);

  t.push(t0);
  t.push(t0);
  t.push(t0);
  t.push(t0)
  t.push(t1);
  t.push(t2);
  t.push(t3);
  t.push(t3);
  t.push(t3);
  t.push(t3);

  var C : CubicSpline = new CubicSpline(P,t);

  document.writeln("<p>");
  document.writeln("Data for CubicSpline object");
  var CubicSplineData : string = C.toString();
  document.writeln(CubicSplineData);
  document.writeln("<p>")

   document.writeln("<p>Leaving TestCubicSpline()</p>");
 }



 function TestPolyBezier()
 {
   document.writeln("<p>Entering TestPolyBezier()</p>");
   // Declare some indices
   var i,j,k,m,n : number;
   // Create some points
   var Pts : Array<Point> = new Array();
   var nCubicBezierCurves : number = 3;
   var degree : number = 3;
   var nPoints : number = 0;

   if (nCubicBezierCurves > 0)
   {
     nPoints = degree*nCubicBezierCurves + 1;
   }

   // nPoints determined to be 10
   for (i = 0; i < nPoints; i++)
   {
     var currPt : Point = new Point(i, 10*i);
     Pts.push(currPt);
   }

   // Create some CubicBezierCurve objects

   var Crvs : Array<CubicBezierCurve> = new Array();
   for (j = 0; j < nCubicBezierCurves; j++)
   {
     k = 3*j;
     var A : Point = Pts[k];
     var B : Point = Pts[k+1];
     var C : Point = Pts[k+2];
     var D : Point = Pts[k+3];
     var currCrv = new CubicBezierCurve(A, B, C, D);
     Crvs.push(currCrv);
   }
   // Dump those objects

   for (m = 0; m < nCubicBezierCurves; m++)
   {
     var BezierCurveData : string = Crvs[m].toString();
     document.writeln(BezierCurveData);
   }
   //  // Create a PolyBezier object from the CubicBezierCurve objects
   // First construct the array of breakpoints.
   var Breakpoints : Array<number> = new Array();
   var nBreakpoints : number = nCubicBezierCurves + 1;
   for (n = 0; n < nBreakpoints; n++)
   {
     Breakpoints.push(n*n);
   }

   var thePolyBezierObject : PolyBezier = new PolyBezier(Crvs, Breakpoints)
   //  // Dump that object

   var thePolyBezierObjectData = thePolyBezierObject.toString();
   document.writeln(thePolyBezierObjectData);

   document.writeln("<p>");
   document.writeln("Evaluation Test");
   document.writeln("<p>");

   let a : number = thePolyBezierObject.Breakpoint[0];
   let iLastBreakPoint : number = thePolyBezierObject.Breakpoint.length - 1;
   let b : number = thePolyBezierObject.Breakpoint[iLastBreakPoint];
   const nIntervals : number = 90;
   const delta : number = (b - a)/nIntervals;

   for (i = 0; i <= nIntervals; i++)
   {
     var t : number = a + i*delta;
     var pos : Point = thePolyBezierObject.positionAtParm(t);
     document.writeln("t = " + t.toString() + "&nbsp &nbsp &nbsp" + "   pos = " + pos.toString());
     document.writeln("<p>");
     var der : Point = thePolyBezierObject.derivativeAtParm(t);
     document.writeln("t = " + t.toString() + "&nbsp &nbsp &nbsp" + "   der = " + der.toString());
     document.writeln("<p>");
   }

   document.writeln("<p>Leaving TestPolyBezier()</p>");
 }

 function TestDrawData()
 {
   document.writeln("<p>Entering TestDrawData()</p>");
   var allDrawData : BCurveArtifactsDrawData = new BCurveArtifactsDrawData();
   var stringRepOfAllDrawData : string = allDrawData.toString();
   document.writeln(stringRepOfAllDrawData);
   document.writeln("<p> Leaving TestDrawData()</p>");
 }

 function TestBinarySearchSortedArray()
 {
   document.writeln("<p>Entering TestBinarySearchSortedArray()</p>");
   var indx : number;
   var topindx : number;
   var A : Array<number> = new Array();
   topindx = 5;
   for (indx = 0; indx <= topindx; indx++)
   {
     A[indx] = indx;
   }

   ArrayLogger("Contents of array A using ArrayLogger", "A", A);

   document.writeln("Test computed values of t that may not exactly equal array values")
   document.writeln("<p>")
   var factor : number = 3;
   for (indx = 0; indx <= topindx*factor; indx++)
   {
     var t : number = indx/factor;
     var iFound = BinarySearchSortedArray(t, A)
     document.writeln("<p>")
     document.writeln("t = ");
     document.writeln(t.toString())
     document.writeln("<p>");
     document.writeln(" iFound = ");
     document.writeln(iFound.toString());
     document.writeln("<p>")
   }

   document.writeln("Test assigned values of u that exactly equal array values")
   document.writeln("<p>")
   for (indx = 0; indx <= topindx; indx++)
   {
     var u : number = A[indx];
     var iFound = BinarySearchSortedArray(u, A)
     document.writeln("<p>")
     document.writeln("u = ");
     document.writeln(u.toString())
     document.writeln("<p>");
     document.writeln(" iFound = ");
     document.writeln(iFound.toString());
     document.writeln("<p>")
   }

   var B : Array<number> = new Array();
   B.push(1);
   B.push(2);
   B.push(2);
   B.push(3);
   B.push(4);
   B.push(4);
   B.push(4);
   B.push(5);
   B.push(5);
   B.push(6);
   B.push(6);
   ArrayLogger("Data for Array B", "B", B);

   document.writeln("Test assigned values of v that exactly equal array values")
   document.writeln("<p>")
   topindx = B.length - 1;
   for (indx = 0; indx <= topindx; indx++)
   {
     var v : number = B[indx];
     var jFound = BinarySearchSortedArray(v, B)
     document.writeln("<p>")
     document.writeln("v = ");
     document.writeln(v.toString())
     document.writeln("<p>");
     document.writeln(" jFound = ");
     document.writeln(jFound.toString());
     document.writeln("<p>")
   }

   document.writeln("<p> Leaving TestBinarySearchSortedArray()</p>");
 }

 function TestArrayLogger()
 {
   document.writeln("<p>Entering TestArrayLogger()</p>");
   let P : Array<Point> = new Array();
   let n = 10;
   for (let i = 0; i < n; i++)
   {
     P[i] = new Point(i, i+1);
   }

   ArrayLogger("list of points displayed using ArrayLogger", "P", P);
   document.writeln("<p>Leaving TestArrayLogger()</p>");
 }

 function TestLine()
 {
    document.writeln("<p>Entering TestLine()</p>");

    var P : Point = new Point(0.0, 0.0);
    var Q : Point = new Point(3.0, 4.0)
    var L : Line = new Line(P, Q);

    document.writeln(L.toString());

    const iTop : number = 10;

    for (let i =0; i <= 10; i++)
    {
      let u : number = i/iTop;
      let pos : Point = L.positionAtParm(u);
      let der : Point = L.derivativeAtParm(u);
      document.writeln("u = " + u.toString() + " ");
      document.writeln("pos = " + pos.toString() + " " + "der = " + der.toString());
      document.writeln("<p>");
    }

    document.writeln("<p>Leaving TestLine()</p>");
 }

 function TestPolyLine()
 {
   document.writeln("<p>Entering TestPolyLine()</p>");
   let P : Array<Point> = new Array();
   let n = 10;
   for (let i = 0; i < n; i++)
   {
     P[i] = new Point(i, 10*i);
   }

   ArrayLogger("Input points for PolyLine Constructor", "P", P);

   var PL : PolyLine = new PolyLine(P);
   document.writeln("Polyline PL constructed from the P");
   document.writeln("<p>")
   document.writeln(PL.toString());

   for (let j = 0; j <= 10*n; j++)
   {
     let t : number = j/n;
     let P : Point = PL.positionAtParm(t);
     document.writeln("<p>");
     document.writeln("t = ", t.toString() + " Pos = " + P.toString());
     let D : Point = PL.derivativeAtParm(t);
     document.writeln("<p>");
     document.writeln("t = ", t.toString() + " Der = " + D.toString());
   }

   document.writeln("<p>Leaving TestPolyLine()</p>");
 }

 function TestCubicSplineEvaluatorsCase001()
 {
   document.writeln("<p>Entering TestCubicSplineEvaluatorsCase001</p>");
   // First we will create a CubicSpline of one span, and create the equivalent CubicBezierCurve.
   // Then we will invoke the evaluators on each curve.
   // The test passes if the results agree, to within tolerance.
   var i : number;
   let P : Array<Point> = new Array(4);

   let P0 : Point = new Point(.2958, .7033);
   let P1 : Point = new Point(1.347, 1.2309);
   let P2 : Point = new Point(2.8049, 2.5640);
   let P3 : Point = new Point(3.14159, 2.71818);

   P[0] = P0;
   P[1] = P1;
   P[2] = P2;
   P[3] = P3;

   let theBezierCurve : CubicBezierCurve = new CubicBezierCurve(P[0], P[1], P[2], P[3]);
   document.writeln("<p>")
   document.writeln("Data for theBezierCurve");
   document.writeln("<p>");
   document.writeln(theBezierCurve.toString());

   let t : Array<number> = new Array(8);
   t[0] = 0.0;
   t[1] = 0.0;
   t[2] = 0.0;
   t[3] = 0.0;
   t[4] = 1.0;
   t[5] = 1.0;
   t[6] = 1.0;
   t[7] = 1.0;
   let theSplineCurve : CubicSpline = new CubicSpline(P, t);
   document.writeln("<p>")
   document.writeln("Data for theSplineCurve");
   document.writeln("<p>");
   document.writeln(theSplineCurve.toString());

   let s : Array<number> = new Array(7);
   const nIntervals : number = 97;
   const delta : number = 1.0/nIntervals;
   for (i = 0; i <= nIntervals; i++)
   {
     s[i] = i*delta
   }

  let maxDiff : number = 0.0;
  for (i = 0; i < s.length; i++)
  {
    let BezPos : Point = theBezierCurve.positionAtParm(s[i]);
    document.writeln("BezPos = " + BezPos.toString() + "<p>");
    let SplPos : Point = theSplineCurve.positionAtParm(s[i]);
    document.writeln("SplPos = " + SplPos.toString() + "<p>");
    let diff : number = BezPos.distanceTo(SplPos);
    maxDiff = Math.max(diff, maxDiff);
    document.writeln("diff = " + diff + "<p>");
  }
  document.writeln("maxDiff = " + maxDiff + "<p>");
  document.writeln("<p>Leaving TestCubicSplineEvaluatorsCase001</p>");
 }

 function TestCubicSplineEvaluatorsCase002()
 {
  document.writeln("<p>Entering TestCubicSplineEvaluatorsCase002</p>");
  var i : number;

  var Q0 : Point = new Point(1.00, 2.00);
  var Q1 : Point = new Point(3.00, 4.00);
  var Q2 : Point = new Point(5.00, 6.00);
  var Q3 : Point = new Point(7.00, 8.00);
  var Q4 : Point = new Point(9.00, 10.00);
  var Q5 : Point = new Point(11.00, 12.00);

  var u0 : number = 0.00;
  var u1 : number = 1.00;
  var u2 : number = 2.00;
  var u3 : number = 3.00;

  var Q : Array<Point> = new Array();
  var u : Array<number> = new Array();

  Q.push(Q0);
  Q.push(Q1);
  Q.push(Q2);
  Q.push(Q3);
  Q.push(Q4);
  Q.push(Q5);

  u.push(u0);
  u.push(u0);
  u.push(u0);
  u.push(u0);
  u.push(u1);
  u.push(u2);
  u.push(u3);
  u.push(u3);
  u.push(u3);
  u.push(u3);

  var threeSpanSpline : CubicSpline = new CubicSpline(Q,u);

  document.writeln("<p>");
  document.writeln("Data for threeSpanSpline object");
  var threeSpanSplineData : string = threeSpanSpline.toString();
  document.writeln(threeSpanSplineData);
  document.writeln("<p>");

  const kIntervals : number = 50;
  const kDelta = (u3-u0)/kIntervals
  for (i = 0; i <= kIntervals; i++)
  {
    let kArg : number = u0 + i*kDelta;
    let kPos : Point = threeSpanSpline.positionAtParm(kArg);
    document.writeln("For kArg = " + kArg + "&nbsp &nbsp &nbsp");
    document.writeln("kPos = " + kPos.toString() + "<p>");
  }
    document.writeln("<p>Leaving TestCubicSplineEvaluatorsCase002</p>");
 }

 function TestCubicSplineEvaluatorsCase003()
 {
   document.writeln("<p>Entering TestCubicSplineEvaluatorsCase003</p>");
   var P : Array<Point> = new Array();
   const basisIndex : number = 2;
   for (let i : number = 0; i < 4; i++)
   {
     P.push(new Point(i/3.0, KroneckerDelta(i,basisIndex))); // This controls the basis index
   }

   var t : Array<number> = new Array();
   t.push(0.0);
   t.push(0.0);
   t.push(0.0);
   t.push(0.0);
   t.push(1.0);
   t.push(1.0);
   t.push(1.0);
   t.push(1.0);

   var GraphOfCubic : CubicSpline = new CubicSpline(P, t);

  document.writeln("<p>");
  document.writeln("Data for GraphOfCubic object");
  var GraphOfCubicData : string = GraphOfCubic.toString();
  document.writeln(GraphOfCubicData);
  document.writeln("<p>");

  const kIntervals : number = 100;
  const iLast = t.length - 1;
  const kDelta = (t[iLast] - t[0])/kIntervals
  var maxXerror : number = 0.0;
  var maxYerror : number = 0.0;
  for (let i = 0; i <= kIntervals; i++)
  {
    let kArg : number = t[0] + i*kDelta;
    let kPos : Point = GraphOfCubic.positionAtParm(kArg);
    document.writeln("For kArg = " + kArg + "&nbsp &nbsp &nbsp");
    document.writeln("kPos = " + kPos.toString() + "<p>");
    var Xerror : number = Math.abs(kArg - kPos.x);
    var Yerror : number = Math.abs(3.0*(1.0 - kArg)*kArg*kArg - kPos.y); // to match appropriate cubic Bernstein basis function
    maxXerror = Math.max(maxXerror, Xerror);
    maxYerror = Math.max(maxYerror, Yerror);
  }
  document.writeln("maxXerror = " + maxXerror.toString() + "<p>");
  document.writeln("maxYerror = " + maxYerror.toString() + "<p>");

   document.writeln("<p>Leaving TestCubicSplineEvaluatorsCase003</p>");
 }

 function TestMarsden()
 {
   document.writeln("<p>Entering TestMarsden</p>");
   var t : Array<number> = new Array();

   t.push(2);
   t.push(2);
   t.push(2);
   t.push(2)
   t.push(7);
   t.push(11);
   t.push(13);
   t.push(13);
   t.push(13);
   t.push(13);
   const nCpts = t.length - 4;
   var P : Array<Point> = new Array();
   var i : number;
   var marsdenVals : Array<number> = new Array();
   for (i = 0; i < nCpts; i++)
   {
     marsdenVals.push(t[i+1] + t[i+2] + t[i+3]);
   }

   for (i = 0; i < marsdenVals.length; i++)
   {
     marsdenVals[i] = marsdenVals[i]/3.0;
   }
   for (i = 0; i < nCpts; i++)
   {
     P.push(new Point(marsdenVals[i],marsdenVals[i]));
   }

   var marsdenSpline : CubicSpline = new CubicSpline(P, t);

   document.writeln("<p>");
   document.writeln("Data for marsdenSpline");
   var DataForMarsdenSpline : string = marsdenSpline.toString();
   document.writeln(DataForMarsdenSpline);
   document.writeln("<p>");

   var nIntervals : number = 44;
   var delta : number = (t[t.length-1] - t[0])/nIntervals;
   var maxError = 0.0;
   for (i = 0; i <= nIntervals; i++)
   {
     let u : number = t[0] + i*delta;
     let Q : Point = marsdenSpline.positionAtParm(u);
     document.writeln("For u = " + u + "&nbsp &nbsp &nbsp");
     document.writeln("Q = " + Q.toString() + "<p>");
     let curError : number = Math.abs(Q.x - u);
     maxError = Math.max(maxError, curError);
   }
   document.writeln("<p> maxError = " + maxError.toString() + "<p>");

   // We should put addknot tests into their own routine.
   marsdenSpline.addknot(6.0);
   document.writeln("<p>");
   document.writeln("After adding a knot at 6 Data for marsdenSpline");
   var DataForMarsdenSplineAfterAddingKnot : string = marsdenSpline.toString();
   document.writeln(DataForMarsdenSplineAfterAddingKnot);
   document.writeln("<p>");

   maxError = 0.0;
   for (i = 0; i <= nIntervals; i++)
   {
     let u : number = t[0] + i*delta;
     let Q : Point = marsdenSpline.positionAtParm(u);
     document.writeln("For u = " + u + "&nbsp &nbsp &nbsp");
     document.writeln("Q = " + Q.toString() + "<p>");
     let curError : number = Math.abs(Q.x - u);
     maxError = Math.max(maxError, curError);
   }
   document.writeln("<p> maxError After Adding Knot = " + maxError.toString() + "<p>");


   document.writeln("<p>Leaving TestMarsden</p>");
 }

 function TestCubicSplineEvaluators()
 {
   document.writeln("Entering TestCubicSplineEvaluators");

  TestCubicSplineEvaluatorsCase001();
  TestCubicSplineEvaluatorsCase002();
  TestCubicSplineEvaluatorsCase003();
  TestMarsden();

   document.writeln(" Leaving TestCubicSplineEvaluators");
 }

 function get2DArray(n : number):Point[][]
 {

   var D : Point[][] = new Array(n);
   for (let i = 0; i < n; i++)
   {
     D[i] = new Array(n);
   }

   for (let i = 0; i < n; i++)
   {
     for (let j = 0; j < n; j++)
     {
       D[i][j] = new Point(i,j);
     }
   }

   return D;
 }

 function Test2DArray()
 {
   const n : number = 4;
   document.writeln("<p>Entering Test2DArray</p>");
   let D : Point[][] = get2DArray(n);
   for (let i = 0; i < n; i++)
   {
     for (let j = 0; j < n; j++)
     {
       document.writeln("<p>");
       document.writeln("D["+ i + "][" + j + "] = ")
       document.writeln(D[i][j].toString());
       document.writeln("</p>");
     }
   }
   document.writeln("<p>Leaving Test2DArray</p>");
 }

 function TestAddKnot()
 {
   document.writeln("<p>Entering TestAddKnot</p>");
   // Create two CubicSpline objects using identical input data.
   var P : Array<Point> = new Array();
   P.push(new Point(0,0));
   P.push(new Point(1,3));
   P.push(new Point(3,2));
   P.push(new Point(5,4));
   P.push(new Point(7,6));
   P.push(new Point(9,8));

   var t : Array<number> = new Array();
   t.push(0);
   t.push(0);
   t.push(0);
   t.push(0);
   t.push(2);
   t.push(7);
   t.push(10);
   t.push(10);
   t.push(10);
   t.push(10);

   var Before : CubicSpline = new CubicSpline(P, t);
   var After : CubicSpline = Before.clone();

   document.writeln("<p>");
   document.writeln("Data for Before");
   document.writeln("<p>");
   var DataForBefore : string = Before.toString();
   document.writeln(DataForBefore);
   document.writeln("<p>");

   // Then add knots to one of them
   After.addknot(2.71828);
   After.addknot(3.14159);
   After.addknot(3.14159);
   After.addknot(4.000);
   After.addknot(4.000);
   After.addknot(4.000);
   After.addknot(7);
   After.addknot(7);

   document.writeln("<p>");
   document.writeln("Data for After");
   document.writeln("<p>");
   var DataForAfter : string = After.toString();
   document.writeln(DataForAfter);
   document.writeln("<p>");


   document.writeln("<p>Testing getKnotMultiplicityAtIndex</p>");
   for (let i = -1; i <= After.ExplicitKnots.length; i++)
   {
     var multiplicity : number = After.getKnotMultiplicityAtIndex(i);
     document.writeln("<p>");
     document.writeln("For index " + i.toString() + " multiplicity = " + multiplicity.toString())
     document.writeln("</p>");
   }

// Then do an evaluation test
   var maxDiff = 0.0;
   const nIntervals : number = 7033;
   const Delta : number = 1/nIntervals;

   for (let i = 0; i <= nIntervals; i++)
   {
     var s : number = t[0] + i*Delta;
     var PtOnBefore : Point = Before.positionAtParm(s);
     var PtOnAfter : Point = After.positionAtParm(s);
     var Diff : number = PtOnBefore.distanceTo(PtOnAfter);
     maxDiff = Math.max(Diff, maxDiff)
   }

   document.writeln("<p> maxError After Adding Knot = " + maxDiff.toString() + "<p>");

   document.writeln("<p>Leaving TestAddKnot</p>");
 }

 function TestConvertToPolyBezier()
 {
   document.writeln("<p>Entering TestConvertToPolyBezier</p>"); 
   var P : Array<Point> = new Array();
   P.push(new Point(0,0));
   P.push(new Point(1,3));
   P.push(new Point(3,2));
   P.push(new Point(5,4));
   P.push(new Point(7,6));
   P.push(new Point(9,8));

   var t : Array<number> = new Array();
   t.push(0);
   t.push(0);
   t.push(0);
   t.push(0);
   t.push(2);
   t.push(7);
   t.push(10);
   t.push(10);
   t.push(10);
   t.push(10);

   var theSpline : CubicSpline = new CubicSpline(P, t);
   
   theSpline.addknot(2.71828);
   theSpline.addknot(3.14159);
   theSpline.addknot(3.14159);
   theSpline.addknot(4.000);
   theSpline.addknot(4.000);
   theSpline.addknot(4.000);
   theSpline.addknot(7);
   theSpline.addknot(7);

   document.writeln("<p>");
   document.writeln("Data for theSpline");
   document.writeln("<p>");
   var DataFortheSpline : string = theSpline.toString();
   document.writeln(DataFortheSpline);
   document.writeln("<p>");

   var thePolyBezier : PolyBezier = theSpline.convertToPolyBezier();

   document.writeln("<p>");
   document.writeln("Data for thePolyBezier");
   document.writeln("<p>");
   var DataForthePolyBezier : string = thePolyBezier.toString();
   document.writeln(DataForthePolyBezier);
   document.writeln("<p>");

   var a : number = theSpline.ExplicitKnots[0];
   var b : number = theSpline.ExplicitKnots[theSpline.ExplicitKnots.length-1];
   const nIntervals : number = 777;
   const delta : number = (b -a )/nIntervals;
   var maxError = 0.0;

   for (let i = 0; i <= nIntervals; i++)
   {
     var u : number = 1 + i*delta;
     var splPos : Point = theSpline.positionAtParm(u);
     var bezPos : Point = thePolyBezier.positionAtParm(u);
     var error : number = splPos.distanceTo(bezPos);
     maxError = Math.max(error, maxError);
   }
   
   document.writeln("maxError = " + maxError.toString());

    document.writeln("<p>Leaving TestConvertToPolyBezier</p>");  
 }

 function TestCubicSplineEvaluatorsAtParm()
 {
   document.writeln("<p>Entering TestCubicSplineEvaluatorsAtParm</p>");
   
   var t : Array<number> = new Array();
   t.push(0);
   t.push(0);
   t.push(0);
   t.push(0)
   t.push(1);
   t.push(1);
   t.push(1);
   t.push(1);
     
   const nCpts = t.length - 4;
   var P : Array<Point> = new Array();
   var i : number;
  
   for (i = 0; i < nCpts; i++)
   {
     P.push(new Point(KroneckerDelta(i,2),KroneckerDelta(i,3)));
   }

// We are constructing the curve whose X component and Y component
// are each cubic Bernstein polynomials.

   var ParametricBernstein : CubicSpline = new CubicSpline(P, t);

   ParametricBernstein.addknot(.37);
   ParametricBernstein.addknot(.53);
   ParametricBernstein.addknot(.53);

   const nIntervals : number = 100;
   const delta : number = (t[t.length-1] - t[0])/nIntervals;
   var maxPosDiff = 0.0;
   var maxDerDiff = 0.0;
   for (i = 0; i <= nIntervals; i++)
   {
     var u = t[0] + i*delta;
     var expectedPositionX : number = 3*(1.0-u)*u*u;
     var expectedPositionY : number = u*u*u;
     var expectedPosition : Point = new Point(expectedPositionX, expectedPositionY);
     var computedPosition = ParametricBernstein.positionAtParm(u);
     document.writeln("<p>For u = " + u + "&nbsp &nbsp &nbsp" + "<p>");
     document.writeln("expectedPosition = " + expectedPosition.toString() + "<p>");
     document.writeln("computedPosition = " + computedPosition.toString() + "<p>");
     var PosDiff : number = expectedPosition.distanceTo(computedPosition);
     maxPosDiff = Math.max(PosDiff, maxPosDiff);

     var expectedDerivativeX : number = 6*u - 9*u*u;
     var expectedDerivativeY : number = 3*u*u;
     var expectedDerivative : Point = new Point(expectedDerivativeX, expectedDerivativeY);
     var computedDerivative = ParametricBernstein.derivativeAtParm(u);
     document.writeln("<p>For u = " + u + "&nbsp &nbsp &nbsp" + "<p>");
     document.writeln("expectedDerivative = " + expectedDerivative.toString() + "<p>");
     document.writeln("computedDerivative = " + computedDerivative.toString() + "<p>");
     var DerDiff : number = expectedDerivative.distanceTo(computedDerivative);
     maxDerDiff = Math.max(DerDiff, maxDerDiff);
   }
   document.writeln("<p>maxDiff between expectedPosition and computedPosition = " + maxPosDiff + "<p>");
   document.writeln("<p>maxDiff between expectedDerivative and computedDerivative = " + maxDerDiff + "<p>");
   document.writeln("<p>Leaving  TestCubicSplineEvaluatorsAtParm</p>");  
 }

 function TestGetGraphsOfCubicBSplineBasisFunctions()
 {
   document.writeln("<p>Entering TestGetGraphsOfCubicBSplineBasisFunctions</p>");
   var t : Array<number> = new Array();
   t.push(0);
   t.push(0);
   t.push(0);
   t.push(0);
   t.push(1);
   t.push(3);
   t.push(7);
   t.push(9);
   t.push(9);
   t.push(9);
   t.push(9);
     
   const nCpts = t.length - 4;
   var P : Array<Point> = new Array();
   var i : number;
   var j : number;
  
   P.push(new Point(2,5));
   P.push(new Point(3,8));
   P.push(new Point(5,11))
   P.push(new Point(12,14));
   P.push(new Point(15,13));
   P.push(new Point(17,19));
   P.push(new Point(21, 23));




   var theCubicSpline : CubicSpline = new CubicSpline(P, t);

   theCubicSpline.addknot(2.958);
   theCubicSpline.addknot(7.033);
   theCubicSpline.addknot(7.033);

   var GraphsOfCubicBSplineBasisFunctions : CubicSpline[] = getGraphsOfCubicBSplineBasisFunctions(theCubicSpline.ExplicitKnots);

   var nGraphs = GraphsOfCubicBSplineBasisFunctions.length;

   for (let iGraph = 0; iGraph < nGraphs; iGraph++)
   {
     document.writeln("<p>Graph of basis function with index = " + iGraph.toString() + "</p>");
     document.writeln(GraphsOfCubicBSplineBasisFunctions[iGraph].toString());
   }

   const nIntervals : number = 7777;
   const delta : number = (t[t.length-1] - t[0])/nIntervals;
   var maxError : number;
   var curError : number;
   var u : number;
   document.writeln("<p>Begin x-component test</p>");
   maxError = 0;
   for (i = 0; i < GraphsOfCubicBSplineBasisFunctions.length; i++)
   {
     for (j = 0; j <= nIntervals; j++)
     {
       u = t[0] + j*delta; 
       var Pos : Point = GraphsOfCubicBSplineBasisFunctions[i].positionAtParm(u);
       var actualXcomponent : number = Pos.x;
       var expectedXcomponent : number = u;
       curError = Math.abs(actualXcomponent-expectedXcomponent);
       maxError = Math.max(curError, maxError);
     }
   }
   document.writeln("<p>maxError in x-component test = " + maxError.toString() + "</p>");
   document.writeln("<p>End x-component test</p>");
   
   document.writeln("<p>Begin partition of unity test</p>");
   maxError = 0;
   const expectedSumOfBasisFunctions : number = 1.0;
   for (j = 0; j <= nIntervals; j++)
   {
     u = t[0] + j*delta;
     var actualSumOfBasisFunctions : number = 0;
     for (i = 0; i < GraphsOfCubicBSplineBasisFunctions.length; i++)
     {
       var Pos : Point = GraphsOfCubicBSplineBasisFunctions[i].positionAtParm(u);
       actualSumOfBasisFunctions = actualSumOfBasisFunctions + Pos.y;
     }
     curError = Math.abs(actualSumOfBasisFunctions - expectedSumOfBasisFunctions);
     maxError = Math.max(curError, maxError);
   }
   document.writeln("<p>maxError in partition of unity test = " + maxError.toString() + "</p>");
   document.writeln("<p>End partition of unity test</p>");


   document.writeln("<p>Begin linear-combination vs evaluator test</p>");
   maxError = 0.0;
   
   for (j = 0; j <= nIntervals; j++)
   {
     u = t[0] + delta;
     var PositionFromEvaluation : Point = theCubicSpline.positionAtParm(u);

     var PositionFromLinearCombination : Point = new Point(0.0, 0.0);
     for (i = 0; i < GraphsOfCubicBSplineBasisFunctions.length; i++)
     {
       var basisval : number = GraphsOfCubicBSplineBasisFunctions[i].positionAtParm(u).y;
       var curContribution : Point = theCubicSpline.CtrlPts[i].scalarMult(basisval);
       PositionFromLinearCombination = PositionFromLinearCombination.plus(curContribution)
     }
     curError = PositionFromEvaluation.distanceTo(PositionFromLinearCombination);
     maxError = Math.max(curError, maxError);
   }
   document.writeln("<p>maxError in linear-combination vs evaluator test = " + maxError.toString() + "</p>");
   document.writeln("<p>End linear-combination vs evaluator test</p>");
   
   document.writeln("<p>Leaving TestGetGraphsOfCubicBSplineBasisFunctions</p>");
 }

 function TestInitializeCubicSpline()
 {
   var theDrawDataForSpline : CurveDrawData = defaultDrawDataForBCurve();
   var theDrawDataForControlPolygon : CurveDrawData = defaultDrawDataForControlPolygon();
   var theDrawDataForControlPoints : CircleDrawData = defaultDrawDataForControlPoints();
   var theDrawDataForPointOnCurve : CircleDrawData = defaultDrawDataForPointOnCurve();
   var theDrawDataForKnots : RectangleDrawData = defaultDrawDataForKnots();
   var fillColor : string = "white";
   var strokeColor : string = "black";
   var curveWidth : number = 1;
   var theDrawDataForControlPointsWithMaxRadius : CircleDrawData = new CircleDrawData(fillColor, strokeColor, curveWidth);
   
   var theCubicSpline : CubicSpline = initializeCubicSpline();
   clearCanvas();
   var context : CanvasRenderingContext2D = getDrawingContext();

   theCubicSpline.drawCurve(theDrawDataForSpline, context);
   theCubicSpline.drawControlPolygon(theDrawDataForControlPolygon, context);
   var radius = 30.0;
     
   tGlobal = 0.25;
   
   theCubicSpline.drawControlPointsWeightedForParm(tGlobal, theDrawDataForControlPoints, context);
   theCubicSpline.drawControlPointsWithMaxRadius(theDrawDataForControlPointsWithMaxRadius, context);
   theCubicSpline.drawPointOnCurveForParm(tGlobal, globalConstPointOnCurveRadius, theDrawDataForPointOnCurve, context);
   var width = radius/2.0;
   var height = radius/3.0;
   theCubicSpline.drawKnots(width, height, theDrawDataForKnots, context);

   // Begin experiment
   const basisValTol : number = 0.000000001;
   var w : number = getDrawingCanvas().width;
   var h : number = getDrawingCanvas().height;
   // var d : number = theCubicSpline.ExplicitKnots[theCubicSpline.ExplicitKnots.length-1]-theCubicSpline.ExplicitKnots[0];
   var d : number = 5;
   var s : number = Math.min(h, w/d);
   s = s/2;
   var sy : number = s;
   // var L = theCubicSpline.ExplicitKnots[theCubicSpline.ExplicitKnots.length-1]-theCubicSpline.ExplicitKnots[0];
   var L : number = 5; // experiment.
   
   var sx : number = sy/L;
   var stretchFac : number = 3; // experiment
   sx = sx*stretchFac; // experiment
   var theDrawDataForBasisFunctions : CurveDrawData = defaultDrawDataForGraphOfBasisFunction();
   var drawDataForPointOnSleepingGraph : CircleDrawData = defaultDrawDataForPointOnGraph();
   drawDataForPointOnSleepingGraph.fillColor = "black";
   drawDataForPointOnSleepingGraph.strokeColor = "black";
   var drawDataForPointOnAwakenedGraph : CircleDrawData = defaultDrawDataForPointOnGraph();
   drawDataForPointOnAwakenedGraph.fillColor = "blue";
   drawDataForPointOnAwakenedGraph.strokeColor = "blue";
   var D : Point[][] = theCubicSpline.DeBoorTriangleAtParm(tGlobal);
   var drawDataForDeBoorPoints : CircleDrawData = defaultDrawDataForIntermediatePoints();
   drawAllDeBoorPoints(D, drawDataForDeBoorPoints, context);
   var drawDataForDeBoorLines : CurveDrawData = defaultDrawDataForIntermediateLines();
   drawAllDeBoorLines(D, drawDataForDeBoorLines, context);
   
   var yDelta : Point = new Point(0, -sy);
   var xDelta : Point = new Point(sx, 0);
   var pointOnGraphRadius : number = 3.0;

   for (let i : number = 0; i < globalGraphsOfCubicBSplineBasisFunctions.length; i++)
   {
      var drawDataForPointOnGraph : CircleDrawData;
      var basisVal : number = globalGraphsOfCubicBSplineBasisFunctions[i].positionAtParm(tGlobal).y
      if (basisVal > basisValTol)
      {
        drawDataForPointOnGraph = drawDataForPointOnAwakenedGraph;
      }
      else
      {
        drawDataForPointOnGraph = drawDataForPointOnSleepingGraph;
      }
      var ClonedSpline = globalGraphsOfCubicBSplineBasisFunctions[i].clone();
      var nCtrlPts = ClonedSpline.CtrlPts.length;
      for (let iPt : number = 0; iPt < nCtrlPts; iPt++)
      {
        ClonedSpline.CtrlPts[iPt].y = 1.0 - ClonedSpline.CtrlPts[iPt].y; // could implement a yMirror method.
      }
            
      ClonedSpline.scale(sx, sy);
      ClonedSpline.translate(theCubicSpline.CtrlPts[i]);
      ClonedSpline.translate(yDelta);
      ClonedSpline.translate(xDelta);
      // See if I can move the graphs downward by an amount equal to the radius of the big control point circles
      var bigR : number = globalControlPointTargets[i].radius;
      var movebyBigR : Point = new Point(0.0, bigR);
      ClonedSpline.translate(movebyBigR);
      // See if I can move the graphs to the left so that min x on graph equals max x on corresponding control point circle
      var max_x_on_circle : number = globalControlPointTargets[i].center.x + globalControlPointTargets[i].radius;
      var min_x_on_graph : number = ClonedSpline.getBoundingBox().xMin;
      var moveLeft : Point = new Point(max_x_on_circle-min_x_on_graph, 0.0);
      ClonedSpline.translate(moveLeft);

      ClonedSpline.drawCurve(theDrawDataForBasisFunctions, context);
      ClonedSpline.drawPointOnCurveForParm(tGlobal, pointOnGraphRadius, drawDataForPointOnGraph, context);

      // test getBoundingBox
      // var BoundingBox : Rectangle = ClonedSpline.getBoundingBox();
      // var theDrawDataForBoundingBox: RectangleDrawData = new RectangleDrawData("white", "red", 1);
      // BoundingBox.stroke(theDrawDataForBoundingBox, context);
     
   }
   // End experiment

 }

function TestSomeGlobals()
{
  let canvas : HTMLCanvasElement  = getDrawingCanvas();
  document.writeln("canvas.height = " + canvas.height + "<p>");
  document.writeln("globalMaxRadius = " + globalMaxRadius + "<p>");
  var should_be_close_to_zero = globalSumOfControlPointAreas - Math.PI*globalMaxRadius*globalMaxRadius;
  document.writeln("should_be_close_to_zero = " + should_be_close_to_zero + "<p>");
}

function TestSlider()
{
  UpdateTglobalBasedOnSlider();
  var context : CanvasRenderingContext2D = getDrawingContext()
  var drawDataForAllBCurveArtifacts : BCurveArtifactsDrawData = new BCurveArtifactsDrawData();
  globalBCurve.drawAllBCurveArtifacts(drawDataForAllBCurveArtifacts, context);
}

function TestDeCasteljauTriangleAtParm()
{
  document.writeln("<p>Entering TestDeCasteljauTriangleAtParm</p>");
  let P0 : Point = new Point(0, 0);
  let P1 : Point = new Point(2, 7);
  let P2 : Point = new Point(3, 11);
  let P3 : Point = new Point(5, 13)
  let C : CubicBezierCurve = new CubicBezierCurve(P0, P1, P2, P3);;
  let t : number = 0.3;
  let D : Point[][] = C.DeCasteljauTriangleAtParm(t);
  document.writeln("<p>Begin Evaluation Tests</p>");
  const nIntervals : number = 1024;
  const delta : number = 1.0/nIntervals;
  const degree : number = 3;
  let i : number;
  let j : number;
  let k : number;
  let maxError = 0.0;
  for (i = 0; i <= nIntervals; i++)
  {
    let t : number = i*delta;
    let D : Point[][] = C.DeCasteljauTriangleAtParm(t);
    let P : Point = D[degree][degree];
    let Q : Point = C.positionAtParm(t);
    let curError : number = P.distanceTo(Q);
    maxError = Math.max(curError, maxError);
  }
  document.writeln("<p>maxError = " + maxError.toString() + "</p>");
  document.writeln("<p>  End Evaluation Tests</p>");
  document.writeln("<p>Begin In-Depth Tests</p>");
  maxError = 0.0;
  for (i = 0; i <= nIntervals; i++)
  {
    let t : number = i*delta;
    let D : Point[][] = C.DeCasteljauTriangleAtParm(t);
    let P: Array<Point> = C.CtrlPts;
    for (j = 1; j <= degree; j++)
    {
      P = doOneDeCasteljauStep(P, t)
      for (k = j; k <= degree; k++)
      {
        let curError : number = P[k-j].distanceTo(D[j][k]);
        maxError = Math.max(curError, maxError);
      }
    }
   }
  document.writeln("<p>maxError = " + maxError.toString() + "</p>");
  document.writeln("<p>  End In-Depth Tests</p>");
  document.writeln("<p> Leaving TestDeCasteljauTriangleAtParm</p>");
}

function doTests()
{
   var date : Date = new Date();
   document.writeln(date.toString());
   // TestPolyBezier();
   // TestDrawData();
   // TestBinarySearchSortedArray();
   // TestArrayLogger();
   // TestLine();
   // TestPolyLine();
   // TestCubicSpline();
   // TestCubicSplineEvaluators();
   // Test2DArray()
   // TestAddKnot();
   // TestConvertToPolyBezier();
   // TestCubicSplineEvaluatorsAtParm();
   // TestGetGraphsOfCubicBSplineBasisFunctions();
   // TestInitializeCubicSpline()
   // TestSomeGlobals();
   TestDeCasteljauTriangleAtParm(); // there is currently trouble invoking DeCasteljauTriangleAtParm
   document.writeln("<p>Reload browser (or click back button) to continue exploring Bezier and spline curve</p>");
   }
