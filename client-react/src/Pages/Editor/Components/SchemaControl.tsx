import React from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { DrgTranslationSaveTEMP } from '../../../drakon_schema/translator';
import { SchemaDTO } from '../../../services/ProjectService';

type Props = {
    schema : SchemaDTO | undefined
}


export const SchemaControl: React.FC<Props> = ({schema}) => {


    function handleSubmit() {
        if (schema) {
            DrgTranslationSaveTEMP(schema);
        } else {
            return <Modal show={true}>No schema selected</Modal>
        }
    }

    return (
        <Card>
            <Card.Header>Управление схемой</Card.Header>
            <Card.Body>
                <Button variant="primary btn-block" disabled={schema === undefined ? true : false} onClick={() => { handleSubmit(); }}>Скачать</Button>{' '}
                <Button variant="danger btn-block" disabled={schema === undefined ? true : false} onClick={() => { handleSubmit(); }}>Удалить</Button>{' '}
            </Card.Body>
        </Card>
    )
}