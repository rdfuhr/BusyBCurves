// We will implement the functionality from
// ~/Dropbox/Public/RichardFuhr/BusyBezier/BusyBezier.js
// Also, we will reformulate some of my Objective-C BusyBSpline code as TypeScript:
// /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/BusyBCurves001ts/BusyBSplineResources

// As of Friday, January 22, 2016 we are also going to place the derived
// file BusyBCurves.js under git control and under GitHub management.
// Adding these comments is done as a test to see how this will appear in
// SourceTree.

// We may use JSDoc as described here.
// https://en.wikipedia.org/wiki/JSDoc


// For the record, here is a list of the variables that I am currently
// using as globals.
// globalPointOnCurveForParm
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

// Begin declaring some of the globals
const globalPointEqualityTol : number = 0.000001;
var globalPointOnCurveForParm : Circle;
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
  dotProd(that) : number
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
     stringRep = stringRep + "\n";
     stringRep = stringRep + "strokeColor = " + this.strokeColor;
     stringRep = stringRep + "\n";
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
{ // Begin class curveDrawData
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
     stringRep = stringRep + "\n";
     var curveWidthString : string;
     curveWidthString = this.curveWidth.toString();
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
////////////////////////////////////////////////////////////////////////////////
function drawAllDeCasteljauLines(P : Array<Point>,
                                 t : number,
                                 drawData : CurveDrawData,
                                 context : CanvasRenderingContext2D)
{
   drawData.updateContext(context);

   var n : number = P.length
   for (var i = 0; i < n-1; i++)
   {  // begin i-loop
      P = doOneDeCasteljauStep(P, t); // so we are overwriting P
      var m : number = P.length;
      if (m > 1)
      {  // begin case of m > 1
         context.beginPath();
         context.moveTo(P[0].x, P[0].y);
         for (var j = 1; j < m; j++)
         {
            context.lineTo(P[j].x, P[j].y);
         }
         context.stroke();
      }  //   end case of m > 1
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
// input: context - the context associated with the canvas
////////////////////////////////////////////////////////////////////////////////
function annotateGraphOfCubicBernstein(i : number,
                                       t : number,
                                       graphOfCubicBernstein : CubicBezierCurve,
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
      context.font = fontSpec;
      var textWidth : number = context.measureText(t.toFixed(2)).width;
      P.x = P.x - textWidth;
   }
   drawTextForNumber(y, P, fontSpec, context); // For now
}

////////////////////////////////////////////////////////////////////////////////
// buildGraphOfCubicBernstein - function
// Construct the graph of a cubic Bernstein polynomial as a 2D curve
//
// input: indx - the index of the cubic Bernstein polynomial
// input: upperLeft -  point at upper left corner of bounding box of graph
// input: width - width of bounding box of graph
// input: height - height of bounding box of graph
////////////////////////////////////////////////////////////////////////////////
function buildGraphOfCubicBernstein(indx : number,
                                    upperLeft : Point,
                                    width : number,
                                    height : number) : CubicBezierCurve
{
    const oneThird : number = 1.0/3.0;
    const twoThirds : number = 2.0/3.0;

    var Q0 : Point = new Point(0.0, 1.0)
    var Q1 : Point = new Point(oneThird, 1.0);
    var Q2 : Point = new Point(twoThirds, 1.0);
    var Q3 : Point = new Point(1.0, 1.0);

    // clumsy but we will do this for now
    if (indx==0) Q0.y = 0.0;
    else if (indx==1) Q1.y = 0.0;
    else if (indx==2) Q2.y = 0.0;
    else if (indx==3) Q3.y = 0.0;

    var graphOfCubicBernstein : CubicBezierCurve =
      new CubicBezierCurve(Q0, Q1, Q2, Q3);

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
     var curveData = "Data for Bezier Curve\n";
     var n = this.CtrlPts.length;
     for (var i = 0; i < n; i++)
     {
        curveData += "<p>"
        curveData += "CtrlPts[" + i + "] = ";
        curveData += this.CtrlPts[i].toString();
        curveData += "</p>";
     }
     return curveData;
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
  // input: drawData - an object containing information specifying appearance
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
  // input: drawData - an object containing information specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawControlPolygon(drawData : CurveDrawData,
                     context : CanvasRenderingContext2D)
  {
     drawData.updateContext(context);
     context.beginPath();
     var P : Array<Point> = this.CtrlPts;
     context.moveTo(P[0].x, P[0].y);

     for (var i = 1; i < P.length; i++)
     {
        context.lineTo(P[i].x, P[i].y);
     }

     context.stroke();
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawControlPoints - method of CubicBezierCurve
  // Draws control points of this CubicBezierCurve with specified appearance
  //
  // input: radius - the radius of the circles representing the control points
  // input: drawData - an object containing information specifying appearance
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
  // input: sumOfAreas - the sum of the areas of all the circles
  // input: drawData - an object containing information specifying appearance
  // input: context - the context associated with the canvas
  // output: controlPointCircles - circles marking weighted control points
  //////////////////////////////////////////////////////////////////////////////
  drawControlPointsWeightedForParm(t : number,
                                   sumOfAreas : number,
                                   drawData : CircleDrawData,
                                   context : CanvasRenderingContext2D,
                                   controlPointCircles : Array<Circle>)
  {
     var controlPoints : Array<Point> = this.CtrlPts;
     var order : number = controlPoints.length;
     var degree : number = order - 1;

     for (var i = 0; i < order; i++)
     {
        var actualArea : number = sumOfAreas*bernsteinValue(i, degree, t);
        // NOTE: actualArea = Math.PI*(actualRadius)^2
        // so actualRadius = sqrt(actualArea/Math.PI)
        var actualRadius : number = Math.sqrt(actualArea/Math.PI);
        controlPoints[i].drawCircleHere(actualRadius, drawData, context);
        controlPointCircles[i] = new Circle(controlPoints[i], actualRadius);
     }

  }

  //////////////////////////////////////////////////////////////////////////////
  // drawPointOnCurveForParm - method of CubicBezierCurve
  // Draws point on curve at specified parameter with specified appearance
  //
  // input: t - parameter at which corresponding point is to be drawn
  // input: radius - the radius of the circle representing the point
  // input: drawData - an object containing information specifying appearance
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
  // input: strokeColor - color used for drawing the line
  // input: lineWidth - the width of the line to be drawn
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawVerticalLineFromCurveForParm(t : number,
                                   strokeColor : string,
                                   lineWidth : number,
                                   context :CanvasRenderingContext2D)
  {
     var P = this.positionAtParm(t);
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

     context.beginPath();
     context.strokeStyle = strokeColor;
     context.lineWidth = lineWidth;
     context.moveTo(P.x, P.y);
     context.lineTo(Q.x, Q.y);
     context.stroke();
  }

  //////////////////////////////////////////////////////////////////////////////
  // drawBasisFunctionsWithParm - method of CubicBezierCurve
  // Draw graphs of cubic Bernstein polynomials with a point on each graph
  //
  // input: t - the parameter where we should draw corresponding points
  // input: graphStrokeColor - the color with which to draw the graphs
  // input: sumOfControlPointAreas -  sum of the areas of control point circles
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawBasisFunctionsWithParm(t,
                             graphStrokeColor,
                             graphWidth,
                             sumOfControlPointAreas,
                             context)
  {
     // We will use maxRadius to help position the graphs.
     // Of course we are recalculating maxRadius each time, which is not efficient
     // Later (if later ever becomes now), we will see about making this more efficient.
     var maxRadius = Math.sqrt(sumOfControlPointAreas/Math.PI);

     var delta1 = new Point( 1.0*maxRadius, -1.0*maxRadius);
     var delta2 = new Point(-3.0*maxRadius, -1.0*maxRadius);
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
                                                               2.0*maxRadius,
                                                               2.0*maxRadius);

        var drawDataForGraphOfCubicBernstein = new CurveDrawData(graphStrokeColor,
                                                                 graphWidth);
        graphOfCubicBernstein.drawCurve(drawDataForGraphOfCubicBernstein, context);

        var pointOnGraphRadius = 3.0;
        var pointOnGraphFillColor = "black"
        var pointOnGraphStrokeColor = "black"
        var pointOnGraphStrokeWidth = 5.0;
        var drawDataForPointOnGraph = new CircleDrawData(pointOnGraphFillColor,
                                                         pointOnGraphStrokeColor,
                                                         pointOnGraphStrokeWidth);

        graphOfCubicBernstein.drawPointOnCurveForParm(t,
                                                      pointOnGraphRadius,
                                                      drawDataForPointOnGraph,
                                                      context);

        graphOfCubicBernstein.drawVerticalLineFromCurveForParm(t,
                                                               "black",
                                                               graphWidth,
                                                               context);

        annotateGraphOfCubicBernstein(indx,
                                      t,
                                      graphOfCubicBernstein,
                                      context);

     }

  }

  //////////////////////////////////////////////////////////////////////////////
  // drawAllBezierArtifacts - method of CubicBezierCurve
  // Draw all information associated with this CubicBezierCurve
  //
  // input: drawDataForBezierCurve - style for drawing this CubicBezierCurve
  // input: drawDataForControlPolygon - style for drawing control polygon
  // input: drawDataForControlPoints - style for drawing control points
  // input: drawDataForPointOnCurve - style for drawing point on curve
  // input: sumOfControlPointAreas - sum of areas of control points
  // input: pointOnCurveRadius - radius of circle representing point on curve
  // input: context - the context associated with the canvas
  // output: controlPointCircles - circles marking weighted control points
  //////////////////////////////////////////////////////////////////////////////
  drawAllBezierArtifacts(drawDataForBezierCurve : CurveDrawData,
                         drawDataForControlPolygon : CurveDrawData,
                         drawDataForControlPoints : CircleDrawData,
                         drawDataForPointOnCurve : CircleDrawData,
                         sumOfControlPointAreas : number,
                         pointOnCurveRadius : number,
                         context : CanvasRenderingContext2D,
                         controlPointCircles : Array<Circle>)
  {
     this.drawCurve(drawDataForBezierCurve, context);
     this.drawControlPolygon(drawDataForControlPolygon, context);

     this.drawControlPointsWeightedForParm(tGlobal,
                                           sumOfControlPointAreas,
                                           drawDataForControlPoints,
                                           context,
                                           controlPointCircles);


     this.drawPointOnCurveForParm(tGlobal,
                                  pointOnCurveRadius,
                                  drawDataForPointOnCurve,
                                  context);

      var pointOnCurve : Point = this.positionAtParm(tGlobal);
      globalPointOnCurveForParm  = new Circle(pointOnCurve, pointOnCurveRadius);

      var textLocation : Point = new Point(pointOnCurve.x, pointOnCurve.y - pointOnCurveRadius);

      const fontSpec : string = 'lighter 45px Sans-Serif';
      drawTextForNumber(tGlobal,
                        textLocation,
                        fontSpec,
                        context);

  // temporarily hard-code some of the input parameters
     const graphStrokeColor : string = "green";
     const graphWidth : number = 2;
     this.drawBasisFunctionsWithParm(tGlobal,
                                     graphStrokeColor,
                                     graphWidth,
                                     sumOfControlPointAreas,
                                     context);

      var drawDataForDeCasteljauLines : CurveDrawData = new CurveDrawData("brown", 2);
      drawAllDeCasteljauLines(this.CtrlPts,
                              tGlobal,
                              drawDataForDeCasteljauLines,
                              context);

      const fillColor : string = "orange"
      const strokeColor : string = "orange"
      const strokeWidth : number = 5.0;
      var drawDataForDeCasteljauPoints = new CircleDrawData(fillColor,
                                                            strokeColor,
                                                            strokeWidth);

      drawAllDeCasteljauPoints(this.CtrlPts,
                               tGlobal,
                               drawDataForDeCasteljauPoints,
                               context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // editPointOnCurve - method of CubicBezierCurve
  // Called when user has clicked the point on this curve and is moving it.
  //
  // input: evt - the mouse event
  // input: drawDataForBezierCurve - style for drawing this CubicBezierCurve
  // input: drawDataForControlPolygon - style for drawing control polygon
  // input: sumOfControlPointAreas - sum of areas of control points
  // input: drawDataForControlPoints - style for drawing control points
  // input: pointOnCurveRadius - radius of circle representing point on curve
  // input: drawDataForPointOnCurve - style for drawing point on curve
  // input: context - the context associated with the canvas
  // input: canvas - the canvas on which we are drawing
  // output: controlPointCircles - circles marking weighted control points
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
                   drawDataForBezierCurve : CurveDrawData,
                   drawDataForControlPolygon : CurveDrawData,
                   sumOfControlPointAreas : number,
                   drawDataForControlPoints :CircleDrawData,
                   pointOnCurveRadius : number,
                   drawDataForPointOnCurve : CircleDrawData,
                   context : CanvasRenderingContext2D,
                   canvas : HTMLCanvasElement,
                   controlPointCircles : Array<Circle>)
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
     this.drawAllBezierArtifacts(drawDataForBezierCurve,
                                 drawDataForControlPolygon,
                                 drawDataForControlPoints,
                                 drawDataForPointOnCurve,
                                 sumOfControlPointAreas,
                                 pointOnCurveRadius,
                                 context,
                                 controlPointCircles);
  }

  //////////////////////////////////////////////////////////////////////////////
  // editControlPoint - method of CubicBezierCurve
  // Called when user has clicked a control point on this curve and is moving it
  //
  // input: evt - the mouse event
  // input: drawDataForBezierCurve - style for drawing this CubicBezierCurve
  // input: drawDataForControlPolygon - style for drawing control polygon
  // input: sumOfControlPointAreas - sum of areas of control points
  // input: drawDataForControlPoints - style for drawing control points
  // input: pointOnCurveRadius - radius of circle representing point on curve
  // input: drawDataForPointOnCurve - style for drawing point on curve
  // input: context - the context associated with the canvas
  // input: canvas - the canvas on which we are drawing
  // output: controlPointCircles - circles marking weighted control points
  //
  //
  // TODO: I think we can get by without passing the canvas as a parameter
  // because we should be able to get it from evt.
  //
  //////////////////////////////////////////////////////////////////////////////
  editControlPoint(evt : MouseEvent,
                   drawDataForBezierCurve : CurveDrawData,
                   drawDataForControlPolygon : CurveDrawData,
                   sumOfControlPointAreas : number,
                   drawDataForControlPoints : CircleDrawData,
                   pointOnCurveRadius : number,
                   drawDataForPointOnCurve : CircleDrawData,
                   context : CanvasRenderingContext2D,
                   canvas : HTMLCanvasElement,
                   controlPointCircles)
  {
     var mousePos : Point = getMousePos(canvas, evt);
     this.CtrlPts[globalIndexOfModifiedControlPoint] = mousePos;
     context.clearRect(0, 0, canvas.width, canvas.height);

     this.drawAllBezierArtifacts(drawDataForBezierCurve,
                                 drawDataForControlPolygon,
                                 drawDataForControlPoints,
                                 drawDataForPointOnCurve,
                                 sumOfControlPointAreas,
                                 pointOnCurveRadius,
                                 context,
                                 controlPointCircles);
  }


} // End class CubicBezierCurve



