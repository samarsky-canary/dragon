import React, { useEffect } from 'react';
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
    const [selectedUser, selectUser] = useState<string>('');

    useEffect(() => {
        document.title = "Управление студентами"
    },[]);
    
    return (
        <Container fluid id="main-wrap">
            <Row>
                <Col xs={2}>
                    <UserList userService={userService} selectedUser={selectedUser} selectUser={selectUser}></UserList>
                </Col>
                <Col xs={8}>

                </Col>
            </Row>
        </Container>
    );
}