import Konva from 'konva';

var stage = new Konva.Stage({
    container: 'drawer',
    width: innerWidth,
    height: innerHeight
});

var layer = new Konva.Layer();

var pentagon = new Konva.Rect({
    x: stage.width() / 2,
    y: stage.height() / 2,
    width: 100,
    height: 50,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    shadowOffsetX: 20,
    shadowOffsetY: 25,
    shadowBlur: 40,
    opacity: 0.5
});

pentagon.draggable('true');

layer.add(pentagon);
stage.add(layer);