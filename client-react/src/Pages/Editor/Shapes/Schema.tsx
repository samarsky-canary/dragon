import React, { FC, useEffect, useRef, useState } from 'react';
import { Group, Line } from 'react-konva';
import { Rect as _rect } from 'konva/lib/shapes/Rect';
import { Text as _text } from 'konva/lib/shapes/Text';
import { Layer as _layer } from 'konva/lib/Layer';
import { Group as _group } from 'konva/lib/Group';
import { Begin } from './Begin';
import { DragonInstruction, DragonModel, InstructionType } from '../../../dragon/dragon.model/dragon.model';
import { HEIGHT, WIDTH } from './CONSTRAINTS';
import { Action } from './Action';
import { BranchDing, Inserter, Limiter } from './Inserter';

export const Shape = {
    BEGIN: "begin",
    PRIMITIVE: "primitive",
    ACTION: "action",
    CONDITION: "condition",
    BRANCH: "branch",
    LIMITER: 'limiter',
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
    x: 80,
    y: 40
};

const HeightOffset = HEIGHT * 2;
const WidthOffset = WIDTH / 2;

type IconProps = {
    model: DragonModel,
    setModel: (value: DragonModel) => void,
    layerRef: React.RefObject<_layer>,
    actionMenuOption: number;
}

interface Node {
    id: string;
    previous: Node | undefined;
    parent: string;
    text: string;
    shape: string;
    x: number;
    y: number;
    bOffsetX?: number;
    bOffsetY?: number;
}

