import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { UserDTO } from '../../DTO/UserDTO';
import { UserService } from '../../services/UserService';
import './UserList.scss';

type Props = {
    filter: string;
    userService: UserService;
    selectedUser: string;
    selectUser: (value: string) => void;
}


export const UserList : React.FC<Props> = ({filter, userService, selectedUser, selectUser}) => {
    const [users, setUsers] = useState<UserDTO[]>([]);

    function filterUser(user: UserDTO) {
        return user.username.match(`^${filter}`);
    }


    useEffect(()=>{
        userService.GetUnprevilegedUsers()
        .then(users => setUsers(users)) 
    },[])

    return (
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
    )
}