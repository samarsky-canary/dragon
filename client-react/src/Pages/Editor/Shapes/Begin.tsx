import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Group, Rect, Text, Shape } from 'react-konva';
import { Text as _text } from 'konva/lib/shapes/Text';
import { Rect as _rect } from 'konva/lib/shapes/Rect';
import { Group as _group } from 'konva/lib/Group';
import { Shape as _shape} from 'konva/lib/Shape';
import { HEIGHT, WIDTH } from './CONSTRAINTS';


export type IconProps = {
    text: string,
    x: number,
    y: number,
    id: string
}


export const Begin: FC<IconProps> = ({ text, id, x ,y}) => {
    const [textWidth, setTextWidth] = useState(0);
    const [textHeight, setTextHeight] = useState(0);
    const rectRef = useRef<_rect>(null);
    const textRef = useRef<_text>(null);
    const groupRef = useRef<_group>(null);


    if (groupRef.current && rectRef.current)
    groupRef.current.clip({
        x: rectRef.current.x(),
        y: rectRef.current.y(),
        width: rectRef.current.width(),
        height: rectRef.current.height(),
    })

    useEffect(() => {
        if (textRef.current) {
            setTextWidth(textRef.current.width());
            setTextHeight(textRef.current.height());
        }
    }, [textWidth, textHeight])

    return (
        <Group id={id} draggable ref={groupRef}>
            <Rect 
            ref={rectRef}
            width={WIDTH} 
            height={HEIGHT} 
            x={x} y={y}
            cornerRadius={50}
            stroke="black" strokeWidth={1} fill="white" />
            <Text 
            ref={textRef}
            text={text}
            x={ x! + (rectRef.current ? rectRef.current.width() / 2 : 0)}
            y={y}
            offsetX={textWidth / 2}
            align="center"
            height={rectRef.current ? (rectRef.current.height()) : 0}
            verticalAlign='middle'
            />
        </Group>
    );
}























export const Condition: FC<IconProps> = ({ text, id, x ,y}) => {
    const [textWidth, setTextWidth] = useState(0);
    const [textHeight, setTextHeight] = useState(0);
    const shapeRef = useRef<_shape>(null);
    const textRef = useRef<_text>(null);
    const groupRef = useRef<_group>(null);


    if (groupRef.current && shapeRef.current)
    groupRef.current.clip({
        x: shapeRef.current.x(),
        y: shapeRef.current.y(),
        width: shapeRef.current.width(),
        height: shapeRef.current.height(),
    })

    useEffect(() => {
        if (textRef.current) {
            setTextWidth(textRef.current.width());
            setTextHeight(textRef.current.height());
        }
    }, [textWidth, textHeight])

    return (
        <Group draggable ref={groupRef}>
            <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(0, HEIGHT/2);
              context.lineTo(WIDTH/2, 0);
              context.lineTo(WIDTH, HEIGHT/2);
              context.lineTo(WIDTH/2, HEIGHT);
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            fill="white"
            stroke="black"
            strokeWidth={1}
          />
            <Text 
            ref={textRef}
            text={text}
            x={WIDTH/2}
            y={HEIGHT/2}
            offsetX={textWidth / 2}
            align="center"
            height={shapeRef.current ? (shapeRef.current.height()) : 0}
            verticalAlign='middle'
            />
        </Group>
    );
}