export const Schema: FC<IconProps> = ({ model, setModel, layerRef, actionMenuOption }) => {
    if (!model) return null;
    // const konvaRefs = new Map<string, React.MutableRefObject<undefined>>();
    const groupRef = useRef<_group>(null)

    const INITIAL_STATE = parseModel(model);
    const [nodes, setNodes] = useState<Array<Node>>(INITIAL_STATE);

    useEffect(() => {
        setNodes(parseModel(model));
    }, [model])



    function genSelector(icon: DragonInstruction, prev: Node) {

        return {
            id: "",
            previous: prev,
            parent: icon.parent,
            text: icon.id,
            shape: Shape.INSERTER,
            x: prev.x + WIDTH / 2,
            y: prev.y + HEIGHT + HeightOffset / 4,
        };
    }

    function genSimpleInstruction(icon: DragonInstruction, prev: Node, shape: string) {
        return {
            id: icon.id,
            previous: prev,
            parent: icon.parent,
            text: icon.text,
            shape: shape,
            x: prev.x,
            y: prev.y + HeightOffset,
        }
    }


    function getPrevious(icon: DragonInstruction, parent: DragonInstruction | undefined) {
        if (!parent) return undefined;
        const positionInParent = parent.children.findIndex((element) => (element.id === icon.id));
        // If (first) => previous = parent, else if (not first in container) previous = > last in previous macro-icon
        const from = positionInParent === 0 ? icon.parent : parent?.children[positionInParent - 1].id;
        const previous = model.getInstruction(from);
        if (previous) {
            if (previous.type === InstructionType.CONDITION ||
                previous.type === InstructionType.LOOP ||
                previous.type === InstructionType.SWITCH) {
                const deep = model.getDeepestLeftChild(from);
                return deep;
            }
            return previous;
        }
        return undefined;
    }


    function parseInstruction(icon: DragonInstruction, temp_nodes: Array<Node>) {
        const parent = model.getInstruction(icon.parent);
        const from = getPrevious(icon, parent);
        const prev = temp_nodes.find((value) => (value.id === from?.id))!;
        console.log(icon.type)
        switch (icon.type) {
            case InstructionType.SCHEMA:
                break;

            case InstructionType.PRIMITIVE:
                temp_nodes.push(
                    {
                        id: icon.id,
                        previous: temp_nodes.find(value => (value.id === icon.parent))!,
                        parent: icon.parent,
                        text: icon!.text,
                        shape: Shape.BEGIN,
                        x: StartPoint.x,
                        y: StartPoint.y
                    }
                );
                break;

            case InstructionType.ACTION:
                temp_nodes.push(genSelector(icon, prev));
                temp_nodes.push(genSimpleInstruction(icon, prev, Shape.ACTION));
                break;

            case InstructionType.OUTPUT:
                temp_nodes.push(genSelector(icon, prev));
                temp_nodes.push(genSimpleInstruction(icon, prev, Shape.OUTPUT));
                break;

            case InstructionType.COMMENT:
                temp_nodes.push(genSelector(icon, prev));
                temp_nodes.push(genSimpleInstruction(icon, prev, Shape.COMMENT));
                break;

            case InstructionType.SLEEP:
                temp_nodes.push(genSelector(icon, prev));
                temp_nodes.push(genSimpleInstruction(icon, prev, Shape.SLEEP));
                break;

            case InstructionType.CONDITION:
                temp_nodes.push(genSelector(icon, prev));
                temp_nodes.push(genSimpleInstruction(icon, prev, Shape.CONDITION));
                break;

            case InstructionType.BRANCH:
                {
                    const parent_node = temp_nodes.find(value => value.id === parent?.id)!;
                    const branchOffset = parent?.children.findIndex(value => (value.id === icon.id));
                    const altbranchOffset = branchOffset === 0 ? 0 : WidthOffset;
                    const { x, y } = { x: parent_node.x + WIDTH * branchOffset! + altbranchOffset, y: parent_node.y };
                    temp_nodes.push(
                        {
                            id: icon.id,
                            previous: temp_nodes.find(value => value.id === icon.parent)!,
                            parent: icon.parent,
                            text: '',
                            shape: Shape.BRANCH,
                            x: x,
                            y: y,
                        }
                    );
                    temp_nodes.push(
                        {
                            id: "",
                            previous: undefined,
                            parent: icon.id,
                            text: icon.id,
                            shape: Shape.INSERTER,
                            x: x + WIDTH / 2,
                            y: y + HeightOffset / 16 + HEIGHT,
                        }
                    )
                }
                break;
            case InstructionType.LIMITER:
                {
                    const condition = model.getInstruction(icon.parent)!;
                    const left = model.getDeepestLeftChild(condition.children[0]!.id);
                    const right = model.getDeepestLeftChild(condition.children[1]!.id);
                    const left_node = temp_nodes.find(value => value.id === left!.id)!;
                    const right_node = temp_nodes.find(value => value.id === right!.id)!;
                    const { x, y } = { x: left_node.x, y: left_node.y }
                    temp_nodes.push(
                        {
                            id: icon.id,
                            previous: temp_nodes.find(value => value.id === right_node.id)!,
                            parent: icon.parent,
                            text: '',
                            shape: Shape.BRANCH,
                            x: x,
                            y: y + HeightOffset/2
                        }
                    );
                    temp_nodes.push(
                        {
                            id: icon.id,
                            previous: temp_nodes.find(value => value.id === left_node.id)!,
                            parent: icon.parent,
                            text: '',
                            shape: Shape.BRANCH,
                            x: x,
                            y: y + HeightOffset/2
                        }
                    );
                }
                break;
            default:
                break;
        }
        icon.children.forEach((value) => {
            parseInstruction(value, temp_nodes);
        })

    }



    function parseModel(model: DragonModel) {
        const temp_nodes: Array<Node> = [];
        parseInstruction(model.getInstruction(model.head)!, temp_nodes);
        console.log("SEPARATE")
        // ссылка не предыдущую от end выбирается неккоректно, если последняя икона - макро! Исправить на поиск последней в глубину
        const end = {
            id: 'end',
            previous: temp_nodes[temp_nodes.length - 1],
            parent: '',
            text: "Конец",
            shape: Shape.END,
            x: temp_nodes[temp_nodes.length - 1].x,
            y: temp_nodes[temp_nodes.length - 1].y + HeightOffset
        }
        temp_nodes.push(end);
        temp_nodes.push(
            {
                id: "",
                previous: end.previous,
                parent: model.getInstruction(model.head)!.children[0].id,
                text: "",
                shape: Shape.INSERTER,
                x: end.x + WIDTH / 2,
                y: end.y - HeightOffset / 4,
            }
        );
        return temp_nodes;

    }

    return (
        <Group ref={groupRef}>
            {
                nodes.map((value, key) => {
                    switch (value.shape) {
                        case Shape.ACTION:
                        case Shape.OUTPUT:
                        case Shape.COMMENT:
                        case Shape.END:
                        case Shape.LIMITER:
                        case Shape.SLEEP:
                        case Shape.CONDITION:
                            return <Line
                                stroke={'black'}
                                strokeWidth={1}
                                points={[value.x + WIDTH / 2, value.y, value.previous!.x + WIDTH / 2, value.previous!.y + HEIGHT / 2]}
                            />
                        case Shape.BRANCH:
                            {
                                const val: { x: number, y: number } = value;
                                const prev: { x: number, y: number } = value.previous!;
                                if (val.y <= prev.y) {
                                    return <Line
                                        stroke={'black'}
                                        strokeWidth={1}
                                        points={[value.x + WIDTH / 2, value.y + HEIGHT / 2, value.previous!.x + WIDTH / 2, value.previous!.y + HEIGHT / 2]}
                                    />
                                } else {
                                    return <Group>
                                        <Line
                                            stroke={'black'}
                                            strokeWidth={1}
                                            points={[val.x + WIDTH / 2, val.y + HEIGHT / 2, prev.x + WIDTH / 2, val.y + HEIGHT / 2]}
                                        />
                                        <Line
                                            stroke={'black'}
                                            strokeWidth={1}
                                            points={[prev.x + WIDTH / 2, val.y + HEIGHT / 2, prev.x + WIDTH / 2, prev.y + HEIGHT / 2]}
                                        />
                                    </Group>

                                }
                            }
                    }
                })
            }
            {
                nodes.map((value, key) => {
                    switch (value.shape) {
                        case Shape.BEGIN:
                            return <Begin model={model} key={key} id={value.id} x={value.x} y={value.y} text={value.text} />
                        case Shape.END:
                            return <Begin model={model} key={key} id={value.id} x={value.x} y={value.y} text={value.text} />
                        case Shape.COMMENT:
                        case Shape.ACTION:
                        case Shape.OUTPUT:
                        case Shape.SLEEP:
                        case Shape.CONDITION:
                            return <Action type={value.shape} setModel={setModel} model={model} key={key} id={value.id} parent={value.parent} x={value.x} y={value.y} text={value.text} actionMenuOption={actionMenuOption} />

                        case Shape.INSERTER:
                            return <Inserter setModel={setModel} model={model} key={key} id={value.id} x={value.x} y={value.y} parent={value.parent} next={value.text} actionMenuOption={actionMenuOption} />
                        case Shape.BRANCH:
                            return <BranchDing setModel={setModel} model={model} key={key} id={value.id} x={value.x} y={value.y} parent={value.parent} next={value.text} actionMenuOption={actionMenuOption} />
                        case Shape.LIMITER:
                            return <Limiter setModel={setModel} model={model} key={key} id={value.id} x={value.x} y={value.y} parent={value.parent} next={value.text} actionMenuOption={actionMenuOption} />
                    }
                })
            }

        </Group>
    );
}