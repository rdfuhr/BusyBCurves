// <!-- Copyright (C) 2017 Richard David Fuhr - All rights reserved. -->
// <!-- richard.fuhr@gmail.com -->

// TODO: Started Mar 03, 2017
// TODO: Mar 03, 2017: Implement a Line class. - DONE
// TODO: Mar 03, 2017: Implement a PolyLine class. - DONE
// TODO: Mar 03, 2017: Implement a Rectangle class. - 
// TODO: Mar 05, 2017: Refactor code in PolyLine evaluators - DONE
// TODO: Mar 06, 2017: Refactor code in PolyBezieer evaluators - DONE
// TODO: Mar 08, 2017: Change CubicSpline constructor so it is more general (any number of control points and distinct knots and multiplicities)
// TODO: Mar 08, 2017: Test deBoorTriangleAt:
// TODO: Mar 08, 2017: Test CubicSpline::positionAtParm

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

var globalPointOnCurveForParmTarget : Circle; // cannot be made a const
var globalControlPointTargets : Array<Circle> = new Array();
var tGlobal : number = 0.0; // cannot be made a const
var tDeltaGlobal : number = 0.001; // cannot be made a const
const globalCircleAreaFactor : number = 2.0;
const globalCircleRadiusFactor : number = Math.sqrt(globalCircleAreaFactor);
const globalConstSumOfControlPointAreas : number = globalCircleAreaFactor*10000.0;
const globalConstMaxRadius : number = Math.sqrt(globalConstSumOfControlPointAreas/Math.PI);
const globalConstMaxDiameter : number = 2.0*globalConstMaxRadius;
const globalConstPointOnCurveRadius : number = globalCircleRadiusFactor*15.0;

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
     var x = this.x + that.x;
     var y = this.y + that.y;
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
     var x = this.x - that.x;
     var y = this.y - that.y;
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
     var x = s*this.x;
     var y = s*this.y;
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

class BezierArtifactsDrawData
{ // Begin class BezierArtifactsDrawData 
  forBezierCurve : CurveDrawData;
  forControlPolygon : CurveDrawData;
  forControlPoints : CircleDrawData;
  forPointOnCurve : CircleDrawData;
  forDecasteljauLines : CurveDrawData;
  forDecasteljauPoints : CircleDrawData;
  forGraphOfCubicBernstein : CurveDrawData;
  forPointOnGraph : CircleDrawData;
  forVerticalLineFromCurveForParm : CurveDrawData;
  forTextNearPointOnCurve : TextDrawData;
  forTextNearPointOnGraph : TextDrawData;

  //////////////////////////////////////////////////////////////////////////////
  // constructor for BezierArtifactsDrawData
  // Creates an instance of BezierArtifactsDrawData
  //
  // Set each data member to the default value
  // 
  ////////////////////////////////////////////////////////////////////////////// 
  constructor()
  {
    this.forBezierCurve = defaultDrawDataForBezierCurve();
    this.forControlPolygon = defaultDrawDataForControlPolygon();
    this.forControlPoints = defaultDrawDataForControlPoints();
    this.forPointOnCurve = defaultDrawDataForPointOnCurve();
    this.forDecasteljauLines = defaultDrawDataForDecasteljauLines();
    this.forDecasteljauPoints = defaultDrawDataForDecasteljauPoints();
    this.forGraphOfCubicBernstein = defaultDrawDataForGraphOfCubicBernstein();
    this.forPointOnGraph = defaultDrawDataForPointOnGraph();
    this.forVerticalLineFromCurveForParm = defaultDrawDataForVerticalLineFromCurveForParm();
    this.forTextNearPointOnCurve = defaultDrawDataForTextNearPointOnCurve();
    this.forTextNearPointOnGraph = defaultDrawDataForTextNearPointOnGraph();
  }

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of BezierArtifactsDrawData
  // Returns the string representation of this BezierArtifactsDrawData
  //
  // returns: the string representation of this BezierArtifactsDrawData
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
    var stringRep : string = "Begin data for this BezierArtifactsDrawData\n";

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forBezierCurve"; 
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forBezierCurve.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forControlPolygon"; 
    stringRep = stringRep + "<p>";
    stringRep = stringRep + this.forControlPolygon.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forControlPoints";
    stringRep = stringRep + "<p>";    
    stringRep = stringRep + this.forControlPoints.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forPointOnCurve";
    stringRep = stringRep + "<p>";     
    stringRep = stringRep + this.forPointOnCurve.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forDecasteljauLines";
    stringRep = stringRep + "<p>";     
    stringRep = stringRep + this.forDecasteljauLines.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forDecasteljauPoints";
    stringRep = stringRep + "<p>";     
    stringRep = stringRep + this.forDecasteljauPoints.toString();

