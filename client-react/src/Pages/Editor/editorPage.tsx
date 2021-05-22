import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { D3Sample } from '../../components/Sheet';
import { ActionMenu } from './ActionMenu/ActionMenu';
import { ProjectsSidebar } from './ProjectsSidebar/ProjectsSidebar';


export const EditorPage: React.FC = () => {


    useEffect(() => {
        document.title = "DRAKON IDE"
    });
    return (

        <Container fluid>
            <Row>
                <Col xs={2}>
                    <ProjectsSidebar />
                </Col>
                <Col xs={1}>
                    <ActionMenu />
                </Col>
                <Col xs={7}>
                    <D3Sample />
                </Col>
            </Row>
        </Container>
    );
}