import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { D3Sample } from '../../components/Sheet';
import { AuthStateService } from '../../services/AuthStateService';
import { SchemaDTO, SchemaService } from '../../services/ProjectService';
import { ActionMenu } from './ActionMenu/ActionMenu';
import { ProjectsSidebar } from './ProjectsSidebar/ProjectsSidebar';
import './Editor.scss'
import { DrgTranslationSave, DrgTranslationSaveTEMP } from '../../drakon_schema/translator';


const authService : AuthStateService = new AuthStateService().getInstance();
const schemaService : SchemaService = new SchemaService(authService).getInstance();

export const EditorPage: React.FC = () => {
    const [schema, setSchema] = useState<SchemaDTO>();


    function handleSubmit() {
        if (schema) {
            DrgTranslationSaveTEMP(schema);
        } else {
            return <Modal  show={true}>No schema selected</Modal>
        }
    }

    useEffect(() => {
        document.title = schema === undefined ? "DRAKON IDE" : schema.name;
    },[schema]);
    return (

        <Container fluid id="main-wrap">
            <Row>
                <Col xs={2}>
                    <Card bg="dark" text="light">
                        <Card.Header>ДРАКОН-схемы:</Card.Header>
                        <Card.Body>
                            <ProjectsSidebar  schemaService={schemaService} setSchema={setSchema} schema={schema}/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={1}>
                    <ActionMenu />
                </Col>
                <Col xs={7}>
                    <D3Sample />
                </Col>
            </Row>
            <Row>
                <Button variant="btn btn-primary btn-block" onClick={() => { handleSubmit(); }}>Download</Button>{' '}
            </Row>
        </Container>
    );
}