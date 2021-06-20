import { Button, Checkbox, FormControlLabel, Grid, MenuItem, Select, TextField } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ConfirmDialog } from '../../components/ConfirmDialog';
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
    const [dialog, openDialog] = useState<boolean>(false);


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


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRole(event.target.value as string);
    };

    const SetRoleButtonHandle = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (selectedUser.role !== "ADMIN") {
            selectedUser.role = role;
            userService.UpdateUserRole(selectedUser);
        }
    };

    const DeleteUserButtonHandle = () => {
        if (selectedUser.role !== "ADMIN") {
            const auth = new AuthStateService().getInstance();
            auth.DeleteRegistrationData(selectedUser.uuid);
        }
        openDialog(false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <FormControlLabel
                    disabled={selectedUser.role !== "USER"}
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={favorite} onChange={(e) => (favoriteCheck(e))} />}
                    label="Курируемый"
                    value={favorite}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    disabled={!favorite}
                    label="Название отношения"
                    variant="outlined"
                    value={relationName}
                    onChange={e => (setRelationName(e.target.value))}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Select
                    fullWidth
                    hidden={authService.getRole() !== 'ADMIN'}
                    value={role}
                    onChange={handleChange}
                >
                    <MenuItem value={"USER"}>Пользователь</MenuItem>
                    <MenuItem value={"CURATOR"}>Куратор</MenuItem>
                    <MenuItem value={"ADMIN"}>Админ</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    fullWidth
                    hidden={authService.getRole() !== 'ADMIN'}
                    variant="contained" color="primary" 
                    onClick={SetRoleButtonHandle} >
                    Установить роль
                </Button>
            </Grid>

            <Grid item xs={12} sm={12}>
                <ConfirmDialog setActive={openDialog} active={dialog} title={"Удалить аккаунт?"} message={"Это действие впоследствии отменить невозможно!"} handleOK={DeleteUserButtonHandle} ></ConfirmDialog>
                <Button
                    fullWidth
                    hidden={authService.getRole() !== 'ADMIN'}
                    variant="contained" color="secondary" onClick={() => openDialog(true)} >
                    Удалить пользователя
                </Button>
            </Grid>
        </Grid>
    )
}