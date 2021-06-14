import React from 'react';
import { useState } from 'react';
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import { AuthStateService } from '../../services/AuthStateService';
import { SchemaService } from '../../services/SchemaService';
import { UserService } from '../../services/UserService';
import { UserList } from './UserList';


const authService: AuthStateService = new AuthStateService().getInstance();
const schemaService: SchemaService = new SchemaService(authService).getInstance();
const userService: UserService = new UserService(authService);

export const Curators: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const [selectedUser, SelectUser] = useState<string>('');
    return (
        <Container fluid id="main-wrap">
            <Row>
                <Col xs={2}>
                    <Card >
                        <Card.Header>Список пользователей:</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    value={filter}
                                    placeholder="Начните вводить имя"
                                    onChange={(e) => (setFilter(e.target.value))}
                                />
                            </Form.Group>
                            <UserList filter={filter} userService={userService} selectedUser={selectedUser} selectUser={SelectUser} ></UserList>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8}>

                </Col>
            </Row>
        </Container>
    );
}