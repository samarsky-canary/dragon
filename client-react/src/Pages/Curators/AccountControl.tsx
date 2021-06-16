import { Button, createStyles, Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import React, { useContext } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { UserContext } from '../../context/user.provider';
import { AuthStateService } from '../../services/AuthStateService';
import { UserService } from '../../services/UserService';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }),
);


type Props = {
    authService: AuthStateService
}



export const AccountControl: React.FC<Props> = ({authService}) => {
    const userService = new UserService(authService).getInstance();
    const classes= useStyles();
    const {state, dispatch} = useContext(UserContext);
    const [old, setOld] = useState('');
    const [newName, setNew] = useState('');
    const oldRef = useRef<any>(null);


    function handleLogout() {
        dispatch({
            type: "LOGOUT",
            payload: {
                access_token: undefined,
                role : undefined,
                username: undefined,
                uuid: undefined
            }
        })
    }


    function deleteAccount(e: React.MouseEvent<HTMLElement, MouseEvent>){
        e.preventDefault();
        handleLogout()
        authService.DeleteRegistrationData(authService.getUUID());
    }

    function renameUser(){
        if (old === authService.getUsername()){
            if(newName.length >= 6) {
                const role = state.role!;
                const uuid = state.uuid!;
                userService.UpdateData({
                    username: newName,
                    role: role,
                    uuid: uuid
                });
                dispatch({
                    type: "UPDATE",
                    payload: {
                        username: newName,
                        role : state.role,
                        uuid: state.uuid,
                        access_token: state.access_token
                    }
                })
            }
        } else {
            oldRef.current!.value = "Неверное имя";
            oldRef.current!.focus();
        }
    }

    return (
        <Grid 
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Paper square={false} elevation={2}>
                <TextField error={false} inputRef={oldRef} id="outlined-basic" label="Введите старое имя" variant="outlined" value={old} onChange={(e)=>{setOld(e.target.value)}}/>
                <TextField id="outlined-basic" label="Введите новое имя" variant="outlined" value={newName} onChange={(e)=>{setNew(e.target.value)}}/>
                <Button variant="outlined" color="secondary" onClick={(e)=>(renameUser())}>
                    Изменить имя
                </Button>
            </Paper>
            <Paper>
                <Button variant="outlined" color="secondary" onClick={(e)=>(deleteAccount(e))} >
                    Удалить аккаунт
                </Button>
            </Paper>
        </Grid>
    )
}