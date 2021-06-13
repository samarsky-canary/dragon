import React, { FC, useEffect, useRef, useState } from 'react';
import { Group, Line, Rect, Text } from 'react-konva';
import { Rect as _rect } from 'konva/lib/shapes/Rect';
import { Text as _text } from 'konva/lib/shapes/Text';
import {Layer as _layer} from 'konva/lib/Layer';
import { Group as _group } from 'konva/lib/Group';
import { Begin } from './Begin';
import { DragonInstruction, DragonModel, InstructionType } from '../../../dragon/dragon.model/dragon.model';
import { HEIGHT, WIDTH } from './CONSTRAINTS';
import { Action } from './Action';
import { Inserter } from './Inserter';
import { Comment } from './Comment';

export const Shape = {
    BEGIN: "begin",
    PRIMITIVE: "primitive",
    ACTION: "action",
    CONDITION: "condition",
    BRANCH: "branch",
    INPUT: "input",
    OUTPUT: "output",
    LOOP: "loop",
    SWITCH: 'switch',
    COMMENT: 'comment',
    SLEEP: 'sleep',
    END: 'end',
    INSERTER: 'inserter'
} as const

const StartPoint = {
    x: 100,
    y: 100
};

const HeightOffset = HEIGHT * 2;

type IconProps = {
    model: DragonModel,
    setModel: (value: DragonModel) => void,
    layerRef : React.RefObject<_layer>,
    actionMenuOption: number;
}

interface Node {
    id: string;
    previous: Node;
    parent: string;
    text: string;
    shape: string;
    x: number;
    y: number;
}