// Begin Canvas utilities
////////////////////////////////////////////////////////////////////////////////
// drawTextForNumber - function
// Draw the text representing a given number at a specified location
//
// input: t - The number for which the text is to be drawn
// input: textLocation - the location where the text is to be drawn
// input: fontSpec - the font to be used
// input: context - the context associated with the canvas
////////////////////////////////////////////////////////////////////////////////

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

function drawTextForNumber(t : number,
                           textLocation : Point,
                           fontSpec : string,
                           context : CanvasRenderingContext2D)
{
   context.font = fontSpec;
   context.strokeText(t.toFixed(2), textLocation.x, textLocation.y);
}
// End Canvas utilities

// Begin code related to StartAnimation()
var globalLoop : number; //used by StartAnimation and StopAnimation
var tGlobal : number = 0.0; // global
var tDeltaGlobal : number = 0.001; // cannot be made a const
const globalCircleAreaFactor : number = 2.0;
const globalCircleRadiusFactor : number = Math.sqrt(globalCircleAreaFactor);

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
  const pointOnCurveRadius : number = globalCircleRadiusFactor*15.0;
  const pointOnCurveFillColor : string = "yellow";
  const pointOnCurveStrokeColor : string = "black";
  const pointOnCurveStrokeWidth : number = 5.0;
  var drawDataForPointOnCurve : CircleDrawData =
    new CircleDrawData(pointOnCurveFillColor,
                       pointOnCurveStrokeColor,
                       pointOnCurveStrokeWidth);
  return drawDataForPointOnCurve;
}

