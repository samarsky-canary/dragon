import { Button, Card, Checkbox, Container, FormControlLabel, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { RelationDTO } from '../../DTO/relationDTO';
import { UserDTO } from '../../DTO/UserDTO';
import { AuthStateService } from '../../services/AuthStateService';
import { CuratorService } from '../../services/CuratorService';
import { UserService } from '../../services/UserService';

const authService: AuthStateService = new AuthStateService().getInstance();


type Props = {
    selectedUser: UserDTO;
    curatorService: CuratorService;
    userService: UserService;
    favorites: RelationDTO[];
    setFavorites: (value: RelationDTO[]) => void
}

export const UserCard: React.FC<Props> = ({ selectedUser, favorites, curatorService, userService, setFavorites }) => {
    const [favorite, setFavorite] = useState<boolean>(false);
    const [relationName, setRelationName] = useState<string>('');
    const [role, setRole] = useState<string>('USER');

    useEffect(() => {
        const relation = favorites.find((value) => (value.uuid_user === selectedUser.uuid));
        setFavorite(relation !== undefined);
        setRelationName(relation ? relation.relation_name : '');
        setRole(selectedUser.role);
    }, [selectedUser])


    function favoriteCheck(e: any) {
        const relation = favorites.find((value) => (value.uuid_user === selectedUser.uuid));
        if (relation === undefined) {
            curatorService.createRelation({
                uuid_user: selectedUser.uuid,
                uuid_curator: authService.getUUID(),
                relation_name: ''
            });
        } else {
            curatorService.DeleteRelation(relation.id);
        }
        setFavorite(!favorite);
        curatorService.getRelationsByCurator(authService.getUUID()).then(resolve => (setFavorites(resolve)))
    }

    useEffect(() => {
        const relation = favorites.find((value) => (value.uuid_user === selectedUser.uuid));
        if (relation) {
            relation.relation_name = relationName;
            curatorService.updateRelation(relation);
        }
    }, [relationName])

    function changeRelationName(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRole(event.target.value as string);
    };

    const SetRoleButtonHandle = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (selectedUser.role !== "ADMIN") {
            selectedUser.role = role;
            userService.UpdateUserRole(selectedUser);
        }
    };

    const DeleteUserButtonHandle = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (selectedUser.role !== "ADMIN") {
            const auth = new AuthStateService().getInstance();
            auth.DeleteRegistrationData(selectedUser.uuid);
        }
    };

    return (
        <Container >
            <Grid>
                <Card>
                    <Typography>{selectedUser.username}</Typography>
                    <Typography>{selectedUser.role}</Typography>
                    <FormControlLabel
                        disabled={selectedUser.role !== "USER"}
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={favorite} onChange={(e) => (favoriteCheck(e))} />}
                        label="Курируемый"
                        value={favorite}
                    />
                    <TextField
                        disabled={!favorite}
                        label="Название отношения"
                        variant="outlined"
                        value={relationName}
                        onChange={e => (setRelationName(e.target.value))}
                    />
                    <Select
                        hidden={authService.getRole() !== 'ADMIN'}
                        value={role}
                        onChange={handleChange}
                    >
                        <MenuItem value={"USER"}>Пользователь</MenuItem>
                        <MenuItem value={"CURATOR"}>Куратор</MenuItem>
                        <MenuItem value={"ADMIN"}>Админ</MenuItem>
                    </Select>
                    <Button 
                        hidden={authService.getRole() !== 'ADMIN'}                    
                    variant="outlined" color="secondary" onClick={SetRoleButtonHandle} >
                        Установить роль
                    </Button>
                    <Button 
                        hidden={authService.getRole() !== 'ADMIN'}
                    variant="outlined" color="secondary" onClick={DeleteUserButtonHandle} >
                        Удалить пользователя
                    </Button>
                </Card>
            </Grid>
        </Container>
    )
}