// The purpose of this file is to implement the Point class
// giving it roughly the same functionality as we have in the file
// ~/Dropbox/Public/RichardFuhr/BusyBezier/BusyBezier.js
// We will actually go ahead and implement the other functionality from
// ~/Dropbox/Public/RichardFuhr/BusyBezier/BusyBezier.js
// Also, we will reformulate some of my Objective-C BusyBSpline code as TypeScript:
// /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/BusyBCurves001ts/BusyBSplineResources

// We may use JSDoc as described here.
// https://en.wikipedia.org/wiki/JSDoc

// Begin declaring some of the globals
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
  // input: radius - the radius of the circle to be drawingCanvas
  // input: drawData - an object containing information specifying appearance
  // input: context - the context associated with the canvas
  //////////////////////////////////////////////////////////////////////////////
  drawCircleHere(radius : number,
                 drawData : CircleDrawData,
                 context : CanvasRenderingContext2D)
  {
     context.beginPath();
     drawData.updateContext(context);
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

  constructor(strokeColor : string,
              curveWidth : number)
  {
    this.strokeColor = strokeColor;
    this.curveWidth = curveWidth;
  }

  toString() : string
  {
     var stringRep : string = "strokeColor = " + this.strokeColor;
     stringRep = stringRep + "\n";
     var curveWidthString : string;
     curveWidthString = this.curveWidth.toString();
     stringRep = stringRep + "curveWidth = " + curveWidthString;
     return stringRep;
  }

  updateContext(context :CanvasRenderingContext2D)
  {
     context.strokeStyle = this.strokeColor;
     context.lineWidth = this.curveWidth;
  }
} // End class CurveDrawData


// Begin utilities that are used by the CubicBezierCurve class
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

function hodographPoints(P : Array<Point>) : Array<Point>
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
function binom(n : number,
               k : number) : number
{
    var  coeff : number = 1;
    for (var i = n-k+1; i <= n; i++) coeff *= i;
    for (var i = 1;     i <= k; i++) coeff /= i;
    return coeff;
}

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

function bernsteinDeriv(i : number,
                        n : number,
                        t : number) : number
{
   var deriv : number = n*(bernsteinValue(i-1,n-1,t) - bernsteinValue(i,n-1,t));
   return deriv;
}

