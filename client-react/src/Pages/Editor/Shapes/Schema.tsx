import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { Rect as _rect } from 'konva/lib/shapes/Rect';
import { Text as _text } from 'konva/lib/shapes/Text';
import { Group as _group } from 'konva/lib/Group';
import { Begin, Condition } from './Begin';
import { DragonModel } from '../../../dragon/dragon.model/dragon.model';


type IconProps = {
    model? : DragonModel
}


export const Schema: FC<IconProps> = ({model}) => {
    if (!model) return null;
    // const konvaRefs = new Map<string, React.MutableRefObject<undefined>>();
    const groupRef = useRef<_group>(null)



    return (
        <Group ref={groupRef}>
            {/* <Begin text={model.text} x={0} y={0} id={model.id+`0`}></Begin>
            <Begin text={"Конец"} x={0} y={0} id={model.id+`1`}></Begin>
            <Condition text={"if"} x={100} y={100} id={''}></Condition> */}
        </Group>
    );
}