import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RelationDTO } from '../../DTO/relationDTO';
import { UserDTO } from '../../DTO/UserDTO';
import { AuthStateService } from '../../services/AuthStateService';
import { CuratorService } from '../../services/CuratorService';
import { UserService } from '../../services/UserService';
import { UserCard } from './UserCard';
import { UserList } from './UserList';

interface Props {
    authService: AuthStateService
}

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%",
        marginTop: theme.spacing(2)
    },
}));

export const UserManagement: React.FC<Props> = ({ authService }) => {
    const classes = useStyles();
    const userService: UserService = new UserService(authService);
    const curatorService: CuratorService = new CuratorService(authService);

    const INITIAL_VALUE: UserDTO = {
        username: "",
        role: "",
        uuid: "",
        email: "",
    }
    const [selectedUser, selectUser] = useState<UserDTO>(INITIAL_VALUE);
    const [favorites, setFavorites] = useState<RelationDTO[]>([]);
    useEffect(() => {
        curatorService.getRelationsByCurator(authService.getUUID()).then(resolve => (setFavorites(resolve)))
    }, [selectedUser])


    return (
        <Container maxWidth="xs">
            <form className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h4" align="center">
                            Администрирование
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <UserList userService={userService} selectedUser={selectedUser} selectUser={selectUser}></UserList>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <UserCard setFavorites={setFavorites} favorites={favorites} userService={userService} curatorService={curatorService} selectedUser={selectedUser} ></UserCard>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}