function annotateGraphOfCubicBernstein(i : number,
                                       t : number,
                                       graphOfCubicBernstein : CubicBezierCurve,
                                       context : CanvasRenderingContext2D)
{
   var fontSpec : string = 'lighter 45px Sans-Serif';
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

function buildGraphOfCubicBernstein(indx : number,
                                    upperLeft : Point,
                                    width : number,
                                    height : number) : CubicBezierCurve
{
    var oneThird : number = 1.0/3.0;
    var twoThirds : number = 2.0/3.0;

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

  constructor(P0 : Point,
              P1 : Point,
              P2 : Point,
              P3 : Point)
  {
    this.CtrlPts = new Array(P0, P1, P2, P3);
  }

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

  positionAtParm(t : number) : Point
  {
     var P : Array<Point> = this.CtrlPts;
     var pos : Point = doAllDeCasteljauSteps(P, t);
     return pos;
  }

  derivativeAtParm(t : number) : Point
  {
     var Q : Array<Point> = hodographPoints(this.CtrlPts);
     var der : Point = doAllDeCasteljauSteps(Q, t);
     return der;
  }

  scale(xScale : number,
        yScale : number)
  {
     for (var i = 0; i < this.CtrlPts.length; i++)
     {
        this.CtrlPts[i].x *= xScale;
        this.CtrlPts[i].y *= yScale;
     }
  }

  translate(P : Point)
  {
     for (var i = 0; i < this.CtrlPts.length; i++)
     {
        this.CtrlPts[i].x += P.x;
        this.CtrlPts[i].y += P.y;
     }
  }

  drawCurve(drawData : CurveDrawData,
            context : CanvasRenderingContext2D)
  {
     context.beginPath();
     drawData.updateContext(context);
     var P : Array<Point> = this.CtrlPts;
     context.moveTo(P[0].x, P[0].y);
     context.bezierCurveTo(P[1].x, P[1].y, P[2].x, P[2].y, P[3].x, P[3].y);
     context.stroke();
  }

  drawControlPolygon(drawData : CurveDrawData,
                     context : CanvasRenderingContext2D)
  {
     context.beginPath();
     drawData.updateContext(context);
     var P : Array<Point> = this.CtrlPts;
     context.moveTo(P[0].x, P[0].y);

     for (var i = 1; i < P.length; i++)
     {
        context.lineTo(P[i].x, P[i].y);
     }

     context.stroke();
  }

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

  drawPointOnCurveForParm(t : number,
                          radius : number,
                          drawData : CircleDrawData,
                          context : CanvasRenderingContext2D)
  {
     var P : Point = this.positionAtParm(t);
     P.drawCircleHere(radius, drawData, context);
  }

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

  drawAllBezierArtifacts(drawDataForBezierCurve : CurveDrawData,
                         drawDataForControlPolygon : CurveDrawData,
                         sumOfControlPointAreas : number,
                         drawDataForControlPoints : CircleDrawData,
                         pointOnCurveRadius : number,
                         drawDataForPointOnCurve : CircleDrawData,
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

      var fontSpec : string = 'lighter 45px Sans-Serif';
      drawTextForNumber(tGlobal,
                        textLocation,
                        fontSpec,
                        context);

  // temporarily hard-code some of the input parameters
     var graphStrokeColor : string = "green";
     var graphWidth : number = 2;
     this.drawBasisFunctionsWithParm(tGlobal,
                                     graphStrokeColor,
                                     graphWidth,
                                     sumOfControlPointAreas,
                                     context);
  }

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
                                 sumOfControlPointAreas,
                                 drawDataForControlPoints,
                                 pointOnCurveRadius,
                                 drawDataForPointOnCurve,
                                 context,
                                 controlPointCircles);
  }

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
     var mousePos = getMousePos(canvas, evt);
     this.CtrlPts[globalIndexOfModifiedControlPoint] = mousePos;
     context.clearRect(0, 0, canvas.width, canvas.height);

     this.drawAllBezierArtifacts(drawDataForBezierCurve,
                                 drawDataForControlPolygon,
                                 sumOfControlPointAreas,
                                 drawDataForControlPoints,
                                 pointOnCurveRadius,
                                 drawDataForPointOnCurve,
                                 context,
                                 controlPointCircles);
  }


} // End class CubicBezierCurve



// Begin Canvas utilities
function drawTextForNumber(t : number,
                           textLocation : Point,
                           fontSpec : string,
                           context : CanvasRenderingContext2D)
{
   context.font = fontSpec;
   context.strokeText(t.toFixed(2), textLocation.x, textLocation.y);
}
// End Canvas utilities

// Begin code related to StartAnimatedCanvasTests()
var globalLoop : number; //used by StartAnimatedCanvasTests and StopAnimatedCanvasTests
var tGlobal : number = 0.0; // global
var tDeltaGlobal : number = 0.001;
var globalCircleAreaFactor : number = 2.0;
var globalCircleRadiusFactor : number = Math.sqrt(globalCircleAreaFactor);

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

