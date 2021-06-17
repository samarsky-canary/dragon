import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Form, ListGroup } from 'react-bootstrap';
import Select from 'react-dropdown-select';
import { UserDTO } from '../../../DTO/UserDTO';
import { UserService } from '../../../services/UserService';
import { SchemaService } from '../../../services/SchemaService';
import { AuthStateService } from '../../../services/AuthStateService';
import { CuratorService } from '../../../services/CuratorService';


type Props = {
    selectUser: (value: UserDTO) => void;
}

const authService = new AuthStateService().getInstance();
const userService = new UserService(authService);
const curatorService = new CuratorService(authService);

export const StudentsSelector: React.FC<Props> = ({selectUser}) => {
    const [users, setUsers] = useState<UserDTO[]>([]);


    useEffect(() => {
        const temp_users: UserDTO[] = [];
        curatorService.getRelationsByCurator(authService.getUUID())
            .then(relations => {
                relations.forEach(value => {
                    userService.getUserinfoById(value.uuid_user)
                        .then(user => {
                            temp_users.push(user);
                        })
                })
            });
        setUsers(temp_users);
    }, [])


    function setUser(values: UserDTO[]) {
        if (values.length) {
            selectUser(values[0]);
        }
    }

    return (
        <Card >
            <Card.Body>
                <Select
                    options={users}
                    multi={false}
                    searchBy={'username'}
                    labelField={"username"}
                    valueField={"uuid"}
                    values={users}
                    onChange={(value) => setUser(value)}
                />

            </Card.Body>
        </Card>
    )
}