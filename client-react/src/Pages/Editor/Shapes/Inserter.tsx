import React, { FC, useEffect, useRef, useState } from 'react';
import { Circle } from 'react-konva';
import { Circle as _circle } from 'konva/lib/shapes/Circle';

type IconProps = {
    x: number;
    y: number;
    id: string;
    next: string;
    previous: string;
}



export const Inserter: FC<IconProps> = (props) => {
    const circleRef = useRef<_circle>(null);
    const WIDTH = 15;
    const HEIGHT = 15;

    return (
            <Circle ref={circleRef} 
            draggable={true}
            onClick={()=> {console.log(`${props.previous} ${props.next}`)}}
            width={WIDTH}
            height={HEIGHT}
            x={props.x} y={props.y}
            stroke="black" strokeWidth={1} fill="lightgreen" />
    );
}