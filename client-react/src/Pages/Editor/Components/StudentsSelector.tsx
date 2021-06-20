import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import Select from 'react-dropdown-select';
import { UserDTO } from '../../../DTO/UserDTO';
import { UserService } from '../../../services/UserService';
import { AuthStateService } from '../../../services/AuthStateService';
import { CuratorService } from '../../../services/CuratorService';


type Props = {
    selectUser: (value: UserDTO) => void;
}

const authService = new AuthStateService().getInstance();
const userService = new UserService(authService);
const curatorService = new CuratorService(authService);

export const StudentsSelector: React.FC<Props> = ({ selectUser }) => {
    const [users, setUsers] = useState<UserDTO[]>(FetchStudents());

    function FetchStudents() {
        const temp_users: UserDTO[] = [];
        curatorService.getRelationsByCurator(authService.getUUID())
            .then(relations => {
                relations.forEach(value => {
                    userService.getUserinfoById(value.uuid_user)
                        .then(user => {
                            temp_users.push(user);
                        });
                });
            });
        return temp_users;
    }


    useEffect(() => {
        setUsers(FetchStudents());
    }, [])


    function setUser(values: UserDTO[]) {
        if (values.length) {
            selectUser(values[0]);
        }
    }

    return (
        <Card >
            <Select
                options={users}
                multi={false}
                searchBy={'username'}
                labelField={"username"}
                valueField={"uuid"}
                placeholder={"Начните вводить имя"}
                values={[]}
                onChange={(value) => setUser(value)}
            />
        </Card>
    )
}