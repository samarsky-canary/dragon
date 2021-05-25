import React, { FC, useContext, useEffect, useState } from 'react';
import {Button, ListGroup } from 'react-bootstrap';
import { UserContext } from '../../../context/user.provider';
import { SchemaService, SchemaDTO } from '../../../services/ProjectService';
import './ProjectsSidebar.scss'

type Props = {
    schemaService: SchemaService,
    setSchema: (value: SchemaDTO) => void;
    schema : SchemaDTO | undefined;
}

export const ProjectsSidebar: FC<Props> = ({ schemaService, setSchema, schema }) => {
    const { state } = useContext(UserContext);
    const [schemas, setSchemas] = useState<SchemaDTO[]>([]);


    useEffect(() => {
        if (state.uuid) {
            schemaService.getUserSchemas(state.uuid)
                .then(schemas => setSchemas(schemas))
                .catch(_err => setSchemas([]))
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
            <ListGroup.Item as={Button} variant="warning">Создать схему</ListGroup.Item>
        </ListGroup>
    )
}