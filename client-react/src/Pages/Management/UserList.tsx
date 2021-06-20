import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Form, ListGroup } from 'react-bootstrap';
import { UserDTO } from '../../DTO/UserDTO';
import { UserService } from '../../services/UserService';
import './UserList.scss';
import Select from 'react-dropdown-select';
import { Typography } from '@material-ui/core';


type Props = {
    userService: UserService;
    selectedUser: UserDTO;
    selectUser: (value: UserDTO) => void;
}


export const UserList : React.FC<Props> = ({userService, selectedUser, selectUser}) => {
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [filter, setFilter] = useState<string>('');

    function filterUser(user: UserDTO) {
        return user.username.match(`^${filter}`);
    }


    useEffect(()=>{
        userService.GetAllUsers()
        .then(users => setUsers(users)) 
    },[])


    function setUser(values: UserDTO[]) {
        if (values.length){
            selectUser(values[0]);
        }
    }
    const noDataRenderer = ()=>{
        return (
            <Typography variant="h6">
                Пользователи не найдены
            </Typography>
        )
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
        placeholder={"Начните вводить имя пользователя"}
        noDataRenderer={noDataRenderer}
        values={[]}
        onChange={(value) => setUser(value)}
        />

        </Card.Body>
    </Card>
    )
}