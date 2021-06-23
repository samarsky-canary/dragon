import React, { useEffect, useRef } from 'react';
import { Layer, Stage, Rect } from 'react-konva';
import { Layer as _layer } from 'konva/lib/Layer';
import { Stage as _stage } from 'konva/lib/Stage';
import { Rect as _rect } from 'konva/lib/shapes/Rect';
import useImage from 'use-image';
import { DragonModel } from '../../../dragon/dragon.model/dragon.model';
import { Schema } from '../Shapes/Schema';

type Props = {
    width: number;
    height: number;
    model: DragonModel;
    setModel: (value: DragonModel) => void;
    actionMenuOption: number;
}


function getCenter(node: any) {
    return {
        x: node.x() + node.width() / 2,
        y: node.y() + node.height() / 2
    }
}

function getAngle(object1: any, object2: any) {
    const c1 = getCenter(object1);
    const c2 = getCenter(object2);

    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const angle = Math.atan2(-dy, dx);
}

function getRectangleBorderPoint(radians: any, size: any, sideOffset = 0) {
    const width = size.width + sideOffset * 2;

    const height = size.height + sideOffset * 2;

    radians %= 2 * Math.PI;
    if (radians < 0) {
        radians += Math.PI * 2;
    }

    const phi = Math.atan(height / width);

    let x = 0;
    let y = 0;
    if (
        (radians >= 2 * Math.PI - phi && radians <= 2 * Math.PI) ||
        (radians >= 0 && radians <= phi)
    ) {
        x = width / 2;
        y = Math.tan(radians) * x;
    } else if (radians >= phi && radians <= Math.PI - phi) {
        y = height / 2;
        x = y / Math.tan(radians);
    } else if (radians >= Math.PI - phi && radians <= Math.PI + phi) {
        x = -width / 2;
        y = Math.tan(radians) * x;
    } else if (radians >= Math.PI + phi && radians <= 2 * Math.PI - phi) {
        y = -height / 2;
        x = y / Math.tan(radians);
    }

    return {
        x: -Math.round(x),
        y: Math.round(y)
    };
}

function getPoints(r1: any, r2: any) {
    const c1 = getCenter(r1);
    const c2 = getCenter(r2);

    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const angle = Math.atan2(-dy, dx);

    const startOffset = getRectangleBorderPoint(angle + Math.PI, r1.size());
    const endOffset = getRectangleBorderPoint(angle, r2.size());

    const start = {
        x: c1.x - startOffset.x,
        y: c1.y - startOffset.y
    };

    const end = {
        x: c2.x - endOffset.x,
        y: c2.y - endOffset.y
    };

    return [start.x, start.y, end.x, end.y]
}

function updateLine(rect1: any, rect2: any, line: any) {
    const points = getPoints(rect1, rect2);
    line.points(points);
}

export const KonvaCanvas: React.FC<Props> = ({ width, height, model, setModel, actionMenuOption }) => {
    const [grid] = useImage("./grid.gif");

    useEffect(() => {
        console.log(model.toJSON());
    }, [model])
    const groupRef = useRef<_layer>(null)
    const stageRef = useRef<_stage>(null);
    const backgroundRef = useRef<_rect>(null);

    useEffect(()=>{
        if (stageRef.current)
        stageRef.current!.on('dragmove', ()=>{
            if (backgroundRef.current) {
                backgroundRef.current.absolutePosition({x:0, y: 0});
            }
        })
    })

    return (
        <Stage ref={stageRef} draggable width={width} height={800}>
            <Layer draggable ref={groupRef}>
                <Rect ref={backgroundRef} width={width} height={height} fillPatternImage={grid} stroke="grey"></Rect>
                <Schema model={model} setModel={setModel} layerRef={groupRef} actionMenuOption={actionMenuOption} />
            </Layer>
        </Stage>
    )
}