    stringRep = stringRep + "<p>";
    stringRep = stringRep + "Data for this.forGraphOfCubicBernstein";
    stringRep = stringRep + "<p>";     
    stringRep = stringRep + this.forGraphOfCubicBernstein.toString();

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
    stringRep = stringRep + "End data for this BezierArtifactsDrawData";
    stringRep = stringRep + "<p>";    

    return stringRep;
  }

} //   End class BezierArtifactsDrawData


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
	for (var i = 0; i < n-1; i++)
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
      for (var i = 0; i < n-1; i++)
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
   var n : number = P.length
   for (var i = 0; i < n-1; i++)
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
   var n : number = P.length
   for (var i = 0; i < n-1; i++)
   {  // begin i-loop
      P = doOneDeCasteljauStep(P, t); // so we are overwriting P
      var m : number = P.length;
      for (var j = 0; j < m; j++)
      {   // begin j-loop
          P[j].drawCircleHere(3.0, drawData, context)
      }   //   end j-loop
   }  //  end i-loop
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
  for(var i = 0; i < d; i++)
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
    for (var i = n-k+1; i <= n; i++) coeff *= i;
    for (var i = 1;     i <= k; i++) coeff /= i;
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


class CubicBezierCurve
{ // Begin class CubicBezierCurve
  CtrlPts : Array<Point>;

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
     for (var i = 0; i < n; i++)
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
  // scale - method of CubicBezierCurve
  // Scales this CubicBezierCurve using specified scale factors
  //
  // input: xScale - the scale factor in the x direction
  // input: yScale - the scale factor in the y direction
  //////////////////////////////////////////////////////////////////////////////
  scale(xScale : number,
        yScale : number)
  {
     for (var i = 0; i < this.CtrlPts.length; i++)
     {
        this.CtrlPts[i].x *= xScale;
        this.CtrlPts[i].y *= yScale;
     }
  }

  //////////////////////////////////////////////////////////////////////////////
  // translate - method of CubicBezierCurve
  // Traslates this CubicBezierCurve using specified displacement
  //
  // input: P - specified displacement
  //////////////////////////////////////////////////////////////////////////////
  translate(P : Point)
  {
     for (var i = 0; i < this.CtrlPts.length; i++)
     {
        this.CtrlPts[i].x += P.x;
        this.CtrlPts[i].y += P.y;
     }
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
  // drawControlPolygon - method of CubicBezierCurve
  // Draws control polygon of this CubicBezierCurve with specified appearance
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
  // drawControlPoints - method of CubicBezierCurve
  // Draws control points of this CubicBezierCurve with specified appearance
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
     for (var i = 0; i < n; i++)
     {
        controlPoints[i].drawCircleHere(radius, drawData, context);
     }
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
     var controlPoints : Array<Point> = this.CtrlPts;
     var order : number = controlPoints.length;
     var degree : number = order - 1;

     for (var i = 0; i < order; i++)
     {
        var actualArea : number = globalConstSumOfControlPointAreas*bernsteinValue(i, degree, t);
        // NOTE: actualArea = Math.PI*(actualRadius)^2
        // so actualRadius = sqrt(actualArea/Math.PI)
        var actualRadius : number = Math.sqrt(actualArea/Math.PI);
        controlPoints[i].drawCircleHere(actualRadius, drawData, context);
        globalControlPointTargets[i] = new Circle(controlPoints[i], actualRadius);
     }

  }

