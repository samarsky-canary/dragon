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


export const ActionMenu: React.FC = () => {


    return (
        <Card>
            <Card.Header>Иконы</Card.Header>
            <Card.Body>
                <Row>
                    <Button className="img-button">
                        <Image rounded src={action} fluid />
                    </Button>
                    <Button className="img-button">
                        <Image rounded src={comment} fluid />
                    </Button>
                </Row>
                <Row>
                    <Button className="img-button">
                        <Image rounded src={input} fluid />
                    </Button>
                    <Button className="img-button">
                        <Image rounded src={output} fluid />
                    </Button>
                </Row>
                <Row>
                    <Button className="img-button">
                        <Image rounded src={question} fluid />
                    </Button>
                    <Button className="img-button">
                        <Image rounded src={loop} fluid />
                    </Button>
                </Row>
                <Row>
                    <Button className="img-button">
                        <Image rounded src={variant} fluid />
                    </Button>
                    <Button className="img-button">
                        <Image rounded src={pause} fluid />
                    </Button>
                </Row>
            </Card.Body>
        </Card>
    )
}