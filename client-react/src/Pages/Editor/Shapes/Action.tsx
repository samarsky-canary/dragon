import React, { FC, useEffect, useRef, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { Rect as _rect } from 'konva/lib/shapes/Rect';
import { Text as _text } from 'konva/lib/shapes/Text';
import { Group as _group } from 'konva/lib/Group';

const EXTRAHEIGHT_SPACE = 20;
const EXTRAWIDTH_SPACE = 30;


type IconProps = {
    text?: string;
    setText?: (value: string) => void
    x?: number;
    y?: number;
}


export const Action: FC<IconProps> = ({ text, x, y }) => {
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
        <Group 
        draggable
        ref={groupRef}
        onClick={()=> {console.log("clicked icon")}}
        >
            <Rect ref={rectRef} 
            width={textWidth + EXTRAWIDTH_SPACE} 
            height={textHeight + EXTRAHEIGHT_SPACE} 
            x={x} y={y}
            stroke="black" strokeWidth={1} fill="white" />
            <Text ref={textRef} 
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