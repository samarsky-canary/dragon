import FileSaver from 'file-saver';
import React, {KeyboardEvent, KeyboardEventHandler} from 'react';
import { Card, Button, Modal, Form, FormControl } from 'react-bootstrap';
import { DragonModel } from '../../../dragon/dragon.model/dragon.model';
import { SchemaDTO } from '../../../services/SchemaService';

type Props = {
    schema : SchemaDTO | undefined
}


export const SchemaControl: React.FC<Props> = ({schema}) => {


    function handleSubmit() {
        if (schema) {
            const op = DragonModel.restoreFromJSON(schema.data);
            const blob = new Blob([op.toJavaScript()],{type: "application/javascript" });
            FileSaver.saveAs(blob, `${schema.name}.js`);
        } else {
            return <Modal show={true}>No schema selected</Modal>
        }
    }

    return (
        <Card>
            <Card.Header>Управление схемой</Card.Header>
            <Card.Body>
                <Form.Group>
                    <Form.Control
                            type="text"
                            value={schema?.name}
                            />
                </Form.Group>
                <Button variant="primary btn-block" disabled={schema === undefined ? true : false} onClick={() => { handleSubmit(); }}>Скачать</Button>{' '}
                <Button variant="danger btn-block" disabled={schema === undefined ? true : false} onClick={() => { handleSubmit(); }}>Удалить</Button>{' '}
            </Card.Body>
        </Card>
    )
}