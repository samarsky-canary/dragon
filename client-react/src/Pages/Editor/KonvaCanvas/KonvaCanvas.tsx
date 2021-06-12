import React, { useEffect, useRef, useState } from 'react';
import { Layer, Stage, Rect } from 'react-konva';
import {Layer as _layer} from 'konva/lib/Layer';
import useImage from 'use-image';
import { DragonModel, InstructionType } from '../../../dragon/dragon.model/dragon.model';
import { Schema } from '../Shapes/Schema';

type Props = {
    width: number;
    height: number;
    model?: DragonModel;
}

const WITDH = 160;
const HEIGHT = 40;
const VERTICAL_SPACING = 60;




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


type iconInterface = {
    id: string;
    x: number;
    y: number;
    parent_id: string;
    previous_id: string;
    text: string;
    type: string;
}


function generateShapes(model: DragonModel | undefined) {
    let y_offset = 0;
    const obj = new Map<string, iconInterface>();
    if (model) {
        model.containers.forEach((value, i) => {
            const childrenPos = model.containers.get(value.parent)?.children.findIndex((element) => (element.id === value.id));
            let previous = childrenPos === 0 ? value.parent : model.containers.get(value.parent)?.children[childrenPos! - 1].id;
            previous = previous ? previous : "";
            let x = 120 + value.offset * 6;
            let y = (y_offset = y_offset + VERTICAL_SPACING);


            switch (value.type) {
                case InstructionType.SCHEMA:
                    break;

                case InstructionType.ACTION:
                    x = x - 80;
                    y = y - 20;
                    break;
                default:
                    break;
            }
            obj.set(value.id, {
                id: i.toString(),
                x: x,
                y: y,
                parent_id: value.parent,
                previous_id: previous,
                text: value.text,
                type: value.type
            })

        });
    }
    return obj;
}


export const KonvaCanvas: React.FC<Props> = ({ width, height, model }) => {
    const [grid] = useImage("./grid.gif");

    const INITIAL_STATE = generateShapes(model);
    const [stars, setStars] = React.useState(INITIAL_STATE);


    useEffect(() => {
        setStars(generateShapes(model))
        console.log(model?.toJSON())
    }, [model])

    const groupRef = useRef<_layer>(null)

    return (
        <Stage width={width} height={700}>
            <Layer>
                <Rect width={width} height={height} fillPatternImage={grid} stroke="grey"></Rect>
            </Layer>
            <Layer ref={groupRef}>
                <Schema model={model} layerRef={groupRef}/>
            </Layer>
        </Stage>
    )
}