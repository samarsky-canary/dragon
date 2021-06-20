import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { UserContext } from '../../../context/user.provider';
import { AuthStateService } from '../../../services/AuthStateService';
import { SchemaService, SchemaDTO } from '../../../services/SchemaService';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { UserDTO } from '../../../DTO/UserDTO';

type Props = {
    schemaService: SchemaService,
    setSchema: (value: SchemaDTO) => void;
    schema: SchemaDTO | undefined;
    student: UserDTO | undefined;
}

export const ProjectTreeCurator: FC<Props> = ({ schemaService, setSchema, schema, student}) => {
    const [schemas, setSchemas] = useState<SchemaDTO[]>([]);



    useEffect(() => {
        if (student)
        schemaService.getUserSchemas(student.uuid)
            .then(schemas => setSchemas(schemas))
            .catch(_err => console.log(_err))
    }, [schema, student]);

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
        </ListGroup>
    )
}