  //////////////////////////////////////////////////////////////////////////////
  // drawPointOnCurveForParm - method of CubicBezierCurve
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
     for (var i = 1; i < controlPoints.length; i++)
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
                             drawDataForAllBezierArtifacts : BezierArtifactsDrawData,
                             context: CanvasRenderingContext2D)
  {
     // We will use globalConstMaxRadius to help position the graphs.
 
     var delta1 = new Point( 1.0*globalConstMaxRadius, -1.0*globalConstMaxRadius);
     var delta2 = new Point(-3.0*globalConstMaxRadius, -1.0*globalConstMaxRadius);
     var upperLeft

     for (var indx = 0; indx < 4; indx++)
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
                                                               globalConstMaxDiameter,
                                                               globalConstMaxDiameter);

        graphOfCubicBernstein.drawCurve(drawDataForAllBezierArtifacts.forGraphOfCubicBernstein, context);

        var pointOnGraphRadius = 3.0;

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
  // drawAllBezierArtifacts - method of CubicBezierCurve
  // Draw all information associated with this CubicBezierCurve
  //
  // input: drawDataForAllBezierArtifacts - styles for drawing everything
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawAllBezierArtifacts(drawDataForAllBezierArtifacts : BezierArtifactsDrawData,
                         context : CanvasRenderingContext2D)
  {
     this.drawCurve(drawDataForAllBezierArtifacts.forBezierCurve, context);
     this.drawControlPolygon(drawDataForAllBezierArtifacts.forControlPolygon, context);

     this.drawControlPointsWeightedForParm(tGlobal,
                                           drawDataForAllBezierArtifacts.forControlPoints,
                                           context);

     this.drawPointOnCurveForParm(tGlobal,
                                  globalConstPointOnCurveRadius,
                                  drawDataForAllBezierArtifacts.forPointOnCurve,
                                  context);

      var pointOnCurve : Point = this.positionAtParm(tGlobal);
      globalPointOnCurveForParmTarget  = new Circle(pointOnCurve, globalConstPointOnCurveRadius);

      var textLocation : Point = new Point(pointOnCurve.x, pointOnCurve.y - globalConstPointOnCurveRadius);

      drawTextForNumber(tGlobal,
                        textLocation,
                        drawDataForAllBezierArtifacts.forTextNearPointOnCurve,
                        context);

       this.drawBasisFunctionsWithParm(tGlobal,
                                       drawDataForAllBezierArtifacts,
                                       context);

      drawAllDeCasteljauLines(this.CtrlPts,
                              tGlobal,
                              drawDataForAllBezierArtifacts.forDecasteljauLines,
                              context);

      
      drawAllDeCasteljauPoints(this.CtrlPts,
                               tGlobal,
                               drawDataForAllBezierArtifacts.forDecasteljauPoints,
                               context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // editPointOnCurve - method of CubicBezierCurve
  // Called when user has clicked the point on this curve and is moving it.
  //
  // input: evt - the mouse event
  // input: drawDataForAllBezierArtifacts - styles for drawing everything
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
                   drawDataForAllBezierArtifacts : BezierArtifactsDrawData,
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
     if (tGlobal < 0.0) tGlobal = 0.0;
     if (tGlobal > 1.0) tGlobal = 1.0;

     context.clearRect(0, 0, canvas.width, canvas.height);
     this.drawAllBezierArtifacts(drawDataForAllBezierArtifacts,
                                 context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // editControlPoint - method of CubicBezierCurve
  // Called when user has clicked a control point on this curve and is moving it
  //
  // input: evt - the mouse event
  // input: drawDataForAllBezierArtifacts - styles for drawing everything
  // input: context - the context associated with the canvas
  // input: canvas - the canvas on which we are drawing
  //
  // TODO: I think we can get by without passing the canvas as a parameter
  // because we should be able to get it from evt.
  //
  //////////////////////////////////////////////////////////////////////////////
  editControlPoint(evt : MouseEvent,
                   drawDataForAllBezierArtifacts : BezierArtifactsDrawData,
                   context : CanvasRenderingContext2D,
                   canvas : HTMLCanvasElement) 
  {
     var mousePos : Point = getMousePos(canvas, evt);
     this.CtrlPts[globalIndexOfModifiedControlPoint] = mousePos;
     context.clearRect(0, 0, canvas.width, canvas.height);

     this.drawAllBezierArtifacts(drawDataForAllBezierArtifacts,
                                 context);
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
   var document : Document;
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
   if (tGlobal > 1.0)
   {
      tGlobal = 1.0;
      tDeltaGlobal = -1.0*tDeltaGlobal;
   }
   else
   if (tGlobal < 0.0)
   {
      tGlobal = 0.0;
      tDeltaGlobal = -1.0*tDeltaGlobal;
   }
}

////////////////////////////////////////////////////////////////////////////////
// initializeCubicBezierCurve - function
// Construct CubicBezierCurve in its initial state
//
// returns: a CubicBezierCurve
////////////////////////////////////////////////////////////////////////////////
function initializeCubicBezierCurve() : CubicBezierCurve
{
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
// defaultDrawDataForBezierCurve - function
// Return the default draw data for the Bezier curve.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForBezierCurve() : CurveDrawData
{
  const curveStrokeColor : string = "red";
  const curveWidth : number = 10;
  var drawDataForBezierCurve : CurveDrawData =
     new CurveDrawData(curveStrokeColor, curveWidth);
  return drawDataForBezierCurve;
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
// defaultDrawDataForDecasteljauLines - function
// Return the default draw data for the Decasteljau Lines.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForDecasteljauLines() : CurveDrawData
{
  const strokeColor : string = "brown";
  const curveWidth : number = 2;
  var drawDataForDeCasteljauLines : CurveDrawData = new CurveDrawData(strokeColor, curveWidth);
  return drawDataForDeCasteljauLines;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForDecasteljauPoints - function
// Return the default draw data for the Decasteljau Points.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForDecasteljauPoints() : CircleDrawData
{
  const fillColor : string = "orange"
  const strokeColor : string = "orange"
  const strokeWidth : number = 5.0;
  var drawDataForDeCasteljauPoints = new CircleDrawData(fillColor,
                                                            strokeColor,
                                                            strokeWidth);
  return drawDataForDeCasteljauPoints;
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForGraphOfCubicBernstein - function
// Return the default draw data for the graphs of the cubic Bernstein polynomials.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForGraphOfCubicBernstein() : CurveDrawData
{
  const graphStrokeColor : string = "green";
  const graphWidth : number = 2;
  var drawDataForGraphOfCubicBernstein : CurveDrawData = new CurveDrawData(graphStrokeColor,
                                                                           graphWidth);
  return drawDataForGraphOfCubicBernstein;                                                               
}

////////////////////////////////////////////////////////////////////////////////
// defaultDrawDataForPointOnGraph - function
// Return the default draw data for the point on each graph of the cubic Bernstein polynomials.
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
// Return the default draw data for the text near the point on the main Bezier curve.
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
// Return the default draw data for the text near the points on graphs of the Bernstein basis functions.
//
////////////////////////////////////////////////////////////////////////////////
function defaultDrawDataForTextNearPointOnGraph() : TextDrawData
{
  const fontSpec : string = 'lighter 45px Sans-Serif';
  const fillColor = "black";
  var drawDataForTextNearPointOnGraph : TextDrawData = new TextDrawData(fontSpec, fillColor);
  return drawDataForTextNearPointOnGraph;  
}


//   End implementing functions that construct and return draw data.

////////////////////////////////////////////////////////////////////////////////
// animation - function
// Manage the animation in which a point moves back and forth along a Bezier
// curve, and in which the size of the control points and the indicators on the graphs
// of the basis functions vary accordingly.  One call to this function generates
// one frame of the animation.
//
// input: drawingCanvas - the canvas on which we are drawing
// input: drawingContext - the context associated with the canvas
// input: C - the main CubicBezierCurve
// input: drawDataForAllBezierArtifacts - styles for drawing everything
//
////////////////////////////////////////////////////////////////////////////////
function animation(drawingCanvas : HTMLCanvasElement,
                   drawingContext : CanvasRenderingContext2D,
                   C : CubicBezierCurve,
                   drawDataForAllBezierArtifacts : BezierArtifactsDrawData) 
{
   drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

   tGlobalUpdate(); // the global value of t is adjusted

   C.drawAllBezierArtifacts(drawDataForAllBezierArtifacts,
                            drawingContext);
}

////////////////////////////////////////////////////////////////////////////////
// DisableEnableButtons - function
// Disable and enable specified buttons
//
// input: startAnimationButtonDisabled - disable if true, enable if false
// input: stopAnimationButtonDisabled - disable if true, enable if false
// input: exploreWithMouseButtonDisabled - disable if true, enable if false
////////////////////////////////////////////////////////////////////////////////
function DisableEnableButtons(startAnimationButtonDisabled : boolean,
                              stopAnimationButtonDisabled : boolean,
                              exploreWithMouseButtonDisabled : boolean)
{
   var startAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StartAnimation");
   var stopAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StopAnimation");
   var exploreWithMouseButton : HTMLInputElement = <HTMLInputElement>document.getElementById("ExploreWithMouse");
   startAnimationButton.disabled = startAnimationButtonDisabled;
   stopAnimationButton.disabled = stopAnimationButtonDisabled;
   exploreWithMouseButton.disabled = exploreWithMouseButtonDisabled;
}

////////////////////////////////////////////////////////////////////////////////
// Note:  It would be nice if we could replace globalLoop with a non-global, but that
// may not be possible  From experimentation, it seems that globalLoop is an integer
// that gets incremented by 1 each time that setInterval is called, with the first
// value seen (after calling setInterval the first time) being 1.
var globalLoop : number; //used by StartAnimation and StopAnimation

////////////////////////////////////////////////////////////////////////////////
// StartAnimation - function
// Enable and disable the appropriate buttons and set the animation interval.
// Initialize the data to be passed to the function that generates each frame
// of the animation.
////////////////////////////////////////////////////////////////////////////////
function StartAnimation()
{
   var startAnimationButtonDisabled : boolean = true;
   var stopAnimationButtonDisabled : boolean = false;
   var exploreWithMouseButtonDisabled : boolean = true;
   DisableEnableButtons(startAnimationButtonDisabled, stopAnimationButtonDisabled, exploreWithMouseButtonDisabled);

   var drawingCanvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('drawingCanvas');
   var drawingContext : CanvasRenderingContext2D = <CanvasRenderingContext2D> drawingCanvas.getContext('2d');

   var C : CubicBezierCurve = initializeCubicBezierCurve();
  
   var drawDataForAllBezierArtifacts : BezierArtifactsDrawData = new BezierArtifactsDrawData();

   globalLoop = setInterval(animation, 
                            10,
                            drawingCanvas,
                            drawingContext, 
                            C,
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
   var exploreWithMouseButtonDisabled : boolean = false;
   DisableEnableButtons(startAnimationButtonDisabled, stopAnimationButtonDisabled, exploreWithMouseButtonDisabled);

   clearInterval(globalLoop);
}
//   End code related to StopAnimation()

// Begin code related to ExploreWithMouse()
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
   else for (var i = 0; i < globalControlPointTargets.length; i++)
   {
         if(mousePos.isInsideCircle(globalControlPointTargets[i]))
         {
            globalIndexOfModifiedControlPoint = i;
            globalModifyingPointOnCurve = false;
            break;
         }
   }
}

////////////////////////////////////////////////////////////////////////////////
// onMouseMove - callback function
// This is called in response to a mousemove event detected by the canvas
//
// input: evt - the mouse event
// input: C - the CubicBezierCurve
// input: drawDataForAllBezierArtifacts - styles for drawing everything
// input: drawingContext - the context associated with the canvas
// input: drawingCanvas - the canvas on which we are drawing
///////////////////////////////////////////////////////////////////////////////
function onMouseMove(evt : MouseEvent,
                     C : CubicBezierCurve,
                     drawDataForAllBezierArtifacts : BezierArtifactsDrawData,
  					         drawingContext : CanvasRenderingContext2D,
					           drawingCanvas : HTMLCanvasElement) 
{

	if (globalModifyingPointOnCurve==true)
	{
	   C.editPointOnCurve(evt,
              drawDataForAllBezierArtifacts,
						  drawingContext,
						  drawingCanvas);
	}
	else if (globalIndexOfModifiedControlPoint > -1)
	{
	   C.editControlPoint(evt,
                        drawDataForAllBezierArtifacts,
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
// ExploreWithMouse - function
// Constructs the curve and declares callbacks for exploring with the mouse.
//
// TODO - There is a refactoring opportunity for constructing the curve.
// TODO - Look for other refactoring opportunities
// Note: This function is called when user clicks Explore With Mouse button
////////////////////////////////////////////////////////////////////////////////
function ExploreWithMouse()
{  // Begin function ExploreWithMouse
   var drawingCanvas : HTMLCanvasElement =
     <HTMLCanvasElement>document.getElementById('drawingCanvas');
   var drawingContext : CanvasRenderingContext2D = <CanvasRenderingContext2D> drawingCanvas.getContext('2d');

   // Inline code corresponding to clearCanvas
   drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

   var C : CubicBezierCurve = initializeCubicBezierCurve();

   var drawDataForAllBezierArtifacts : BezierArtifactsDrawData = new BezierArtifactsDrawData();

   tGlobal = 1.0 - 2.0/(1.0 + Math.sqrt(5.0)); // 1 - reciprocal of golden ratio

   C.drawAllBezierArtifacts(drawDataForAllBezierArtifacts,
                            drawingContext);

      drawingCanvas.addEventListener('mousedown', function(evt)
         {
            onMouseDown(evt,
                        drawingCanvas);
         }, false);

      drawingCanvas.addEventListener('mousemove', function(evt)
         {
            onMouseMove(evt,
                        C,
                        drawDataForAllBezierArtifacts,
                        drawingContext,
                        drawingCanvas);
         }, true);

      drawingCanvas.addEventListener('mouseup', function(evt)
         {
            onMouseUp();
         }, false);

// Begin adding code based on
// http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices/6362527#6362527
    drawingCanvas.addEventListener("touchstart", touchHandler, true);
    drawingCanvas.addEventListener("touchmove", touchHandler, true);
    drawingCanvas.addEventListener("touchend", touchHandler, true);
//   End adding code based on
// http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices/6362527#6362527
}  // End function ExploreWithMouse

//   End code related to ExploreWithMouse()

// Begin code related to HelpInTheFormOfAWebPage()
function HelpInTheFormOfAWebPage()
{
   window.open("BusyBCurvesHelp.html");
}
//   End code related to HelpInTheFormOfAWebPage()

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
                          pt : Point[],
                          D : Point[][])
 {
   var j : number;   // a loop index
   var m : number;   // a loop index
   var a : number;   // one of the scalar multipliers
   var abar : number // one of the scalar multipliers

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
      for (var i = 0; i < t.length - 1; i++)
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
      for (var m = 0; m < C.length - 1; m++)
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
       for (var j = 0; j < C.length; j++)
       {   // begin j-loop
           this.Component.push(C[j]);
       }   //   end j-loop
       for (var k = 0; k < t.length; k++)
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
    for (var i = 0; i < nComponents; i++)
    {
       stringRep += "<p>"
       stringRep += "Component[" + i + "] = ";
       stringRep += this.Component[i].toString();
       stringRep += "</p>";
    }

    var nBreakpoints : number = this.Breakpoint.length;
    for (var j = 0; j < nBreakpoints; j++)
    {
       stringRep += "<p>"
       stringRep += "Breakpoint[" + j + "] = ";
       stringRep += this.Breakpoint[j].toString();
       stringRep += "</p>";
    }
    return stringRep;
  }

  //////////////////////////////////////////////////////////////////////////////
  // getCurrLineIndexAndCurrLineParm - method of PolyBezier
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

} // End class PolyBezier






// Begin class CubicSpline
class CubicSpline
{
  CtrlPts : Array<Point>;
  ExplicitKnots : Array<number>;

  // The following is a special-purpose constructor in which we build a 3-span cubic spline curve
  // that has 6 control points and 10 knots.  It remains to determine whether
  // we should check the object for validity.  Perhaps we should use the
  // isValid() method.

  //////////////////////////////////////////////////////////////////////////////
  // constructor for a 3-span cubic spline curve
  // Creates an instance of a CubicSpline
  //
  // input: P0 - the 0th control point
  // input: P1 - the 1st control point
  // input: P2 - the 2nd control point
  // input: P3 - the 3rd control point
  // input: P4 - the 3rd control point
  // input: P5 - the 3rd control point
  // input: t0 - the 0th distinct knot
  // input: t1 - the 1st distinct knot
  // input: t2 - the 2nd distinct knot
  // input: t3 - the 3rd distinct knot
  //
  // Note: This is a very special-purpose constructor.
  // We should eventually replace this with a general constructor.
  // We should also either check for validity in the constructor or
  // use the isValid() method.
  //////////////////////////////////////////////////////////////////////////////
  constructor(P0 : Point,
              P1 : Point,
              P2 : Point,
              P3 : Point,
              P4 : Point,
              P5 : Point,
              t0 : number,
              t1 : number,
              t2 : number,
              t3 : number)
  {
    this.CtrlPts = new Array<Point>();
    this.CtrlPts.push(P0);
    this.CtrlPts.push(P1);
    this.CtrlPts.push(P2);
    this.CtrlPts.push(P3);
    this.CtrlPts.push(P4);
    this.CtrlPts.push(P5);

    this.ExplicitKnots = new Array<number>();
    // The first knot has multiplicity 4
    for (var i = 0; i < 4; i++)
    {
      this.ExplicitKnots.push(t0);
    }
    // The two interior knots each have multiplicity 1
    this.ExplicitKnots.push(t1);
    this.ExplicitKnots.push(t2);
    // The last knot has multiplicity 4
    for (var j = 0; j < 4; j ++)
    {
      this.ExplicitKnots.push(t3);
    }
  }

// Multiple constructor implementations are apparently not allowed.

  //////////////////////////////////////////////////////////////////////////////
  // toString - method of CubicSpline
  // Returns the string representation of this CubicSpline
  //
  // returns: the string representation of this CubicSpline
  //////////////////////////////////////////////////////////////////////////////
  toString() : string
  {
     var stringRep : string = "Data for Spline Curve\n";

     var nPts : number = this.CtrlPts.length;
     for (var i = 0; i < nPts; i++)
     {
        stringRep += "<p>"
        stringRep += "CtrlPts[" + i + "] = ";
        stringRep += this.CtrlPts[i].toString();
        stringRep += "</p>";
     }

     var nKts : number = this.ExplicitKnots.length;
     for (var j = 0; j < nKts; j++)
     {
        stringRep += "<p>"
        stringRep += "ExplicitKnots[" + j + "] = ";
        stringRep += this.ExplicitKnots[j].toString();
        stringRep += "</p>";
     }
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
    var nCrtlPts : number = this.CtrlPts.length;
    var nKts : number = this.ExplicitKnots.length;
    var degree : number = 3; // we know it is 3 in this case
    var order : number = degree + 1;
    var delta : number = nKts - nCrtlPts;
    if (delta != order)
    {
      thisIsValid = false;
    }
    return thisIsValid;
  }

// From /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/Resources/BusyBSplineResources/CubicSplineModel.m
// -(int)findSpan:(float)t
// {
// 	int first = [self degree];
// 	int last = [self nKts] - [self degree] - 1;
// 	int spanIndex = [SplineUtilities BinarySearchGivenParm:t Knots:t_ FirstIndex:first LastIndex:last];
// 	return spanIndex;
// }  
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
     let spanIndex : number = BinarySearchSortedArray(t, this.ExplicitKnots); // will we need to change the signature of BinarySearchSortedArray to include first and last?
     return spanIndex;
  }


// From /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/Resources/BusyBSplineResources/CubicSplineModel.m
// -(NSPoint)PositionAtParm:(float)t
// {
// 	int ispan = [self findSpan:t];
// 	float xVals[MAXORDER][MAXORDER];
//  float yVals[MAXORDER][MAXORDER];
// 	int d = [self degree];
// 	[SplineUtilities deBoorTriangleAt:t SpanIndex:ispan Degree:d lastColumn:d Knots:t_ Coefs:x_ Triangle:xVals];
// 	[SplineUtilities deBoorTriangleAt:t SpanIndex:ispan Degree:d lastColumn:d Knots:t_ Coefs:y_ Triangle:yVals];
// 	NSPoint P;
// 	P.x = xVals[d][d];
// 	P.y = yVals[d][d];
// 	return P;
// }

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
    const degree : number = 3;
    const itop : number = degree; // but we may have to make this degree - multiplicity
    var D : Point[][];

    DeBoorTriangleAt(t, ispan, degree, itop, this.ExplicitKnots, this.CtrlPts, D); // will we get back D?

    let Pos : Point = D[degree][degree];
    
    return Pos;
  }

}
// End class CubicSpline  

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
    for (var i = 0; i < n ; i++)
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

     for (var i : number = 0; i < n; i++)
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
     for (var i : number = 1; i < n; i++)
     {
        context.lineTo(this.Pt[i].x, this.Pt[i].y);
     }
     context.stroke();
  }

}   //   End class PolyLine

class Rectangle
{   // Begin class Rectangle
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

  ExploreWithMouse();
}

// I replaced window.onload = ExploreWithMouse with the following.
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
  for (var i : number = 0; i < n; i++)
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
  for (var i : number = 0; i < 10; i++)
  {
    // document.write(i.toString());
    document.write((i*i).toString());
    document.write("<p>")
  }
}

function TestCubicSpline()
{
  document.writeln("<p>In TestCubicSpline()</p>");
  var P0 : Point = new Point(1.01, 2.01);
  var P1 : Point = new Point(3.01, 4.01);
  var P2 : Point = new Point(5.01, 6.01);
  var P3 : Point = new Point(7.01, 8.01);
  var P4 : Point = new Point(9.01, 10.01);
  var P5 : Point = new Point(11.01, 12.01);

  var t0 : number = 0.01;
  var t1 : number = 1.01;
  var t2 : number = 2.01;
  var t3 : number = 3.01;

  var C : CubicSpline = new CubicSpline(P0,
                                        P1,
                                        P2,
                                        P3,
                                        P4,
                                        P5,
                                        t0,
                                        t1,
                                        t2,
                                        t3);

  document.writeln("<p>");
  document.writeln("Data for CubicSpline object");
  var CubicSplineData : string = C.toString();
  document.writeln(CubicSplineData);
  document.writeln("<p>")
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
   var allDrawData : BezierArtifactsDrawData = new BezierArtifactsDrawData();
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
   for (var i = 0; i < n; i++)
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
    
    for (var i =0; i <= 10; i++)
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
   for (var i = 0; i < n; i++)
   {
     P[i] = new Point(i, 10*i);
   }

   ArrayLogger("Input points for PolyLine Constructor", "P", P);

   var PL : PolyLine = new PolyLine(P);
   document.writeln("Polyline PL constructed from the P");
   document.writeln("<p>")
   document.writeln(PL.toString());

   for (var j = 0; j <= 10*n; j++)
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


function doTests()
{
   var date : Date = new Date();
   document.writeln(date.toString());
   TestPolyBezier();
   // TestDrawData();
   // TestBinarySearchSortedArray();
   // TestArrayLogger();
   // TestLine();
   // TestPolyLine();
}
