import React, { FC, useEffect, useRef, useState } from 'react';
import { Circle } from 'react-konva';
import { Circle as _circle } from 'konva/lib/shapes/Circle';
import { DragonActionInstruction, DragonCommentInstruction, DragonModel, DragonOutputInstruction } from '../../../dragon/dragon.model/dragon.model';
const WIDTH = 15;
const HEIGHT = 15;

type IconProps = {
    x: number;
    y: number;
    id: string;
    parent: string;
    next: string;
    actionMenuOption: number;
    model: DragonModel;
    setModel: (value: DragonModel) => void;
}


const Insert={
    action: 1,
    comment: 2,
    output: 4
}


export const Inserter: FC<IconProps> = (props) => {
    const [active, setActive] = useState<boolean>(false);
    const circleRef = useRef<_circle>(null);


    useEffect(()=>{
    setActive(props.actionMenuOption !== 0 && props.actionMenuOption !== 9)
    },[props.actionMenuOption])

    function InsertInstruction(){
        const m = DragonModel.restoreFromJSON(props.model.toJSON());
        switch(props.actionMenuOption){
            case Insert.action:
            {
                const action = new DragonActionInstruction(props.parent);
                action.text = "action text";
                m.Insert(action, props.next);
                props.setModel(m);
            }
            break;
            case Insert.comment:
            {
                const comment = new DragonCommentInstruction(props.parent);
                comment.text = "comment text";
                m.Insert(comment, props.next);
                props.setModel(m);
            }
            break;
            case Insert.output:
            {
                const comment = new DragonOutputInstruction(props.parent);
                comment.text = "output text";
                m.Insert(comment, props.next);
                props.setModel(m);
            }
            break;
        }

    }

    return (
            <Circle ref={circleRef} 
            draggable={true}
            visible = {active}
            width={WIDTH}
            onClick={()=>(InsertInstruction())}
            height={HEIGHT}
            x={props.x} y={props.y}
            stroke="black" strokeWidth={1} fill="lightgreen" />
    );
}