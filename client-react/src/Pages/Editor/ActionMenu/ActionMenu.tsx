import React from 'react';
import { Button, Image, Card, Row } from 'react-bootstrap';
import action from '../../../images/action.png'
import comment from '../../../images/comment.png'
import input from '../../../images/input.png'
import loop from '../../../images/loop.png'
import output from '../../../images/output.png'
import pause from '../../../images/pause.png'
import question from '../../../images/question.png'
import variant from '../../../images/variant.png'
import './ActionMenu.scss'

type Props ={
    setActionMenuOption: (value: number) => void;
}

const ActionMenuOptions = {
    ACTION: 1,
    COMMENT: 2,    
    INPUT: 3,
    OUTPUT: 4,
    QUESTION: 5,
    LOOP: 6,
    VARIANT: 7,
    PAUSE: 8,
    DELETE: 9,
    RESET: 0,
}


export const ActionMenu: React.FC<Props> = (props) => {

    //const images: any = {action, comment, input, loop, output, pause, question, variant};


    return (
        <Card>
            <Card.Header>Иконы</Card.Header>
            <Card.Body>
                <Row>
                    <Button className="img-button">
                        <Image rounded src={action} fluid onClick={()=>{props.setActionMenuOption(ActionMenuOptions.ACTION)}}/>
                    </Button>
                    <Button className="img-button">
                        <Image rounded src={comment} onClick={()=>{props.setActionMenuOption(ActionMenuOptions.COMMENT)}} fluid />
                    </Button>
                </Row>
                <Row>
                    <Button className="img-button">
                        <Image rounded src={input} fluid onClick={()=>{props.setActionMenuOption(ActionMenuOptions.INPUT)}}/>
                    </Button>
                    <Button className="img-button">
                        <Image rounded src={output} fluid onClick={()=>{props.setActionMenuOption(ActionMenuOptions.OUTPUT)}}/>
                    </Button>
                </Row>
                <Row>
                    <Button className="img-button">
                        <Image rounded src={question} fluid onClick={()=>{props.setActionMenuOption(ActionMenuOptions.QUESTION)}}/>
                    </Button>
                    <Button className="img-button">
                        <Image rounded src={loop} fluid onClick={()=>{props.setActionMenuOption(ActionMenuOptions.LOOP)}}/>
                    </Button>
                </Row>
                <Row>
                    <Button className="img-button">
                        <Image rounded src={variant} fluid onClick={()=>{props.setActionMenuOption(ActionMenuOptions.VARIANT)}}/>
                    </Button>
                    <Button className="img-button">
                        <Image rounded src={pause} fluid onClick={()=>{props.setActionMenuOption(ActionMenuOptions.PAUSE)}}/>
                    </Button>
                </Row>
                <Row>
                    <Button className="img-button" variant={'danger'} onClick={()=>{props.setActionMenuOption(ActionMenuOptions.DELETE)}}>
                        X
                    </Button>
                    <Button className="img-button info" variant={'warning'} onClick={()=>{props.setActionMenuOption(ActionMenuOptions.RESET)}}>
                        R
                    </Button>
                </Row>
            </Card.Body>
        </Card>
    )
}