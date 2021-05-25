import React from 'react';
import { Layer, Stage, Rect } from 'react-konva';
import useImage from 'use-image';
import { Action } from '../Shapes/Action';

type Props = {
    width: number;
    height: number;
}

export const KonvaCanvas: React.FC<Props> = ({ width, height }) => {

    const [grid] = useImage("./grid.gif");

    return (
        <Stage width={width} height={700}>
            <Layer>
                <Rect width={width} height={height} fillPatternImage={grid} stroke="grey"></Rect>
            </Layer>
            <Layer>
                <Action text="let y = 5" x={10} y={10}></Action>
                <Action text="y++" x={10} y={60}></Action>
            </Layer>
        </Stage>
    )
}