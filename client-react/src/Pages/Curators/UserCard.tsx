import { Card, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { RelationDTO } from '../../DTO/relationDTO';
import { UserDTO } from '../../DTO/UserDTO';
import { AuthStateService } from '../../services/AuthStateService';
import { CuratorService } from '../../services/CuratorService';

const authService: AuthStateService = new AuthStateService().getInstance();


type Props = {
    selectedUser: UserDTO;
    curatorService: CuratorService;
    favorites: RelationDTO[];
    setFavorites: (value: RelationDTO[]) => void
}

export const UserCard: React.FC<Props> = ({ selectedUser, favorites, curatorService, setFavorites }) => {
    const [favorite, setFavorite] = useState<boolean>(false);
    const [relationName, setRelationName] = useState<string>('');

    useEffect(()=>{
        const relation = favorites.find((value)=>(value.uuid_user === selectedUser.uuid));
        setFavorite(relation !== undefined);
        setRelationName(relation ? relation.relation_name : '');
    },[selectedUser])


    function favoriteCheck(e: any) {
        const relation = favorites.find((value)=>(value.uuid_user === selectedUser.uuid));
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
        curatorService.getRelationsByCurator(authService.getUUID()).then(resolve=>(setFavorites(resolve)))
    }

    useEffect(()=>{
        const relation = favorites.find((value)=>(value.uuid_user === selectedUser.uuid));
        if (relation) {
            relation.relation_name = relationName;
            curatorService.updateRelation(relation);
        }
    },[relationName])

    function changeRelationName(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
    }

    return (
        <Container >
            <Grid>
                <Card>
                    <Typography>{selectedUser.username}</Typography>
                    <Typography>{selectedUser.role}</Typography>
                    <FormControlLabel
                        disabled={selectedUser.role !== "USER"}
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={favorite} onChange={(e)=>(favoriteCheck(e))} />}
                        label="Курируемый"
                        value={favorite} 
                    />
                    <TextField 
                    disabled={!favorite}
                    label="Название отношения" 
                    variant="outlined" 
                    value={relationName}
                    onChange={e=>(setRelationName(e.target.value))}
                    />
                </Card>
            </Grid>
        </Container>
    )
}