import React, { FC, useEffect, useRef, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { Rect as _rect } from 'konva/lib/shapes/Rect';
import { Text as _text } from 'konva/lib/shapes/Text';
import { Group as _group } from 'konva/lib/Group';
import { HEIGHT, WIDTH } from './CONSTRAINTS';
import { DragonModel } from '../../../dragon/dragon.model/dragon.model';


type IconProps = {
    text: string,
    x: number,
    y: number,
    id: string,
    parent: string;
    model: DragonModel;
    actionMenuOption: number;
    setModel: (value: DragonModel) => void;
}

export const Action: FC<IconProps> = ({ text, id, parent, x ,y, model, setModel, actionMenuOption}) => {
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


    function InsertInstruction(){
        if( actionMenuOption === 9){
            const m = DragonModel.restoreFromJSON(model.toJSON());
            m.Delete(parent,id);
            setModel(m);
        }
}



    return (
        <Group 
        id={id} 
        draggable 
        ref={groupRef}
        onClick={(()=>(InsertInstruction()))}
        >
            <Rect ref={rectRef} 
            width={WIDTH} 
            height={HEIGHT}
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