//   End implementing functions that construct and return draw data.

////////////////////////////////////////////////////////////////////////////////
// animation - function
// Create a CubicBezierCurve and set the drawing style for animation.
// TODO - Why are we re-creating the curve with every call to this function?
// We may still want to do this, but I am not sure.
////////////////////////////////////////////////////////////////////////////////
function animation()
{
   var drawingCanvas : HTMLCanvasElement =
     <HTMLCanvasElement>document.getElementById('drawingCanvas');
   var drawingContext : CanvasRenderingContext2D = <CanvasRenderingContext2D> drawingCanvas.getContext('2d');

   // Inline code corresponding to clearCanvas
   drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

   var C : CubicBezierCurve = initializeCubicBezierCurve();

   var drawDataForBezierCurve : CurveDrawData = defaultDrawDataForBezierCurve();

   var drawDataForControlPolygon : CurveDrawData = defaultDrawDataForControlPolygon();

   var drawDataForControlPoints : CircleDrawData = defaultDrawDataForControlPoints();

   var drawDataForPointOnCurve : CircleDrawData = defaultDrawDataForPointOnCurve();

   tGlobalUpdate(); // the global value of t is adjusted

   const sumOfControlPointAreas : number = globalCircleAreaFactor*10000.0;

   const pointOnCurveRadius : number = globalCircleRadiusFactor*15.0;

   var controlPointCircles : Array<Circle> = new Array();

   C.drawAllBezierArtifacts(drawDataForBezierCurve,
                            drawDataForControlPolygon,
                            drawDataForControlPoints,
                            drawDataForPointOnCurve,
                            sumOfControlPointAreas,
                            pointOnCurveRadius,
                            drawingContext,
                            controlPointCircles);

}

