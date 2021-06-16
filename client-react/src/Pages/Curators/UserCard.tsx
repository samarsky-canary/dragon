import { Card, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserDTO } from '../../DTO/UserDTO';
import { UserService } from '../../services/UserService';



type Props = {
    selectedUser: UserDTO;
    userService: UserService;
}

export const UserCard : React.FC<Props> = ({selectedUser, userService}) =>{

    return (
        <Container >
            <Grid>
                <Card>
                    <Typography>{selectedUser.username}</Typography>
                    <Typography>{selectedUser.role}</Typography>
                </Card>
            </Grid>
        </Container>
    )
}