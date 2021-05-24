import React from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoutButton } from './LogoutButton';



export const NavigationHeader: React.FC = () => {

    return (
        <Navbar fixed="bottom" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">DRAKON IDE</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Редактор</Nav.Link>
                    <Nav.Link as={Link} to="/curators">Курирование</Nav.Link>
                    <Nav.Link as={Link} to="/docs">Документация</Nav.Link>
                    <Nav.Link as={Link} to="/about">О программе</Nav.Link>
                </Nav>
                <Form inline>
                    <LogoutButton />
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}