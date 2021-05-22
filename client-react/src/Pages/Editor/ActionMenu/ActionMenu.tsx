import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';


export const ActionMenu : React.FC = () => {


    return (
        <Container fluid>
            <ListGroup>
                <ListGroup.Item as={Button}>Press me</ListGroup.Item>
                <ListGroup.Item as={Button}>Press me2</ListGroup.Item>
                <ListGroup.Item as={Button}>Press me3</ListGroup.Item>
            </ListGroup>
        </Container>
    )
}