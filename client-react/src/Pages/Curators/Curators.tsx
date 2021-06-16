import { Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Card, Col, Row, Form } from 'react-bootstrap';
import { UserDTO } from '../../DTO/UserDTO';
import { AuthStateService } from '../../services/AuthStateService';
import { SchemaService } from '../../services/SchemaService';
import { UserService } from '../../services/UserService';
import { AccountControl } from './AccountControl';
import { UserCard } from './UserCard';
import { UserList } from './UserList';


const authService: AuthStateService = new AuthStateService().getInstance();
const schemaService: SchemaService = new SchemaService(authService).getInstance();
const userService: UserService = new UserService(authService);

export const Curators: React.FC = () => {
    const INITIAL_VALUE: UserDTO={
        username: "",
        role : "",
        uuid: "",
    }
    const [selectedUser, selectUser] = useState<UserDTO>(INITIAL_VALUE);

    useEffect(() => {
        document.title = "Управление студентами"
    },[]);
    
    return (
        <Container >
            <Row>
                <Container>
                    <Typography align="center" variant="h4">Управление учётной записью</Typography>
                </Container>
            </Row>
            <Row>
                <AccountControl authService={authService}></AccountControl>
            </Row>
            <Row hidden={authService.getRole() === "USER"}>
                <Col xs={2}>
                    <UserList userService={userService} selectedUser={selectedUser} selectUser={selectUser}></UserList>
                </Col>
                <Col xs={8}>
                    <UserCard userService={userService} selectedUser={selectedUser} ></UserCard>
                </Col>
            </Row>
        </Container>
    );
}