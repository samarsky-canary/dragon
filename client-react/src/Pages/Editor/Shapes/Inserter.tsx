import React, { FC, useEffect, useRef, useState } from 'react';
import { Circle } from 'react-konva';
import { Circle as _circle } from 'konva/lib/shapes/Circle';

type IconProps = {
    x?: number;
    y?: number;
    parent_id: string;
    next_id: string;
}



export const Inserter: FC<IconProps> = ({ parent_id, next_id, x, y }) => {
    const circleRef = useRef<_circle>(null);
    const WIDTH = 15;
    const HEIGHT = 15;

    return (
            <Circle ref={circleRef} 
            draggable={true}
            onClick={()=> {console.log(`${parent_id} ${next_id}`)}}
            width={WIDTH}
            height={HEIGHT}
            x={x} y={y}
            stroke="black" strokeWidth={1} fill="lightgreen" />
    );
}