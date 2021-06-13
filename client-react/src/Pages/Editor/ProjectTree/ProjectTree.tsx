import React, { FC, useContext, useEffect, useState } from 'react';
import {Button, ListGroup } from 'react-bootstrap';
import { UserContext } from '../../../context/user.provider';
import { AuthStateService } from '../../../services/AuthStateService';
import { SchemaService, SchemaDTO } from '../../../services/SchemaService';

type Props = {
    schemaService: SchemaService,
    setSchema: (value: SchemaDTO) => void;
    schema : SchemaDTO | undefined;
}

export const ProjectTree: FC<Props> = ({ schemaService, setSchema, schema }) => {
    const { state } = useContext(UserContext);
    const [schemas, setSchemas] = useState<SchemaDTO[]>([]);


    const CreateSchema = async ()=> {
        const generatedSchema = await schemaService.createNewSchema(state.uuid!);
        if (generatedSchema) {
                setSchema(generatedSchema);
        }
    }

    useEffect(() => {
        if (state)
        if (state.uuid) {
            schemaService.getUserSchemas(state.uuid)
                .then(schemas => setSchemas(schemas))
                .catch(_err => console.log(_err))
        }
    }, [schema]);

    return (
        <ListGroup>
            {schemas.map((scheme) => (
                <ListGroup.Item
                    key={scheme.uuid}
                    action variant={scheme.uuid === schema?.uuid ? `info` : ''}
                    onClick={() => setSchema(scheme)}>
                    {scheme.name}
                </ListGroup.Item>
            ))}
            <ListGroup.Item onClick={()=> CreateSchema()} as={Button} variant="warning">Создать схему</ListGroup.Item>
        </ListGroup>
    )
}