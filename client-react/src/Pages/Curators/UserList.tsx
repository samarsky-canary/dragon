import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Form, ListGroup } from 'react-bootstrap';
import { UserDTO } from '../../DTO/UserDTO';
import { UserService } from '../../services/UserService';
import './UserList.scss';

type Props = {
    userService: UserService;
    selectedUser: string;
    selectUser: (value: string) => void;
}


export const UserList : React.FC<Props> = ({userService, selectedUser, selectUser}) => {
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [filter, setFilter] = useState<string>('');

    function filterUser(user: UserDTO) {
        return user.username.match(`^${filter}`);
    }


    useEffect(()=>{
        userService.GetUnprevilegedUsers()
        .then(users => setUsers(users)) 
    },[])

    return (
        <Card >
        <Card.Header>Список пользователей:</Card.Header>
        <Card.Body>
            <Form.Group>
                <Form.Control
                    type="text"
                    value={filter}
                    placeholder="Начните вводить имя"
                    onChange={(e) => (setFilter(e.target.value))}
                />
            </Form.Group>
            <ListGroup className="user-list">
            {
                users.filter(filterUser).map((user, key) => 
                (<ListGroup.Item
                    key={key}
                    action variant={user.uuid === selectedUser ? `info` : ''}
                    onClick={()=>(selectUser(user.uuid))}
                    >{user.username}</ListGroup.Item>))
            }
        </ListGroup>
        </Card.Body>
    </Card>
    )
}