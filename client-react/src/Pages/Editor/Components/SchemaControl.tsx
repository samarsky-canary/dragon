import FileSaver from 'file-saver';
import React, {KeyboardEvent, KeyboardEventHandler, useEffect, useState} from 'react';
import { Card, Button, Modal, Form, FormControl } from 'react-bootstrap';
import { updateTaggedTemplate } from 'typescript';
import { DragonModel } from '../../../dragon/dragon.model/dragon.model';
import { SchemaDTO, SchemaService } from '../../../services/SchemaService';
import Delete from '@material-ui/icons/Delete';
import CodeIcon from '@material-ui/icons/Code';
import GetAppIcon from '@material-ui/icons/GetApp';
import SaveIcon from '@material-ui/icons/Save';
import { UserService } from '../../../services/UserService';

type Props = {
    schema : SchemaDTO | undefined,
    model : DragonModel | undefined,
    setSchema: (value: SchemaDTO | undefined) => void,
    schemaService: SchemaService
    userService: UserService
}


export const SchemaControl: React.FC<Props> = ({schema, setSchema, model, schemaService, userService}) => {
    const [translatedSchema, setTranslatedSchema] = useState<string>(""); 
    const [schemaName, setSchemaName] = useState<string>(schema? schema.name : '');
    const [username, setUsername] = useState<string>('');

    function handleSaveAsJavascript() {
        if (model && schema) {
            const blob = new Blob([model.toJavaScript()],{type: "application/javascript" });
            FileSaver.saveAs(blob, `${schema.name}.js`);
        } else {
            console.log('No schema selected')
        }
    }
    useEffect(()=>{
        if(schema) {
            setSchemaName(schema.name)
            if (schema.last_changed_by_id)
                userService.getUserinfoById(schema.last_changed_by_id).then(user=> setUsername(user.username))
        }
    },[schema])

    useEffect(()=>{
        if(schema) {
            schema.name = schemaName;
            schemaService.updateSchema(schema);
        }
    },[schemaName])

    function handleTranslationToTextbox() {
        if (model) {
            setTranslatedSchema(model.toJavaScript());
        } else {
            console.log('No schema selected')
        }
    }

    function DeleteSelectedSchema() {
        if (schema) {
            schemaService.deleteSchema(schema.uuid);
            setSchema(undefined);
        }
    }

    function UpdateSchema(){
        if (schema && model) {
            const updated = schema;
            updated.data = model.toJSON();
            schemaService.updateSchema(updated).then(response=>{
                setSchema(response);
            })
        }
    }


    return (
        <Card>
            <div hidden ={schema === undefined}>
            <Card.Header>Время изменения: {schema?.last_changed?  schema?.last_changed.replace('T', " ") : " "}</Card.Header>
            <Card.Header>Последнее изменение: {schema ? username : ""}</Card.Header>
            </div>
            <Card.Body>
                <Form.Group>
                    <Form.Control
                            type="text"
                            value={schemaName}
                            onChange={(e)=>(setSchemaName(e.target.value))}
                            />
                </Form.Group>
                <Button variant="primary btn-block" disabled={schema === undefined ? true : false} onClick={() => (UpdateSchema())}><SaveIcon/>Сохранить изменения</Button>{' '}
                <Button variant="info btn-block" disabled={schema === undefined ? true : false} onClick={() => { handleTranslationToTextbox(); }}><CodeIcon/>В JavaScript...</Button>{' '}
                <Button variant="primary btn-block" disabled={schema === undefined ? true : false} onClick={() => { handleSaveAsJavascript(); }}><GetAppIcon/>Скачать код</Button>{' '}
            </Card.Body>
            <Form.Group>
                <Form.Label>Схема в Javascript</Form.Label>
                <Form.Control as="textarea" rows={20} readOnly={true} value={translatedSchema}/>
                <Button variant="danger btn-block" disabled={schema === undefined ? true : false} onClick={() => (DeleteSelectedSchema())}><Delete/>Удалить схему</Button>{' '}
            </Form.Group>
        </Card>
    )
}