function animation()
{
   var drawingCanvas : HTMLCanvasElement =
     <HTMLCanvasElement>document.getElementById('drawingCanvas');
   var drawingContext : CanvasRenderingContext2D = <CanvasRenderingContext2D> drawingCanvas.getContext('2d');
   var width : number = drawingCanvas.width;
   var height : number = drawingCanvas.height;
   drawingContext.clearRect(0, 0, width, height);
   var lowerMargin : number = 0.18;
   var upperMargin : number = 1.0 - lowerMargin;
   var xDelta : number = (upperMargin - lowerMargin)/3.0;
   var P0 : Point = new Point(lowerMargin*width, lowerMargin*height)
   var P1 : Point = new Point(P0.x + xDelta*width, upperMargin*height);
   var P2 : Point = new Point(P1.x + xDelta*width, P0.y);
   var P3 : Point = new Point(upperMargin*width, P1.y);
   var C : CubicBezierCurve = new CubicBezierCurve(P0, P1, P2, P3);

   var curveStrokeColor : string = "red";
   var curveWidth : number = 10;
   var drawDataForBezierCurve : CurveDrawData = new CurveDrawData(curveStrokeColor, curveWidth);
   var lineWidth : number = 5;
   var polygonStrokeColor : string = "black";
   var drawDataForControlPolygon : CurveDrawData = new CurveDrawData(polygonStrokeColor, lineWidth);
   tGlobalUpdate(); // the global value of t is adjusted
   var sumOfControlPointAreas : number = globalCircleAreaFactor*10000.0;
   var controlPointFillColor : string = "blue";
   var controlPointStrokeColor : string = "green";
   var controlPointStrokeWidth : number = 5.0;
   var drawDataForControlPoints : CircleDrawData =
     new CircleDrawData(controlPointFillColor,
                        controlPointStrokeColor,
                        controlPointStrokeWidth);

   var pointOnCurveRadius : number = globalCircleRadiusFactor*15.0;
   var pointOnCurveFillColor : string = "yellow";
   var pointOnCurveStrokeColor : string = "black";
   var pointOnCurveStrokeWidth : number = 5.0;
   var drawDataForPointOnCurve : CircleDrawData =
     new CircleDrawData(pointOnCurveFillColor,
                        pointOnCurveStrokeColor,
                        pointOnCurveStrokeWidth);
   var controlPointCircles : Array<Circle> = new Array();

   C.drawAllBezierArtifacts(drawDataForBezierCurve,
                            drawDataForControlPolygon,
                            sumOfControlPointAreas,
                            drawDataForControlPoints,
                            pointOnCurveRadius,
                            drawDataForPointOnCurve,
                            drawingContext,
                            controlPointCircles);

}


function StartAnimatedCanvasTests()
{
   var startAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StartAnimation");
   var stopAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StopAnimation");
   var exploreWithMouseButton : HTMLInputElement = <HTMLInputElement>document.getElementById("ExploreWithMouse");
   startAnimationButton.disabled = true;
   stopAnimationButton.disabled = false;
   exploreWithMouseButton.disabled = true;
   // The following were commented out and replaced with what is above
   // document.getElementById("StartAnimation").disabled = true;
   // document.getElementById("StopAnimation").disabled = false;
   // document.getElementById("ExploreWithMouse").disabled = true;

   globalLoop = setInterval(animation, 10);
}
//   End code related to StartAnimatedCanvasTests()


// Begin code related to StopAnimatedCanvasTests()
function StopAnimatedCanvasTests()
{
   var startAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StartAnimation");
   var stopAnimationButton : HTMLInputElement = <HTMLInputElement>document.getElementById("StopAnimation");
   var exploreWithMouseButton : HTMLInputElement = <HTMLInputElement>document.getElementById("ExploreWithMouse");
   startAnimationButton.disabled = false;
   stopAnimationButton.disabled = true;
   exploreWithMouseButton.disabled = false;
   // The following were commented out and replaced with what is above
   //  document.getElementById("StartAnimation").disabled = false;
   //  document.getElementById("StopAnimation").disabled = true;
   //  document.getElementById("ExploreWithMouse").disabled = false;

   clearInterval(globalLoop);
}
//   End code related to StopAnimatedCanvasTests()

// Begin code related to ExploreWithMouse()
var globalIndexOfModifiedControlPoint : number = -1;
// -1 means none is being modified.
var globalModifyingPointOnCurve = false;

function getMousePos(canvas : HTMLCanvasElement,
                     evt : MouseEvent) : Point
{
	var rect : ClientRect = canvas.getBoundingClientRect();
	var x : number = evt.clientX - rect.left;
	var y : number = evt.clientY - rect.top;
	var mousePos : Point = new Point(x,y);
	return mousePos;
}

