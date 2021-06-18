import React, { FC, useEffect, useRef, useState } from 'react';
import { Group, Rect, Shape, Text } from 'react-konva';
import { Rect as _rect } from 'konva/lib/shapes/Rect';
import { Text as _text } from 'konva/lib/shapes/Text';
import { Group as _group } from 'konva/lib/Group';
import { HEIGHT, WIDTH } from './CONSTRAINTS';
import { DragonModel } from '../../../dragon/dragon.model/dragon.model';
import { Updatetext } from './Functions';
import { Shape as ShapeType } from './Schema';


type IconProps = {
    text: string,
    x: number,
    y: number,
    id: string,
    parent: string;
    model: DragonModel;
    actionMenuOption: number;
    setModel: (value: DragonModel) => void;
    type?: string;
}

export const Action: FC<IconProps> = ({ text, id, parent, x ,y, model, setModel, actionMenuOption, type}) => {
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

    function DeleteInstruction(){
        if( actionMenuOption === 9){
            const m = DragonModel.restoreFromJSON(model.toJSON());
            m.DeleteById(id);
            setModel(m);
        }
    }

    let element = <Rect/>

    switch (type) {
        case ShapeType.ACTION:
            element = <Rect ref={rectRef} 
            width={WIDTH} 
            height={HEIGHT}
            x={x} y={y}
            stroke={actionMenuOption === 9? "red" : 'black'} strokeWidth={actionMenuOption === 9? 4 : 2} fill="white" />
            break;

    
        case ShapeType.COMMENT:
            element = <Group>
                <Rect ref={rectRef} 
                width={WIDTH} 
                height={HEIGHT}
                x={x} y={y}
                stroke={actionMenuOption === 9? "red" : 'black'} strokeWidth={actionMenuOption === 9? 4 : 2} fill="white" />
                <Rect 
                width={WIDTH-10} 
                height={HEIGHT-10}
                cornerRadius={10}
                x={x+5} y={y+5}
                stroke="black" strokeWidth={1} fill="white" />
            </Group> 
            break;


            case ShapeType.OUTPUT:
                element = <Group>
                <Rect ref={rectRef} 
                width={WIDTH} 
                height={HEIGHT}
                x={x} y={y}
                />
                <Shape
                    sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineTo(x + WIDTH -30, y);
                    context.lineTo(x + WIDTH, y + HEIGHT/2);
                    context.lineTo(x + WIDTH-30, y + HEIGHT);
                    context.lineTo(x, y+HEIGHT);
                    context.closePath();
                    // (!) Konva specific method, it is very important
                    context.fillStrokeShape(shape);
                    }}
                    fill="white"
                    stroke={actionMenuOption === 9? "red" : 'black'}
                    strokeWidth={actionMenuOption === 9? 4 : 2}
                />
            </Group>
            break;

            case ShapeType.SLEEP:
                element = <Group>
                <Rect ref={rectRef} 
                width={WIDTH} 
                height={HEIGHT}
                x={x} y={y}
                />
                <Shape
                    sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineTo(x + WIDTH, y);
                    context.lineTo(x + WIDTH -30, y + HEIGHT);
                    context.lineTo(x + 30, y + HEIGHT);
                    context.closePath();
                    // (!) Konva specific method, it is very important
                    context.fillStrokeShape(shape);
                    }}
                    fill="white"
                    stroke={actionMenuOption === 9? "red" : 'black'}
                    strokeWidth={actionMenuOption === 9? 4 : 2}
                />
            </Group>
            break;

            case ShapeType.CONDITION:
                element = <Group>
                <Rect ref={rectRef} 
                width={WIDTH} 
                height={HEIGHT}
                x={x} y={y}
                />
                <Shape
                    sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(x, y + HEIGHT/2);
                    context.lineTo(x + WIDTH/4, y);
                    context.lineTo(x + WIDTH - WIDTH/4, y);
                    context.lineTo(x + WIDTH, y + HEIGHT/2);
                    context.lineTo(x + WIDTH - WIDTH/4, y + HEIGHT);
                    context.lineTo(x + WIDTH/4, y + HEIGHT);
                    context.closePath();
                    // (!) Konva specific method, it is very important
                    context.fillStrokeShape(shape);
                    }}
                    fill="white"
                    stroke={actionMenuOption === 9? "red" : 'black'}
                    strokeWidth={actionMenuOption === 9? 4 : 2}
                />
            </Group>
            break;

            
        default:
            break;
    }

    return (
        <Group 
        id={id} 
        draggable 
        ref={groupRef}
        onClick={(()=>(DeleteInstruction()))}
        >
            {element}
            <Text ref={textRef} 
                text={text}
                x={ x! + (rectRef.current ? rectRef.current.width() / 2 : 0)}
                y={y}
                offsetX={textWidth / 2}
                align="center"
                onDblClick={()=>(Updatetext(textRef.current!,id,model))}
                height={rectRef.current ? (rectRef.current.height()) : 0}
                verticalAlign='middle'
            />
        </Group>
    );
}