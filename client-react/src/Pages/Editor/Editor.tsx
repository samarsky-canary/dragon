import React, { useEffect, useState } from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { AuthStateService } from '../../services/AuthStateService';
import { SchemaDTO, SchemaService } from '../../services/SchemaService';
import { ActionMenu } from './ActionMenu/ActionMenu';
import { ProjectsSidebar } from './ProjectsSidebar/ProjectsSidebar';
import './Editor.scss'
import { KonvaCanvas } from './KonvaCanvas/KonvaCanvas';
import ContainerDimensions from 'react-container-dimensions';
import { IconFieldsEditor } from './Components/IconFieldsEditor';
import { SchemaControl } from './Components/SchemaControl';
import { DragonModel } from '../../dragon/dragon.model/dragon.model';


const authService: AuthStateService = new AuthStateService().getInstance();
const schemaService: SchemaService = new SchemaService(authService).getInstance();

export const EditorPage: React.FC = () => {
    const [schema, setSchema] = useState<SchemaDTO>();
    const [model, setModel] = useState<DragonModel>();

    useEffect(()=>{
        if (schema) {
            setModel(DragonModel.restoreFromJSON(schema?.data));
        }

    },[schema])

    /* eslint-disable  @typescript-eslint/no-explicit-any */
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
                            <Card.Header>Схемы пользователя: {authService.getUsername()}</Card.Header>
                            <Card.Body>
                                <ProjectsSidebar schemaService={schemaService} setSchema={setSchema} schema={schema} />
                            </Card.Body>
                        </Card>
                    </OverlayTrigger>
                </Col>
                <Col xs={1}>
                    <ActionMenu />
                </Col>
                <Col xs={7}>
                    <ContainerDimensions>
                        {({ height, width }) => <KonvaCanvas height={height} width={width} model={model}/>}
                    </ContainerDimensions>
                </Col>
                <Col xs={2}>
                    <SchemaControl schema={schema} model={model}/>
                </Col>
            </Row>
        </Container>
    );
}