function onMouseDown(evt : MouseEvent,
                     theBezierCurve : CubicBezierCurve,
                     theSumOfControlPointAreas : number,
                     thePointOnCurveRadius : number,
                     theCanvas : HTMLCanvasElement,
                     controlPointCircles : Array<Circle>)
{
   var mousePos = getMousePos(theCanvas, evt);

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

function onMouseUp(evt : MouseEvent,
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
   if(globalModifyingPointOnCurve==true)
   {
      globalModifyingPointOnCurve = false;
   }
   else if (globalIndexOfModifiedControlPoint > -1)
   {
      globalIndexOfModifiedControlPoint = -1;
   }
}

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


function ExploreWithMouse()
{
   var drawingCanvas : HTMLCanvasElement =
     <HTMLCanvasElement>document.getElementById('drawingCanvas');
   var drawingContext : CanvasRenderingContext2D = <CanvasRenderingContext2D> drawingCanvas.getContext('2d');
   var width : number = drawingCanvas.width;
   var height : number = drawingCanvas.height;
   drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
   var lowerMargin : number = 0.18;
   var upperMargin : number = 1.0 - lowerMargin;
   var xDelta : number = (upperMargin - lowerMargin)/3.0;
   var P0 : Point = new Point(lowerMargin*width, lowerMargin*height)
   var P1 : Point = new Point(P0.x + xDelta*width, upperMargin*height);
   var P2 : Point = new Point(P1.x + xDelta*width, P0.y);
   var P3 : Point = new Point(upperMargin*width, P1.y);
   var C : CubicBezierCurve = new CubicBezierCurve(P0, P1, P2, P3);

   var curveStrokeColor : string = "red";
   var curveWidth : number = 10;
   var drawDataForBezierCurve : CurveDrawData = new CurveDrawData(curveStrokeColor, curveWidth);
   var lineWidth : number = 5;
   var polygonStrokeColor : string = "black";
   var drawDataForControlPolygon : CurveDrawData = new CurveDrawData(polygonStrokeColor, lineWidth);
   tGlobal = 1.0 - 2.0/(1.0 + Math.sqrt(5.0)); // 1 - reciprocal of golden ratio
   var sumOfControlPointAreas : number = globalCircleAreaFactor*10000.0;
   var controlPointFillColor : string = "blue";
   var controlPointStrokeColor : string = "green";
   var controlPointStrokeWidth : number = 5.0;
   var drawDataForControlPoints : CircleDrawData =
     new CircleDrawData(controlPointFillColor,
                        controlPointStrokeColor,
                        controlPointStrokeWidth);

   var pointOnCurveRadius : number = globalCircleRadiusFactor*15.0;
   var pointOnCurveFillColor : string = "yellow";
   var pointOnCurveStrokeColor : string = "black";
   var pointOnCurveStrokeWidth : number = 5.0;
   var drawDataForPointOnCurve : CircleDrawData =
     new CircleDrawData(pointOnCurveFillColor,
                        pointOnCurveStrokeColor,
                        pointOnCurveStrokeWidth);

   var controlPointCircles : Array<Circle> = new Array();


   C.drawAllBezierArtifacts(drawDataForBezierCurve,
                            drawDataForControlPolygon,
                            sumOfControlPointAreas,
                            drawDataForControlPoints,
                            pointOnCurveRadius,
                            drawDataForPointOnCurve,
                            drawingContext,
                            controlPointCircles);


      drawingCanvas.addEventListener('mousedown', function(evt)
         {
            onMouseDown(evt,
                          C,
                          sumOfControlPointAreas,
                          pointOnCurveRadius,
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
            onMouseUp(evt,
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
         }, false);

// Begin adding code based on
// http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices/6362527#6362527
    drawingCanvas.addEventListener("touchstart", touchHandler, true);
    drawingCanvas.addEventListener("touchmove", touchHandler, true);
    drawingCanvas.addEventListener("touchend", touchHandler, true);
//   End adding code based on
// http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices/6362527#6362527
}

//   End code related to ExploreWithMouse()

// Begin code related to HelpInTheFormOfAWebPage()
function HelpInTheFormOfAWebPage()
{
   window.open("BusyBCurvesHelp.html");
}
//   End code related to HelpInTheFormOfAWebPage()

// Begin code to support BusyBSpline

// Begin class CubicSpline
class CubicSpline
{
  CtrlPts : Array<Point>;
  ExplicitKnots : Array<number>;

  // The following is a special-purpose constructor in which we build a 3-span cubic spline curve
  // that has 6 control points and 10 knots.  It remains to determine whether
  // we should check the object for validity.  Perhaps there should be an
  // isValid() method.

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
// window.onload = StartAnimatedCanvasTests;
window.onload = ExploreWithMouse;



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


function doTests()
{
   var date : Date = new Date();
   document.writeln(date.toString());
   doPointTests();
//   CubicSplineTest();
}
