// The purpose of this file is to implement the Point class
// giving it roughly the same functionality as we have in the file
// ~/Dropbox/Public/RichardFuhr/BusyBezier/BusyBezier.js
// We will actually go ahead and implement the other functionality from
// ~/Dropbox/Public/RichardFuhr/BusyBezier/BusyBezier.js
// Also, we will reformulate some of my Objective-C BusyBSpline code as TypeScript:
// /Users/richardfuhr/Dropbox/Sandbox/typeScriptLearn/BusyBCurves001ts/BusyBSplineResources
// As of Friday, January 22, 2016 we are also going to place the derived
// file BusyBCurves.js under git control and under GitHub management.
// Adding these comments is done as a test to see how this will appear in
// SourceTree.
// We may use JSDoc as described here.
// https://en.wikipedia.org/wiki/JSDoc
// Begin declaring some of the globals
var globalPointOnCurveForParm;
//   End declaring some of the globals
// The Point class
var Point = (function () {
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
    function Point(x, y) {
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
    Point.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    //////////////////////////////////////////////////////////////////////////////
    // norm - method of Point
    // Returns the norm of this Point
    //
    // return: the norm of this Point
    // note: we currently are not creating a separate Vector class
    //////////////////////////////////////////////////////////////////////////////
    Point.prototype.norm = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    //////////////////////////////////////////////////////////////////////////////
    // plus - method of Point
    // Returns the sum of this Point with another Point
    //
    // input: that - a Point to be added to this Point
    // returns: this + that
    //////////////////////////////////////////////////////////////////////////////
    Point.prototype.plus = function (that) {
        var x = this.x + that.x;
        var y = this.y + that.y;
        return new Point(x, y);
    };
    //////////////////////////////////////////////////////////////////////////////
    // minus - method of Point
    // Returns the difference of this Point and another Point
    //
    // input: that - a Point to be subtracted from this Point
    // returns: this - that
    //////////////////////////////////////////////////////////////////////////////
    Point.prototype.minus = function (that) {
        var x = this.x - that.x;
        var y = this.y - that.y;
        return new Point(x, y);
    };
    //////////////////////////////////////////////////////////////////////////////
    // scalarMult - method of Point
    // Returns a scalar multiple of this Point
    //
    // input: s - the scalar factor to be applied to this Point
    // returns: s*this
    //////////////////////////////////////////////////////////////////////////////
    Point.prototype.scalarMult = function (s) {
        var x = s * this.x;
        var y = s * this.y;
        return new Point(x, y);
    };
    //////////////////////////////////////////////////////////////////////////////
    // dotProd - method of Point
    // Returns the dot product of this Point with another Point
    //
    // input: that - a Point to be dotted with this Point
    // returns: this*that
    //////////////////////////////////////////////////////////////////////////////
    Point.prototype.dotProd = function (that) {
        return this.x * that.x + this.y * that.y;
    };
    //////////////////////////////////////////////////////////////////////////////
    // distanceTo - method of Point
    // Returns the distance from this Point to another Point
    //
    // input: that - a Point to which the distance is to be calculated
    // returns: the distance between this Point and that Point
    //////////////////////////////////////////////////////////////////////////////
    Point.prototype.distanceTo = function (that) {
        var thisMinusThat = this.minus(that);
        var distanceToThat = thisMinusThat.norm();
        return distanceToThat;
    };
    //////////////////////////////////////////////////////////////////////////////
    // drawCircleHere - method of Point
    // Draws a circle centered at this Point with specified radius and appearance
    //
    // input: radius - the radius of the circle to be drawingCanvas
    // input: drawData - an object containing information specifying appearance
    // input: context - the context associated with the canvas
    //////////////////////////////////////////////////////////////////////////////
    Point.prototype.drawCircleHere = function (radius, drawData, context) {
        context.beginPath();
        drawData.updateContext(context);
        var anticlockwise = true; // It doesn't really matter for a full circle
        context.arc(this.x, this.y, radius, 0, Math.PI * 2, anticlockwise);
        context.fill();
        context.stroke();
    };
    //////////////////////////////////////////////////////////////////////////////
    // isInsideCircle - method of Point
    // Determines whether this Point is inside the given Circle
    //
    // input: C - the Circle used for the containment test.
    // returns: true if this Point is inside C, false otherwise.
    // Note: the code could be made much more compact; in fact, a one-liner.
    //       return(C.containsPoint(this))
    //////////////////////////////////////////////////////////////////////////////
    Point.prototype.isInsideCircle = function (C) {
        var insideCircle;
        if (C.containsPoint(this)) {
            insideCircle = true;
        }
        else {
            insideCircle = false;
        }
        return insideCircle;
    };
    return Point;
})(); // End class Point
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
function linearCombination(a, P, b, Q) {
    var aP = P.scalarMult(a);
    var bQ = Q.scalarMult(b);
    var aPplusbQ = aP.plus(bQ);
    return aPplusbQ;
}
// End Point utilities
// The Circle class.
var Circle = (function () {
    //////////////////////////////////////////////////////////////////////////////
    // constructor for Circle
    // Creates an instance of a Circle
    //
    // input: center - the center of the Circle to be constructed
    // input: radius - the radius of the Circle to be constructed
    //////////////////////////////////////////////////////////////////////////////
    function Circle(center, radius) {
        this.center = center;
        this.radius = radius;
    }
    //////////////////////////////////////////////////////////////////////////////
    // toString - method of Circle
    // Returns the string representation of this Circle
    //
    // returns: the string representation of this Circle
    //////////////////////////////////////////////////////////////////////////////
    Circle.prototype.toString = function () {
        return "center " + this.center.toString() + "radius = " + this.radius;
    };
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
    Circle.prototype.containsPoint = function (P) {
        if (P.distanceTo(this.center) < this.radius) {
            return true;
        }
        else {
            return false;
        }
    };
    //////////////////////////////////////////////////////////////////////////////
    // draw - method of Circle
    // Draws this circle with specified appearance
    //
    // input: drawData - an object containing information specifying appearance
    // input: context - the context associated with the canvas
    //
    //////////////////////////////////////////////////////////////////////////////
    Circle.prototype.draw = function (drawData, context) {
        var center = this.center;
        var radius = this.radius;
        center.drawCircleHere(radius, drawData, context);
    };
    return Circle;
})(); // End class Circle
// Note: We could possibly implement a superclass called DrawData and then
// implement CircleDrawData and CurveDrawData as subclasses of DrawData.
var CircleDrawData = (function () {
    //////////////////////////////////////////////////////////////////////////////
    // constructor for CircleDrawData
    // Creates an instance of CircleDrawData
    //
    // input: fillColor - the color with which to fill the Circle
    // input: strokeColor - the color with which to stroke the Circle
    // input: curveWidth - the width of the Circle to be drawn
    //////////////////////////////////////////////////////////////////////////////
    function CircleDrawData(fillColor, strokeColor, curveWidth) {
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
    CircleDrawData.prototype.toString = function () {
        var stringRep = "fillColor = " + this.fillColor;
        stringRep = stringRep + "\n";
        stringRep = stringRep + "strokeColor = " + this.strokeColor;
        stringRep = stringRep + "\n";
        var curveWidthString;
        curveWidthString = this.curveWidth.toString();
        stringRep = stringRep + "curveWidth = " + curveWidthString;
        return stringRep;
    };
    //////////////////////////////////////////////////////////////////////////////
    // updateContext - method of CircleDrawData
    // Updates the context for the canvas using the data in CircleDrawData
    //
    // input: context - the context associated with the canvas
    //////////////////////////////////////////////////////////////////////////////
    CircleDrawData.prototype.updateContext = function (context) {
        context.fillStyle = this.fillColor;
        context.strokeStyle = this.strokeColor;
        context.lineWidth = this.curveWidth;
    };
    return CircleDrawData;
})(); // End class CircleDrawData
var CurveDrawData = (function () {
    //////////////////////////////////////////////////////////////////////////////
    // constructor for CurveDrawData
    // Creates an instance of CurveDrawData
    //
    // input: strokeColor - the color with which to stroke the Curve
    // input: curveWidth - the width of the Curve to be drawn
    //////////////////////////////////////////////////////////////////////////////
    function CurveDrawData(strokeColor, curveWidth) {
        this.strokeColor = strokeColor;
        this.curveWidth = curveWidth;
    }
    //////////////////////////////////////////////////////////////////////////////
    // toString - method of CurveDrawData
    // Returns the string representation of this CurveDrawData
    //
    // returns: the string representation of this CurveDrawData
    //////////////////////////////////////////////////////////////////////////////
    CurveDrawData.prototype.toString = function () {
        var stringRep = "strokeColor = " + this.strokeColor;
        stringRep = stringRep + "\n";
        var curveWidthString;
        curveWidthString = this.curveWidth.toString();
        stringRep = stringRep + "curveWidth = " + curveWidthString;
        return stringRep;
    };
    //////////////////////////////////////////////////////////////////////////////
    // updateContext - method of CurveDrawData
    // Updates the context for the canvas using the data in CurveDrawData
    //
    // input: context - the context associated with the canvas
    //////////////////////////////////////////////////////////////////////////////
    CurveDrawData.prototype.updateContext = function (context) {
        context.strokeStyle = this.strokeColor;
        context.lineWidth = this.curveWidth;
    };
    return CurveDrawData;
})(); // End class CurveDrawData
// Begin utilities that are used by the CubicBezierCurve class
////////////////////////////////////////////////////////////////////////////////
// doOneDeCasteljauStep - function
// Do one step of the DeCasteljau algorithm
//
// input: P - an array of Points
// input: t - a parameter value
// returns: An array of points resulting from one step of DeCasteljau algorithm
////////////////////////////////////////////////////////////////////////////////
function doOneDeCasteljauStep(P, t) {
    // Do one step of the DeCasteljau algorithm
    var s = 1.0 - t;
    var Q = new Array();
    var n = P.length;
    for (var i = 0; i < n - 1; i++) {
        Q.push(linearCombination(s, P[i], t, P[i + 1]));
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
function doAllDeCasteljauSteps(P, t) {
    // Do all steps of the DeCasteljau algorithm
    var n = P.length;
    if (n < 1) {
        return null;
    }
    else {
        for (var i = 0; i < n - 1; i++) {
            P = doOneDeCasteljauStep(P, t); // so we are overwriting P
        }
        return P[0];
    }
}
////////////////////////////////////////////////////////////////////////////////
// hodographPoints - function
// Given control points of Bezier curve return control points of its hodograph
//
// input: P - an array of Points that are Bezier control points of curve C
// returns: An array of Points that are control points of hodograph C'
////////////////////////////////////////////////////////////////////////////////
function hodographPoints(P) {
    // Assume we are given a list of points P that are the control
    // points of a Bezier curve C.  We will construct and return a
    // list of points Q for the hodograph of that curve.
    // That is, we will return a list of points Q that are the
    // control points for the Bezier curve C'
    var Q = new Array();
    var d = P.length - 1; // so d can be interpreted as the degree of C
    for (var i = 0; i < d; i++) {
        var LinComb = linearCombination(d, P[i + 1], -1.0 * d, P[i]);
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
function binom(n, k) {
    var coeff = 1;
    for (var i = n - k + 1; i <= n; i++)
        coeff *= i;
    for (var i = 1; i <= k; i++)
        coeff /= i;
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
function bernsteinValue(i, n, t) {
    var value;
    if ((i < 0) || (i > n)) {
        value = 0.0;
    }
    else {
        value = binom(n, i) * Math.pow(t, i) * Math.pow(1.0 - t, n - i);
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
function bernsteinDeriv(i, n, t) {
    var deriv = n * (bernsteinValue(i - 1, n - 1, t) - bernsteinValue(i, n - 1, t));
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
function annotateGraphOfCubicBernstein(i, t, graphOfCubicBernstein, context) {
    var fontSpec = 'lighter 45px Sans-Serif';
    var P = graphOfCubicBernstein.positionAtParm(t);
    // Don't assume degree is 3; compute it.
    var degree = graphOfCubicBernstein.CtrlPts.length - 1;
    // We still have to evaluate the value of the Bernstein polynomial
    var y = bernsteinValue(i, degree, t);
    // If and only if the index i is 3, we will shift the base point of the text
    // to the left so that it is on the other side of the graph
    if (i == 3) {
        context.font = fontSpec;
        var textWidth = context.measureText(t.toFixed(2)).width;
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
function buildGraphOfCubicBernstein(indx, upperLeft, width, height) {
    var oneThird = 1.0 / 3.0;
    var twoThirds = 2.0 / 3.0;
    var Q0 = new Point(0.0, 1.0);
    var Q1 = new Point(oneThird, 1.0);
    var Q2 = new Point(twoThirds, 1.0);
    var Q3 = new Point(1.0, 1.0);
    // clumsy but we will do this for now
    if (indx == 0)
        Q0.y = 0.0;
    else if (indx == 1)
        Q1.y = 0.0;
    else if (indx == 2)
        Q2.y = 0.0;
    else if (indx == 3)
        Q3.y = 0.0;
    var graphOfCubicBernstein = new CubicBezierCurve(Q0, Q1, Q2, Q3);
    graphOfCubicBernstein.scale(width, height);
    graphOfCubicBernstein.translate(upperLeft);
    return graphOfCubicBernstein;
}
// End Bernstein utilities
var CubicBezierCurve = (function () {
    //////////////////////////////////////////////////////////////////////////////
    // constructor for CubicBezierCurve
    // Creates an instance of a CubicBezierCurve
    //
    // input: P0 - the 0th control point
    // input: P1 - the 1st control point
    // input: P2 - the 2nd control point
    // input: P3 - the 3rd control point
    //////////////////////////////////////////////////////////////////////////////
    function CubicBezierCurve(P0, P1, P2, P3) {
        this.CtrlPts = new Array(P0, P1, P2, P3);
    }
    //////////////////////////////////////////////////////////////////////////////
    // toString - method of CubicBezierCurve
    // Returns the string representation of this CubicBezierCurve
    //
    // returns: the string representation of this CubicBezierCurve
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.toString = function () {
        var curveData = "Data for Bezier Curve\n";
        var n = this.CtrlPts.length;
        for (var i = 0; i < n; i++) {
            curveData += "<p>";
            curveData += "CtrlPts[" + i + "] = ";
            curveData += this.CtrlPts[i].toString();
            curveData += "</p>";
        }
        return curveData;
    };
    //////////////////////////////////////////////////////////////////////////////
    // positionAtParm - method of CubicBezierCurve
    // Returns the point on this CubicBezierCurve at the input parameter
    //
    // input: t - parameter at which to get position on this CubicBezierCurve
    // returns: position on this CubicBezierCurve at parameter t
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.positionAtParm = function (t) {
        var P = this.CtrlPts;
        var pos = doAllDeCasteljauSteps(P, t);
        return pos;
    };
    //////////////////////////////////////////////////////////////////////////////
    // derivativeAtParm - method of CubicBezierCurve
    // Returns the derivative of this CubicBezierCurve at the input parameter
    //
    // input: t - parameter at which to get derivative of this CubicBezierCurve
    // returns: derivative of this CubicBezierCurve at parameter t
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.derivativeAtParm = function (t) {
        var Q = hodographPoints(this.CtrlPts);
        var der = doAllDeCasteljauSteps(Q, t);
        return der;
    };
    //////////////////////////////////////////////////////////////////////////////
    // scale - method of CubicBezierCurve
    // Scales this CubicBezierCurve using specified scale factors
    //
    // input: xScale - the scale factor in the x direction
    // input: yScale - the scale factor in the y direction
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.scale = function (xScale, yScale) {
        for (var i = 0; i < this.CtrlPts.length; i++) {
            this.CtrlPts[i].x *= xScale;
            this.CtrlPts[i].y *= yScale;
        }
    };
    //////////////////////////////////////////////////////////////////////////////
    // translate - method of CubicBezierCurve
    // Traslates this CubicBezierCurve using specified displacement
    //
    // input: P - specified displacement
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.translate = function (P) {
        for (var i = 0; i < this.CtrlPts.length; i++) {
            this.CtrlPts[i].x += P.x;
            this.CtrlPts[i].y += P.y;
        }
    };
    //////////////////////////////////////////////////////////////////////////////
    // drawCurve - method of CubicBezierCurve
    // Draws this CubicBezierCurve with specified appearance
    //
    // input: drawData - an object containing information specifying appearance
    // input: context - the context associated with the canvas
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.drawCurve = function (drawData, context) {
        context.beginPath();
        drawData.updateContext(context);
        var P = this.CtrlPts;
        context.moveTo(P[0].x, P[0].y);
        context.bezierCurveTo(P[1].x, P[1].y, P[2].x, P[2].y, P[3].x, P[3].y);
        context.stroke();
    };
    //////////////////////////////////////////////////////////////////////////////
    // drawControlPolygon - method of CubicBezierCurve
    // Draws control polygon of this CubicBezierCurve with specified appearance
    //
    // input: drawData - an object containing information specifying appearance
    // input: context - the context associated with the canvas
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.drawControlPolygon = function (drawData, context) {
        context.beginPath();
        drawData.updateContext(context);
        var P = this.CtrlPts;
        context.moveTo(P[0].x, P[0].y);
        for (var i = 1; i < P.length; i++) {
            context.lineTo(P[i].x, P[i].y);
        }
        context.stroke();
    };
    //////////////////////////////////////////////////////////////////////////////
    // drawControlPoints - method of CubicBezierCurve
    // Draws control points of this CubicBezierCurve with specified appearance
    //
    // input: radius - the radius of the circles representing the control points
    // input: drawData - an object containing information specifying appearance
    // input: context - the context associated with the canvas
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.drawControlPoints = function (radius, drawData, context) {
        var controlPoints = this.CtrlPts;
        var n = controlPoints.length;
        for (var i = 0; i < n; i++) {
            controlPoints[i].drawCircleHere(radius, drawData, context);
        }
    };
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
    CubicBezierCurve.prototype.drawControlPointsWeightedForParm = function (t, sumOfAreas, drawData, context, controlPointCircles) {
        var controlPoints = this.CtrlPts;
        var order = controlPoints.length;
        var degree = order - 1;
        for (var i = 0; i < order; i++) {
            var actualArea = sumOfAreas * bernsteinValue(i, degree, t);
            // NOTE: actualArea = Math.PI*(actualRadius)^2
            // so actualRadius = sqrt(actualArea/Math.PI)
            var actualRadius = Math.sqrt(actualArea / Math.PI);
            controlPoints[i].drawCircleHere(actualRadius, drawData, context);
            controlPointCircles[i] = new Circle(controlPoints[i], actualRadius);
        }
    };
    //////////////////////////////////////////////////////////////////////////////
    // drawPointOnCurveForParm - method of CubicBezierCurve
    // Draws point on curve at specified parameter with specified appearance
    //
    // input: t - parameter at which corresponding point is to be drawn
    // input: radius - the radius of the circle representing the point
    // input: drawData - an object containing information specifying appearance
    // input: context - the context associated with the canvas
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.drawPointOnCurveForParm = function (t, radius, drawData, context) {
        var P = this.positionAtParm(t);
        P.drawCircleHere(radius, drawData, context);
    };
    //////////////////////////////////////////////////////////////////////////////
    // drawVerticalLineFromCurveForParm - method of CubicBezierCurve
    // Draw a vertical line from a point on a curve to its local X-axis
    //
    // input: t - parameter that determines point on the curve
    // input: strokeColor - color used for drawing the line
    // input: lineWidth - the width of the line to be drawn
    // input: context - the context associated with the canvas
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.drawVerticalLineFromCurveForParm = function (t, strokeColor, lineWidth, context) {
        var P = this.positionAtParm(t);
        // Now, we will create a point Q that has the same x coordinate as P and whose
        // y coordinate is equal to the maximum of the y coordinates of the control points
        // of this CubicBezierCurve.  That is because y increases as we go downward.
        var controlPoints = this.CtrlPts;
        var yMax = controlPoints[0].y;
        for (var i = 1; i < controlPoints.length; i++) {
            var yCurr = controlPoints[i].y;
            if (yMax < yCurr) {
                yMax = yCurr;
            }
        }
        var Q = new Point(P.x, yMax);
        context.beginPath();
        context.strokeStyle = strokeColor;
        context.lineWidth = lineWidth;
        context.moveTo(P.x, P.y);
        context.lineTo(Q.x, Q.y);
        context.stroke();
    };
    //////////////////////////////////////////////////////////////////////////////
    // drawBasisFunctionsWithParm - method of CubicBezierCurve
    // Draw graphs of cubic Bernstein polynomials with a point on each graph
    //
    // input: t - the parameter where we should draw corresponding points
    // input: graphStrokeColor - the color with which to draw the graphs
    // input: sumOfControlPointAreas -  sum of the areas of control point circles
    // input: context - the context associated with the canvas
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.drawBasisFunctionsWithParm = function (t, graphStrokeColor, graphWidth, sumOfControlPointAreas, context) {
        // We will use maxRadius to help position the graphs.
        // Of course we are recalculating maxRadius each time, which is not efficient
        // Later (if later ever becomes now), we will see about making this more efficient.
        var maxRadius = Math.sqrt(sumOfControlPointAreas / Math.PI);
        var delta1 = new Point(1.0 * maxRadius, -1.0 * maxRadius);
        var delta2 = new Point(-3.0 * maxRadius, -1.0 * maxRadius);
        var upperLeft;
        for (var indx = 0; indx < 4; indx++) {
            if (indx % 2 == 0) {
                upperLeft = (this.CtrlPts[indx]).plus(delta1);
            }
            else {
                upperLeft = (this.CtrlPts[indx]).plus(delta2);
            }
            var graphOfCubicBernstein = buildGraphOfCubicBernstein(indx, upperLeft, 2.0 * maxRadius, 2.0 * maxRadius);
            var drawDataForGraphOfCubicBernstein = new CurveDrawData(graphStrokeColor, graphWidth);
            graphOfCubicBernstein.drawCurve(drawDataForGraphOfCubicBernstein, context);
            var pointOnGraphRadius = 3.0;
            var pointOnGraphFillColor = "black";
            var pointOnGraphStrokeColor = "black";
            var pointOnGraphStrokeWidth = 5.0;
            var drawDataForPointOnGraph = new CircleDrawData(pointOnGraphFillColor, pointOnGraphStrokeColor, pointOnGraphStrokeWidth);
            graphOfCubicBernstein.drawPointOnCurveForParm(t, pointOnGraphRadius, drawDataForPointOnGraph, context);
            graphOfCubicBernstein.drawVerticalLineFromCurveForParm(t, "black", graphWidth, context);
            annotateGraphOfCubicBernstein(indx, t, graphOfCubicBernstein, context);
        }
    };
    //////////////////////////////////////////////////////////////////////////////
    // drawAllBezierArtifacts - method of CubicBezierCurve
    // Draw all information associated with this CubicBezierCurve
    //
    // input: drawDataForBezierCurve - style for drawing this CubicBezierCurve
    // input: drawDataForControlPolygon - style for drawing control polygon
    // input: sumOfControlPointAreas - sum of areas of control points
    // input: drawDataForControlPoints - style for drawing control points
    // input: pointOnCurveRadius - radius of circle representing point on curve
    // input: drawDataForPointOnCurve - style for drawing point on curve
    // input: context - the context associated with the canvas
    // output: controlPointCircles - circles marking weighted control points
    //////////////////////////////////////////////////////////////////////////////
    CubicBezierCurve.prototype.drawAllBezierArtifacts = function (drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, context, controlPointCircles) {
        this.drawCurve(drawDataForBezierCurve, context);
        this.drawControlPolygon(drawDataForControlPolygon, context);
        this.drawControlPointsWeightedForParm(tGlobal, sumOfControlPointAreas, drawDataForControlPoints, context, controlPointCircles);
        this.drawPointOnCurveForParm(tGlobal, pointOnCurveRadius, drawDataForPointOnCurve, context);
        var pointOnCurve = this.positionAtParm(tGlobal);
        globalPointOnCurveForParm = new Circle(pointOnCurve, pointOnCurveRadius);
        var textLocation = new Point(pointOnCurve.x, pointOnCurve.y - pointOnCurveRadius);
        var fontSpec = 'lighter 45px Sans-Serif';
        drawTextForNumber(tGlobal, textLocation, fontSpec, context);
        // temporarily hard-code some of the input parameters
        var graphStrokeColor = "green";
        var graphWidth = 2;
        this.drawBasisFunctionsWithParm(tGlobal, graphStrokeColor, graphWidth, sumOfControlPointAreas, context);
    };
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
    CubicBezierCurve.prototype.editPointOnCurve = function (evt, drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, context, canvas, controlPointCircles) {
        var P = this.positionAtParm(tGlobal);
        var V = this.derivativeAtParm(tGlobal);
        var M = getMousePos(canvas, evt);
        var vdotv = V.dotProd(V);
        var dt = 0.0;
        if (vdotv > 0.0) {
            dt = ((M.minus(P)).dotProd(V)) / vdotv;
        }
        tGlobal += dt;
        if (tGlobal < 0.0)
            tGlobal = 0.0;
        if (tGlobal > 1.0)
            tGlobal = 1.0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.drawAllBezierArtifacts(drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, context, controlPointCircles);
    };
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
    CubicBezierCurve.prototype.editControlPoint = function (evt, drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, context, canvas, controlPointCircles) {
        var mousePos = getMousePos(canvas, evt);
        this.CtrlPts[globalIndexOfModifiedControlPoint] = mousePos;
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.drawAllBezierArtifacts(drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, context, controlPointCircles);
    };
    return CubicBezierCurve;
})(); // End class CubicBezierCurve
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
function drawTextForNumber(t, textLocation, fontSpec, context) {
    context.font = fontSpec;
    context.strokeText(t.toFixed(2), textLocation.x, textLocation.y);
}
// End Canvas utilities
// Begin code related to StartAnimatedCanvasTests()
var globalLoop; //used by StartAnimatedCanvasTests and StopAnimatedCanvasTests
var tGlobal = 0.0; // global
var tDeltaGlobal = 0.001;
var globalCircleAreaFactor = 2.0;
var globalCircleRadiusFactor = Math.sqrt(globalCircleAreaFactor);
////////////////////////////////////////////////////////////////////////////////
// tGlobalUpdate - function
// Change the tGlobal parameter to prepare for the next step in the animation
//
// TODO - Consider ways to reformulate this without the use of global variables
////////////////////////////////////////////////////////////////////////////////
function tGlobalUpdate() {
    tGlobal = tGlobal + tDeltaGlobal;
    if (tGlobal > 1.0) {
        tGlobal = 1.0;
        tDeltaGlobal = -1.0 * tDeltaGlobal;
    }
    else if (tGlobal < 0.0) {
        tGlobal = 0.0;
        tDeltaGlobal = -1.0 * tDeltaGlobal;
    }
}
////////////////////////////////////////////////////////////////////////////////
// animation - function
// Create a CubicBezierCurve and set the drawing style for animation.
// TODO - Why are we re-creating the curve with every call to this function?
////////////////////////////////////////////////////////////////////////////////
function animation() {
    var drawingCanvas = document.getElementById('drawingCanvas');
    var drawingContext = drawingCanvas.getContext('2d');
    var width = drawingCanvas.width;
    var height = drawingCanvas.height;
    drawingContext.clearRect(0, 0, width, height);
    var lowerMargin = 0.18;
    var upperMargin = 1.0 - lowerMargin;
    var xDelta = (upperMargin - lowerMargin) / 3.0;
    var P0 = new Point(lowerMargin * width, lowerMargin * height);
    var P1 = new Point(P0.x + xDelta * width, upperMargin * height);
    var P2 = new Point(P1.x + xDelta * width, P0.y);
    var P3 = new Point(upperMargin * width, P1.y);
    var C = new CubicBezierCurve(P0, P1, P2, P3);
    var curveStrokeColor = "red";
    var curveWidth = 10;
    var drawDataForBezierCurve = new CurveDrawData(curveStrokeColor, curveWidth);
    var lineWidth = 5;
    var polygonStrokeColor = "black";
    var drawDataForControlPolygon = new CurveDrawData(polygonStrokeColor, lineWidth);
    tGlobalUpdate(); // the global value of t is adjusted
    var sumOfControlPointAreas = globalCircleAreaFactor * 10000.0;
    var controlPointFillColor = "blue";
    var controlPointStrokeColor = "green";
    var controlPointStrokeWidth = 5.0;
    var drawDataForControlPoints = new CircleDrawData(controlPointFillColor, controlPointStrokeColor, controlPointStrokeWidth);
    var pointOnCurveRadius = globalCircleRadiusFactor * 15.0;
    var pointOnCurveFillColor = "yellow";
    var pointOnCurveStrokeColor = "black";
    var pointOnCurveStrokeWidth = 5.0;
    var drawDataForPointOnCurve = new CircleDrawData(pointOnCurveFillColor, pointOnCurveStrokeColor, pointOnCurveStrokeWidth);
    var controlPointCircles = new Array();
    C.drawAllBezierArtifacts(drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, drawingContext, controlPointCircles);
}
////////////////////////////////////////////////////////////////////////////////
// StartAnimatedCanvasTests - function
// Enable and disable the buttons and set the animation interval
////////////////////////////////////////////////////////////////////////////////
function StartAnimatedCanvasTests() {
    var startAnimationButton = document.getElementById("StartAnimation");
    var stopAnimationButton = document.getElementById("StopAnimation");
    var exploreWithMouseButton = document.getElementById("ExploreWithMouse");
    startAnimationButton.disabled = true;
    stopAnimationButton.disabled = false;
    exploreWithMouseButton.disabled = true;
    globalLoop = setInterval(animation, 10);
}
//   End code related to StartAnimatedCanvasTests()
// Begin code related to StopAnimatedCanvasTests()
////////////////////////////////////////////////////////////////////////////////
// StopAnimatedCanvasTests - function
// Clear the animation interval and reenable and disable the buttons
////////////////////////////////////////////////////////////////////////////////
function StopAnimatedCanvasTests() {
    var startAnimationButton = document.getElementById("StartAnimation");
    var stopAnimationButton = document.getElementById("StopAnimation");
    var exploreWithMouseButton = document.getElementById("ExploreWithMouse");
    startAnimationButton.disabled = false;
    stopAnimationButton.disabled = true;
    exploreWithMouseButton.disabled = false;
    clearInterval(globalLoop);
}
//   End code related to StopAnimatedCanvasTests()
// Begin code related to ExploreWithMouse()
var globalIndexOfModifiedControlPoint = -1;
// -1 means none is being modified.
var globalModifyingPointOnCurve = false;
////////////////////////////////////////////////////////////////////////////////
// getMousePos - function
// Get current position of mouse in terms of canvas coordinates
//
// input: canvas - the canvas on which we are drawing
// input: evt - the mouse event
// returns: current position of mouse in terms of canvas coordinates
////////////////////////////////////////////////////////////////////////////////
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var x = evt.clientX - rect.left;
    var y = evt.clientY - rect.top;
    var mousePos = new Point(x, y);
    return mousePos;
}
function onMouseDown(evt, theBezierCurve, theSumOfControlPointAreas, thePointOnCurveRadius, theCanvas, controlPointCircles) {
    var mousePos = getMousePos(theCanvas, evt);
    globalIndexOfModifiedControlPoint = -1;
    if (mousePos.isInsideCircle(globalPointOnCurveForParm)) {
        globalModifyingPointOnCurve = true;
        globalIndexOfModifiedControlPoint = -1;
    }
    else
        for (var i = 0; i < controlPointCircles.length; i++) {
            if (mousePos.isInsideCircle(controlPointCircles[i])) {
                globalIndexOfModifiedControlPoint = i;
                globalModifyingPointOnCurve = false;
                break;
            }
        }
}
function onMouseMove(evt, C, drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, drawingContext, drawingCanvas, controlPointCircles) {
    if (globalModifyingPointOnCurve == true) {
        C.editPointOnCurve(evt, drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, drawingContext, drawingCanvas, controlPointCircles);
    }
    else if (globalIndexOfModifiedControlPoint > -1) {
        C.editControlPoint(evt, drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, drawingContext, drawingCanvas, controlPointCircles);
    }
    else {
    }
}
function onMouseUp(evt, C, drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, drawingContext, drawingCanvas, controlPointCircles) {
    if (globalModifyingPointOnCurve == true) {
        globalModifyingPointOnCurve = false;
    }
    else if (globalIndexOfModifiedControlPoint > -1) {
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
    }[event.type], true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}
function ExploreWithMouse() {
    var drawingCanvas = document.getElementById('drawingCanvas');
    var drawingContext = drawingCanvas.getContext('2d');
    var width = drawingCanvas.width;
    var height = drawingCanvas.height;
    drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    var lowerMargin = 0.18;
    var upperMargin = 1.0 - lowerMargin;
    var xDelta = (upperMargin - lowerMargin) / 3.0;
    var P0 = new Point(lowerMargin * width, lowerMargin * height);
    var P1 = new Point(P0.x + xDelta * width, upperMargin * height);
    var P2 = new Point(P1.x + xDelta * width, P0.y);
    var P3 = new Point(upperMargin * width, P1.y);
    var C = new CubicBezierCurve(P0, P1, P2, P3);
    var curveStrokeColor = "red";
    var curveWidth = 10;
    var drawDataForBezierCurve = new CurveDrawData(curveStrokeColor, curveWidth);
    var lineWidth = 5;
    var polygonStrokeColor = "black";
    var drawDataForControlPolygon = new CurveDrawData(polygonStrokeColor, lineWidth);
    tGlobal = 1.0 - 2.0 / (1.0 + Math.sqrt(5.0)); // 1 - reciprocal of golden ratio
    var sumOfControlPointAreas = globalCircleAreaFactor * 10000.0;
    var controlPointFillColor = "blue";
    var controlPointStrokeColor = "green";
    var controlPointStrokeWidth = 5.0;
    var drawDataForControlPoints = new CircleDrawData(controlPointFillColor, controlPointStrokeColor, controlPointStrokeWidth);
    var pointOnCurveRadius = globalCircleRadiusFactor * 15.0;
    var pointOnCurveFillColor = "yellow";
    var pointOnCurveStrokeColor = "black";
    var pointOnCurveStrokeWidth = 5.0;
    var drawDataForPointOnCurve = new CircleDrawData(pointOnCurveFillColor, pointOnCurveStrokeColor, pointOnCurveStrokeWidth);
    var controlPointCircles = new Array();
    C.drawAllBezierArtifacts(drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, drawingContext, controlPointCircles);
    drawingCanvas.addEventListener('mousedown', function (evt) {
        onMouseDown(evt, C, sumOfControlPointAreas, pointOnCurveRadius, drawingCanvas, controlPointCircles);
    }, false);
    drawingCanvas.addEventListener('mousemove', function (evt) {
        onMouseMove(evt, C, drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, drawingContext, drawingCanvas, controlPointCircles);
    }, true);
    drawingCanvas.addEventListener('mouseup', function (evt) {
        onMouseUp(evt, C, drawDataForBezierCurve, drawDataForControlPolygon, sumOfControlPointAreas, drawDataForControlPoints, pointOnCurveRadius, drawDataForPointOnCurve, drawingContext, drawingCanvas, controlPointCircles);
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
function HelpInTheFormOfAWebPage() {
    window.open("BusyBCurvesHelp.html");
}
//   End code related to HelpInTheFormOfAWebPage()
// Begin code to support BusyBSpline
// Begin class CubicSpline
var CubicSpline = (function () {
    // The following is a special-purpose constructor in which we build a 3-span cubic spline curve
    // that has 6 control points and 10 knots.  It remains to determine whether
    // we should check the object for validity.  Perhaps there should be an
    // isValid() method.
    function CubicSpline(P0, P1, P2, P3, P4, P5, t0, t1, t2, t3) {
        this.CtrlPts = new Array();
        this.CtrlPts.push(P0);
        this.CtrlPts.push(P1);
        this.CtrlPts.push(P2);
        this.CtrlPts.push(P3);
        this.CtrlPts.push(P4);
        this.CtrlPts.push(P5);
        this.ExplicitKnots = new Array();
        // The first knot has multiplicity 4
        for (var i = 0; i < 4; i++) {
            this.ExplicitKnots.push(t0);
        }
        // The two interior knots each have multiplicity 1
        this.ExplicitKnots.push(t1);
        this.ExplicitKnots.push(t2);
        // The last knot has multiplicity 4
        for (var j = 0; j < 4; j++) {
            this.ExplicitKnots.push(t3);
        }
    }
    // Multiple constructor implementations are apparently not allowed.
    CubicSpline.prototype.toString = function () {
        var curveData = "Data for Spline Curve\n";
        var nPts = this.CtrlPts.length;
        for (var i = 0; i < nPts; i++) {
            curveData += "<p>";
            curveData += "CtrlPts[" + i + "] = ";
            curveData += this.CtrlPts[i].toString();
            curveData += "</p>";
        }
        var nKts = this.ExplicitKnots.length;
        for (var j = 0; j < nKts; j++) {
            curveData += "<p>";
            curveData += "ExplicitKnots[" + j + "] = ";
            curveData += this.ExplicitKnots[j].toString();
            curveData += "</p>";
        }
        return curveData;
    };
    CubicSpline.prototype.isValid = function () {
        var thisIsValid = true; // innocent until proven guilty
        var nCrtlPts = this.CtrlPts.length;
        var nKts = this.ExplicitKnots.length;
        var degree = 3; // we know it is 3 in this case
        var order = degree + 1;
        var delta = nKts - nCrtlPts;
        if (delta != order) {
            thisIsValid = false;
        }
        return thisIsValid;
    };
    return CubicSpline;
})();
// End class CubicSpline
//   End code to support BusyBSpline
// Do this when the web page is loaded
// window.onload = StartAnimatedCanvasTests;
window.onload = ExploreWithMouse;
///////////////////////////////////////////////////////////////////////////////
// Miscellaneous tests of the above.
function doPointTests() {
    var P = new Point(3, 4);
    var Q = new Point(7, 8);
    var R = P.plus(Q);
    var d = P.dotProd(Q);
    document.writeln("<p>In doPointTests()</p>");
    document.writeln("<p>    P = " + P.toString() + " </p>");
    document.writeln("<p>    Q = " + Q.toString() + "</p>");
    document.writeln("<p>P + Q = " + R.toString() + "</p>");
    document.writeln("<p>P*Q = " + d.toString() + "</p>");
}
// Canvas-related explorations
function doCanvasTests() {
    var document;
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
}
function simpleAlert() {
    // alert("Firefox");
    // alert("Safari");
    // alert("Chrome")
    // alert("Opera");
    alert("Just testing");
}
function sillyTest() {
    document.writeln("In sillyTest()");
    document.writeln("<p>");
    document.writeln("Just testing");
    for (var i = 0; i < 10; i++) {
        // document.write(i.toString());
        document.write((i * i).toString());
        document.write("<p>");
    }
}
function CubicSplineTest() {
    document.writeln("<p>In CubicSplineTest()</p>");
    var P0 = new Point(1.01, 2.01);
    var P1 = new Point(3.01, 4.01);
    var P2 = new Point(5.01, 6.01);
    var P3 = new Point(7.01, 8.01);
    var P4 = new Point(9.01, 10.01);
    var P5 = new Point(11.01, 12.01);
    var t0 = 0.01;
    var t1 = 1.01;
    var t2 = 2.01;
    var t3 = 3.01;
    var C = new CubicSpline(P0, P1, P2, P3, P4, P5, t0, t1, t2, t3);
    document.writeln("<p>");
    document.writeln("Data for CubicSpline object");
    var CubicSplineData = C.toString();
    document.writeln(CubicSplineData);
    document.writeln("<p>");
}
function doTests() {
    var date = new Date();
    document.writeln(date.toString());
    doPointTests();
    //   CubicSplineTest();
}
