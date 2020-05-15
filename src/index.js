import Konva from 'konva';
import './style.css';
import rectInit from './rectInit'


var stage = new Konva.Stage({
    container: 'drawer',
    width: innerWidth,
    height: innerHeight
});

var layer = new Konva.Layer();



const input = document.querySelector('input');
input.addEventListener('click', ()=> {
    var rect = rectInit();
    layer.add(rect);
    stage.add(layer);
}, true);