export const Schema: FC<IconProps> = ({model, setModel, layerRef, actionMenuOption}) => {
    if (!model) return null;
    // const konvaRefs = new Map<string, React.MutableRefObject<undefined>>();
    const groupRef = useRef<_group>(null)

    const INITIAL_STATE = parseModel(model);
    const [nodes, setNodes] = useState<Array<Node>>(INITIAL_STATE);

    useEffect(()=>{
        setNodes(parseModel(model));
    },[model])


    function parseInstruction(icon : DragonInstruction, temp_node : Array<Node>){
        const m = model!;
        const childrenPos = m.containers.get(icon.parent)?.children.findIndex((element) => (element.id === icon.id));
        const previous = childrenPos === 0 ? icon.parent : m.containers.get(icon.parent)?.children[childrenPos! - 1].id;

        switch(icon.type){
            case InstructionType.SCHEMA:
            break;

            case InstructionType.PRIMITIVE:
                temp_node.push(
                    {
                        id: icon.id,
                        previous: temp_node.find(value=>(value.id===icon.parent))!,
                        parent: icon.parent,
                        text: "Старт",
                        shape: Shape.BEGIN,
                        x: StartPoint.x,
                        y: StartPoint.y
                    }
                );
                break;

                case InstructionType.ACTION:
                {
                    const prev = temp_node.find((value)=>(value.id === previous))!;
                    temp_node.push(
                        {
                            id: "",
                            previous: prev,
                            parent: icon.parent,
                            text: icon.id,
                            shape: Shape.INSERTER,
                            x: prev.x + WIDTH/2,
                            y: prev.y + HEIGHT + HeightOffset/4,
                        }
                    );
                    temp_node.push(
                        {
                            id: icon.id,
                            previous: prev,
                            parent: icon.parent,
                            text: icon.text,
                            shape: Shape.ACTION,
                            x: prev.x,
                            y: prev.y + HeightOffset,
                        }
                    );
                }
                break;

                case InstructionType.OUTPUT:
                    {
                        const prev = temp_node.find((value)=>(value.id === previous))!;
                        temp_node.push(
                            {
                                id: "",
                                previous: prev,
                                parent: icon.parent,
                                text: icon.id,
                                shape: Shape.INSERTER,
                                x: prev.x + WIDTH/2,
                                y: prev.y + HEIGHT + HeightOffset/4,
                            }
                        );
                        temp_node.push(
                            {
                                id: icon.id,
                                previous: prev,
                                parent: icon.parent,
                                text: icon.text,
                                shape: Shape.OUTPUT,
                                x: prev.x,
                                y: prev.y + HeightOffset,
                            }
                        );
                    }
                    break;


                case InstructionType.COMMENT:
                    {
                        const prev = temp_node.find((value)=>(value.id === previous))!;
                        temp_node.push(
                            {
                                id: "",
                                previous: prev,
                                parent: icon.parent,
                                text: icon.id,
                                shape: Shape.INSERTER,
                                x: prev.x + WIDTH/2,
                                y: prev.y + HEIGHT + HeightOffset/4,
                            }
                        );
                        temp_node.push(
                            {
                                id: icon.id,
                                previous: prev,
                                parent: icon.parent,
                                text: icon.text,
                                shape: Shape.COMMENT,
                                x: prev.x,
                                y: prev.y + HeightOffset,
                            }
                        );
                    }
                    break;



                case InstructionType.CONDITION:
                    {
                        const prev = temp_node.find((value)=>(value.id === previous))!;
                        temp_node.push(
                            {
                                id: icon.id,
                                previous: prev,
                                parent: icon.parent,
                                text: icon.text,
                                shape: Shape.CONDITION,
                                x: prev.x,
                                y: prev.y + HeightOffset,
                            }
                        );
                    }
                    break;

            default:
                break;
        }
        icon.children.forEach((value)=>{
            parseInstruction(value, temp_node);
        })
        
    }



    function parseModel(model: DragonModel) {
        const temp_nodes: Array<Node> = [];
        parseInstruction(model.getInstruction(model.head), temp_nodes);
        const end = {
            id: 'end',
            previous: temp_nodes[temp_nodes.length -1],
            parent: '',
            text: "Конец",
            shape: Shape.END,
            x: temp_nodes[temp_nodes.length -1].x,
            y: temp_nodes[temp_nodes.length -1].y + HeightOffset
        }
        temp_nodes.push(end);
        temp_nodes.push(
            {
                id: "",
                previous: end.previous,
                parent: model.getInstruction(model.head).children[0].id,
                text: "",
                shape: Shape.INSERTER,
                x: end.x + WIDTH/2,
                y: end.y - HeightOffset/4,
            }
        );
        return temp_nodes;

    }      

    return (
        <Group ref={groupRef}>
            {
                nodes.map((value, key)=>{
                    switch (value.shape) {
                        case Shape.ACTION:
                        case Shape.OUTPUT:
                        case Shape.COMMENT:
                        case Shape.END:
                            return <Line 
                            stroke={'black'}
                            strokeWidth={1}
                            points={[value.x + WIDTH/2, value.y, value.previous.x+ WIDTH/2, value.previous.y + HEIGHT]}
                            />
                    }
                })
            }
            {
                nodes.map((value, key)=>{
                    switch (value.shape) {
                        case Shape.BEGIN:
                            return <Begin key={key} id={value.id} x={value.x} y={value.y} text={value.text} />
                        case Shape.END:
                            return <Begin key={key} id={value.id} x={value.x} y={value.y} text={value.text} />
                        case Shape.COMMENT:
                        case Shape.ACTION:
                        case Shape.OUTPUT:
                            return <Action type={value.shape} setModel={setModel}  model={model} key={key} id={value.id} parent={value.parent} x={value.x} y={value.y} text={value.text} actionMenuOption={actionMenuOption} />                            
                    
                        case Shape.INSERTER:
                            return <Inserter setModel={setModel}  model={model} key={key} id={value.id} x={value.x} y={value.y} parent={value.parent} next={value.text} actionMenuOption={actionMenuOption}></Inserter>
                    }
                })
            }
            
        </Group>
    );
}