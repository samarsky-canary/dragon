import React, { useEffect } from 'react';
import { Layer, Stage, Rect } from 'react-konva';
import useImage from 'use-image';
import { DragonModel } from '../../../dragon/dragon.model/dragon.model';
import { SchemaDTO } from '../../../services/SchemaService';
import { Action } from '../Shapes/Action';

type Props = {
    width: number;
    height: number;
    schema?: SchemaDTO;
}

export const KonvaCanvas: React.FC<Props> = ({ width, height, schema }) => {

    useEffect(()=>{
        if (schema) {
            const model = new DragonModel().restoreFromJSON(schema?.data);
            console.log(schema.data)
        }

    },[schema])
    
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