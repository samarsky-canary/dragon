import '../css/style.css';
import diagram from './dsLoader'
import loadDiagram from "./dsLoader";

var mxgraph = require("mxgraph")({
    mxImageBasePath: "./src/images",
    mxBasePath: "./src"
})

var mxClient = mxgraph.mxClient;
var mxGraph = mxgraph.mxGraph;
var mxRubberband = mxgraph.mxRubberband;
var mxConstants = mxgraph.mxConstants;
var mxXmlRequest = mxgraph.mxXmlRequest;

// set style of question (if) icon (rhombus)
function defineIfCellShape(graph) {
    var style = new Object();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
    graph.getStylesheet().putCellStyle('IF', style);
}

// set style of action icon (simple rectangle)
function defineActionCellShape(graph) {
    var style = new Object();
    // set rounded rectangle style
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    // start has the same style as end
    graph.getStylesheet().putCellStyle('ACTION', style);
    graph.getStylesheet().putCellStyle('EMPTY', style);
}

// set style of start and end icon (rounded square)
function defineStartEndCellShape(graph) {
    var style = new Object();
    // set rounded rectangle style
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_ARCSIZE] = 50;
    // start has the same style as end
    graph.getStylesheet().putCellStyle('START', style);
    graph.getStylesheet().putCellStyle('END', style);
}


function defineCellStyles(graph) {
    defineStartEndCellShape(graph);
    defineIfCellShape(graph);
    defineActionCellShape(graph);
}

function main(container) {
    if (!mxClient.isBrowserSupported) {
        console.log('no');
    }
    else {
        var graph = new mxGraph(container);
        defineCellStyles(graph);
        new mxRubberband(graph);
        var parent = graph.getDefaultParent();

        graph.getModel().beginUpdate();
        try
        {
            var styles = ['IF', 'ACTION'];
            var y = 0;
            var offset = 50;
            var v1 = graph.insertVertex(parent, null, 'enter', 20, y+=offset, 80, 30, 'START');
            for (var i = 0; i <3; i++)
            {
                var v2 = graph.insertVertex(parent, null, 'action ' + i, 20, y+=offset, 80, 30, styles[i % 2]);
                var e1 = graph.insertEdge(parent, null, '', v1, v2);
                v1 = v2;
            }
            var v1 = graph.insertVertex(parent, null, 'exit', 20, y+=offset, 80, 30, 'END');
            var e1 = graph.insertEdge(parent, null, '', v2, v1);
        }
        finally
        {
            graph.getModel().endUpdate();
        }
    }
};


function emit()
{
    var tag = document.getElementById('graph-container');
    main(tag);
}

emit();

var loadSchemeFromFile = document.getElementById('file-selector');
loadSchemeFromFile.addEventListener('close', loadDiagram(loadSchemeFromFile));
