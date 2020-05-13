var konva = require('konva');

var stage = konva.Stage({
    container: 'container',
    width: 500,
    height: 500,
});

var layer = new konva.Layer();

var circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
});

layer.add(layer);
stage.add(layer);

layer.draw();