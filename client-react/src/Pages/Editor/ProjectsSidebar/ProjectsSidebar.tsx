import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import './ProjectsSidebar.scss'


export const ProjectsSidebar = () => {


    return (
        <div>
            <Container fluid>
                <ListGroup>
                    <ListGroup.Item as={Button}>Press me</ListGroup.Item>
                    <ListGroup.Item as={Button}>Press me2</ListGroup.Item>
                    <ListGroup.Item as={Button}>Press me3</ListGroup.Item>
                </ListGroup>
            </Container>
        </div>
    )
}