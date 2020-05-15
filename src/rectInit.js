import Konva from 'konva';

export default function createRect() {
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
    console.log('hello')
    rectangle.draggable('true');
    return rectangle;
}
