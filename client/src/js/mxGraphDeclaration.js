var mxgraph = require("mxgraph")({
})
const
    {
        mxGraph,
        mxClient,
        mxRubberband,
        mxConstants,
        mxXmlRequest,
        mxCell,
        mxEdgeStyle

    } = mxgraph;


// set style of question (if) icon (rhombus)
function defineIfCellShape(graph) {
    var style = new Object();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
    graph.getStylesheet().putCellStyle('IF_ELSE', style);
}

// set style of action icon (simple rectangle)
function defineActionCellShape(graph) {
    var style = new Object();
    // set rounded rectangle style
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    // start has the same style as end
    graph.getStylesheet().putCellStyle('ACTION', style);
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
    graph.getStylesheet().putCellStyle('EMPTY', style);
}

function defineEdgeStyle(graph) {
    const style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.OrthConnector;
    style[mxConstants.ARROW_WIDTH] = 0;
}

// set style of start and end icon (rounded square)
function defineStartEndCellShape(graph) {
    var style = new Object();
    // set rounded rectangle style
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_ARCSIZE] = 50;
    // start has the same style as end
    graph.getStylesheet().putCellStyle('BEGIN', style);
    graph.getStylesheet().putCellStyle('END', style);
}


function defineCellStyles(graph) {
    defineStartEndCellShape(graph);
    defineIfCellShape(graph);
    defineActionCellShape(graph);
    defineEdgeStyle(graph);
}
export {mxGraph, mxClient,mxRubberband, mxConstants,mxXmlRequest,mxCell, mxEdgeStyle, defineCellStyles}