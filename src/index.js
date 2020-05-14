import Konva from 'konva';
import './style.css';
import icon from './favicon.png';


var stage = new Konva.Stage({
    container: 'drawer',
    width: innerWidth,
    height: innerHeight
});

var layer = new Konva.Layer();



stage.add(layer);


const input = document.querySelector('input');
input.addEventListener('click', createNewRect);

function createNewRect(e) {

    var rectangle = new Konva.Rect({
        x: 100,
        y: 100,
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
    
    rectangle.draggable('true');
    layer.add(rectangle);
    stage.add(layer);
}
