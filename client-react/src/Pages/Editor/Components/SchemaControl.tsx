import FileSaver from 'file-saver';
import React, {KeyboardEvent, KeyboardEventHandler, useState} from 'react';
import { Card, Button, Modal, Form, FormControl } from 'react-bootstrap';
import { DragonModel } from '../../../dragon/dragon.model/dragon.model';
import { SchemaDTO } from '../../../services/SchemaService';

type Props = {
    schema : SchemaDTO | undefined,
    model : DragonModel | undefined
}


export const SchemaControl: React.FC<Props> = ({schema, model}) => {
    const [translatedSchema, setTranslatedSchema] = useState<string>(""); 

    function handleSaveAsJavascript() {
        if (model && schema) {
            const blob = new Blob([model.toJavaScript()],{type: "application/javascript" });
            FileSaver.saveAs(blob, `${schema.name}.js`);
        } else {
            console.log('No schema selected')
        }
    }

    function handleTranslationToTextbox() {
        if (model) {
            setTranslatedSchema(model.toJavaScript());
        } else {
            console.log('No schema selected')
        }
    }

    return (
        <Card>
            <Card.Header>Содержимое иконы</Card.Header>
                <Form.Group>
                    <Form.Control as="textarea" rows={1} value={translatedSchema}/>
                </Form.Group>
            <Card.Header>Управление схемой</Card.Header>
            <Card.Body>
                <Form.Group>
                    <Form.Control
                            type="text"
                            value={schema?.name}
                            />
                </Form.Group>
                <Button variant="primary btn-block" disabled={schema === undefined ? true : false} onClick={() => { handleSaveAsJavascript(); }}>Скачать</Button>{' '}
                <Button variant="danger btn-block" disabled={schema === undefined ? true : false} onClick={() => { handleSaveAsJavascript(); }}>Удалить</Button>{' '}
                <Button variant="info btn-block" disabled={schema === undefined ? true : false} onClick={() => { handleTranslationToTextbox(); }}>В JavaScript...</Button>{' '}
            </Card.Body>
            <Form.Group>
                <Form.Label>Схема в Javascript</Form.Label>
                <Form.Control as="textarea" rows={20} value={translatedSchema}/>
            </Form.Group>
        </Card>
    )
}