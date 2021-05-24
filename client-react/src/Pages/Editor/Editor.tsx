import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { D3Sample } from '../../components/Sheet';
import { AuthStateService } from '../../services/AuthStateService';
import { SchemaDTO, SchemaService } from '../../services/ProjectService';
import { ActionMenu } from './ActionMenu/ActionMenu';
import { ProjectsSidebar } from './ProjectsSidebar/ProjectsSidebar';
import './Editor.scss'
import { DrgTranslationSave, DrgTranslationSaveTEMP } from '../../drakon_schema/translator';


const authService: AuthStateService = new AuthStateService().getInstance();
const schemaService: SchemaService = new SchemaService(authService).getInstance();

export const EditorPage: React.FC = () => {
    const [schema, setSchema] = useState<SchemaDTO>();


    function handleSubmit() {
        if (schema) {
            DrgTranslationSaveTEMP(schema);
        } else {
            return <Modal show={true}>No schema selected</Modal>
        }
    }

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Выберите схему
        </Tooltip>
    );

    useEffect(() => {
        document.title = schema === undefined ? "DRAKON IDE" : schema.name;
    }, [schema]);
    return (

        <Container fluid id="main-wrap">
            <Row>
                <Col xs={2}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <Card >
                            <Card.Header>Схемы пользователя:</Card.Header>
                            <Card.Body>
                                <ProjectsSidebar schemaService={schemaService} setSchema={setSchema} schema={schema} />
                            </Card.Body>
                        </Card>
                    </OverlayTrigger>
                    <Card>
                        <Card.Header>Управление схемой</Card.Header>
                        <Card.Body>
                            <Button variant="primary btn-block" disabled={schema === undefined? true: false} onClick={() => { handleSubmit(); }}>Скачать</Button>{' '}
                            <Button variant="danger btn-block"  disabled={schema === undefined? true: false} onClick={() => { handleSubmit(); }}>Удалить</Button>{' '}
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
                <Col xs={2}>
                    
                </Col>
            </Row>
        </Container>
    );
}