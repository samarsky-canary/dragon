import FileSaver from 'file-saver';
import React, {KeyboardEvent, KeyboardEventHandler, useEffect, useState} from 'react';
import { Card, Button, Modal, Form, FormControl } from 'react-bootstrap';
import { DragonModel } from '../../../dragon/dragon.model/dragon.model';
import { SchemaDTO } from '../../../services/SchemaService';

type Props = {
    schema : SchemaDTO | undefined,
    setTextToManager: (value: string) => void,
    textFromView: string;
}


export const IconManager: React.FC<Props> = ({schema}) => {
    const [iconText, setIconText] = useState<string>(""); 

    useEffect(()=>{
        setIconText("")
    },[schema]);
    return (
        <Card>
            <Card.Header>Управление иконой</Card.Header>
            <Card.Body>
                <Form.Group>
                    <Form.Control
                            type="text"
                            value={schema?.name}
                            />
                </Form.Group>
            </Card.Body>
        </Card>
    )
}