////////////////////////////////////////////////////////////////////////////////
// StartAnimation - function
// Enable and disable the buttons and set the animation interval
////////////////////////////////////////////////////////////////////////////////
function StartAnimation()
{
   var startAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StartAnimation");
   var stopAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StopAnimation");
   var exploreWithMouseButton : HTMLInputElement = <HTMLInputElement>document.getElementById("ExploreWithMouse");
   startAnimationButton.disabled = true;
   stopAnimationButton.disabled = false;
   exploreWithMouseButton.disabled = true;

   globalLoop = setInterval(animation, 10);
}
//   End code related to StartAnimation()


// Begin code related to StopAnimation()
////////////////////////////////////////////////////////////////////////////////
// StopAnimation - function
// Clear the animation interval and reenable and disable the buttons
////////////////////////////////////////////////////////////////////////////////
function StopAnimation()
{
   var startAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StartAnimation");
   var stopAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StopAnimation");
   var exploreWithMouseButton : HTMLInputElement = <HTMLInputElement>document.getElementById("ExploreWithMouse");
   startAnimationButton.disabled = false;
   stopAnimationButton.disabled = true;
   exploreWithMouseButton.disabled = false;

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

// input: evt - the mouse event at the time of mousedown
// input: theCanvas - canvas on which we are drawing
// input: controlPointCircles - circles marking the control points

////////////////////////////////////////////////////////////////////////////////
function onMouseDown(evt : MouseEvent,
                     theCanvas : HTMLCanvasElement,
                     controlPointCircles : Array<Circle>)
{
   var mousePos : Point = getMousePos(theCanvas, evt);

   globalIndexOfModifiedControlPoint = -1;

   if (mousePos.isInsideCircle(globalPointOnCurveForParm))
   {
      globalModifyingPointOnCurve = true;
      globalIndexOfModifiedControlPoint = -1;
   }
   else for (var i = 0; i < controlPointCircles.length; i++)
   {
         if(mousePos.isInsideCircle(controlPointCircles[i]))
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
// input: drawDataForBezierCurve - style for drawing this CubicBezierCurve
// input: drawDataForControlPolygon - style for drawing control polygon
// input: sumOfControlPointAreas - sum of areas of control points
// input: drawDataForControlPoints - style for drawing control points
// input: pointOnCurveRadius - radius of circle representing point on curve
// input: drawDataForPointOnCurve - style for drawing point on curve
// input: drawingContext - the context associated with the canvas
// input: drawingCanvas - the canvas on which we are drawing
// output: controlPointCircles - circles marking weighted control points
///////////////////////////////////////////////////////////////////////////////
function onMouseMove(evt : MouseEvent,
                     C : CubicBezierCurve,
                     drawDataForBezierCurve : CurveDrawData,
                     drawDataForControlPolygon : CurveDrawData,
                     sumOfControlPointAreas : number,
                     drawDataForControlPoints : CircleDrawData,
					           pointOnCurveRadius : number,
                     drawDataForPointOnCurve : CircleDrawData,
					           drawingContext : CanvasRenderingContext2D,
					           drawingCanvas : HTMLCanvasElement,
					           controlPointCircles : Array<Circle>)
{

	if (globalModifyingPointOnCurve==true)
	{
	   C.editPointOnCurve(evt,
						  drawDataForBezierCurve,
						  drawDataForControlPolygon,
						  sumOfControlPointAreas,
						  drawDataForControlPoints,
						  pointOnCurveRadius,
						  drawDataForPointOnCurve,
						  drawingContext,
						  drawingCanvas,
						  controlPointCircles);


	}
	else if (globalIndexOfModifiedControlPoint > -1)
	{

	   C.editControlPoint(evt,
                        drawDataForBezierCurve,
						            drawDataForControlPolygon,
						            sumOfControlPointAreas,
						            drawDataForControlPoints,
						            pointOnCurveRadius,
						            drawDataForPointOnCurve,
						            drawingContext,
						            drawingCanvas,
						            controlPointCircles);
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

   var drawDataForBezierCurve : CurveDrawData = defaultDrawDataForBezierCurve();

   var drawDataForControlPolygon : CurveDrawData = defaultDrawDataForControlPolygon();

   var drawDataForControlPoints : CircleDrawData = defaultDrawDataForControlPoints();

   var drawDataForPointOnCurve : CircleDrawData = defaultDrawDataForPointOnCurve();

   tGlobal = 1.0 - 2.0/(1.0 + Math.sqrt(5.0)); // 1 - reciprocal of golden ratio

   const sumOfControlPointAreas : number = globalCircleAreaFactor*10000.0;

   const pointOnCurveRadius : number = globalCircleRadiusFactor*15.0;

   var controlPointCircles : Array<Circle> = new Array();

   C.drawAllBezierArtifacts(drawDataForBezierCurve,
                            drawDataForControlPolygon,
                            drawDataForControlPoints,
                            drawDataForPointOnCurve,
                            sumOfControlPointAreas,
                            pointOnCurveRadius,
                            drawingContext,
                            controlPointCircles);


      drawingCanvas.addEventListener('mousedown', function(evt)
         {
            onMouseDown(evt,
                        drawingCanvas,
                        controlPointCircles);
         }, false);

      drawingCanvas.addEventListener('mousemove', function(evt)
         {
            onMouseMove(evt,
                        C,
                        drawDataForBezierCurve,
                        drawDataForControlPolygon,
                        sumOfControlPointAreas,
                        drawDataForControlPoints,
                        pointOnCurveRadius,
                        drawDataForPointOnCurve,
                        drawingContext,
                        drawingCanvas,
                        controlPointCircles);
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

// Begin class PolyBezier
// See ~/Dropbox/Sandbox/typeScriptLearn/BusyBCurves001ts/BusyBSplineResources
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
    // We need to do some validity checking; otherwise we will construct
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
          if (endPt.distanceTo(startPt) > globalPointEqualityTol)
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
    var curveData : string = "Data for PolyBezier Curve\n";

    var nComponents : number = this.Component.length;
    for (var i = 0; i < nComponents; i++)
    {
       curveData += "<p>"
       curveData += "Component[" + i + "] = ";
       curveData += this.Component[i].toString();
       curveData += "</p>";
    }

    var nBreakpoints : number = this.Breakpoint.length;
    for (var j = 0; j < nBreakpoints; j++)
    {
       curveData += "<p>"
       curveData += "Breakpoint[" + j + "] = ";
       curveData += this.Breakpoint[j].toString();
       curveData += "</p>";
    }
    return curveData;
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
     var curveData : string = "Data for Spline Curve\n";

     var nPts : number = this.CtrlPts.length;
     for (var i = 0; i < nPts; i++)
     {
        curveData += "<p>"
        curveData += "CtrlPts[" + i + "] = ";
        curveData += this.CtrlPts[i].toString();
        curveData += "</p>";
     }

     var nKts : number = this.ExplicitKnots.length;
     for (var j = 0; j < nKts; j++)
     {
        curveData += "<p>"
        curveData += "ExplicitKnots[" + j + "] = ";
        curveData += this.ExplicitKnots[j].toString();
        curveData += "</p>";
     }
     return curveData;
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
}
// End class CubicSpline

//   End code to support BusyBSpline

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
// Miscellaneous tests of the above.

function doPointTests()
{
  var P = new Point(3,4);
  var Q = new Point(7,8);
  var R : Point = P.plus(Q);
  var d : number = P.dotProd(Q);
  document.writeln("<p>In doPointTests()</p>")
  document.writeln("<p>    P = " + P.toString() + " </p>");
  document.writeln("<p>    Q = " + Q.toString() + "</p>");
  document.writeln("<p>P + Q = " + R.toString() + "</p>");
  document.writeln("<p>P*Q = " + d.toString() + "</p>");
}
// Canvas-related explorations
function doCanvasTests()
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

function sillyTest()
{
  document.writeln("In sillyTest()")
  document.writeln("<p>");
  document.writeln("Just testing")
  for (var i : number = 0; i < 10; i++)
  {
    // document.write(i.toString());
    document.write((i*i).toString());
    document.write("<p>")
  }
}

function CubicSplineTest()
{
  document.writeln("<p>In CubicSplineTest()</p>");
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



 function PolyBezierTest()
 {
   document.writeln("<p>Entering PolyBezierTest()</p>");
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

   document.writeln("<p>Leaving PolyBezierTest()</p>");
 }


function doTests()
{
   var date : Date = new Date();
   document.writeln(date.toString());
   PolyBezierTest();
}
