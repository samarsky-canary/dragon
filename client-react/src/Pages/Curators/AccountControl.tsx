import { Button, createStyles, Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import React, { useContext } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { NotifyDialog } from '../../components/NotifyDialog';
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



export const AccountControl: React.FC<Props> = ({ authService }) => {
    const userService = new UserService(authService).getInstance();
    const classes = useStyles();
    const { state, dispatch } = useContext(UserContext);
    const [old, setOld] = useState('');
    const [newName, setNew] = useState('');
    const [dialog, openDialog] = useState<boolean>(false);
    const [notifyDialog, openNotifyDialog] = useState<boolean>(false);
    const oldRef = useRef<any>(null);
    const  [notifyMessage, setNotifyMessage] = useState("");

    function handleLogout() {
        dispatch({
            type: "LOGOUT",
            payload: {
                access_token: undefined,
                role: undefined,
                username: undefined,
                uuid: undefined
            }
        })
    }


    function deleteAccount() {
        handleLogout()
        authService.DeleteRegistrationData(authService.getUUID());
        openDialog(false);
    }

    function renameUser() {
        if (old === authService.getUsername()) {
            if (newName.length >= 6) {
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
                        role: state.role,
                        uuid: state.uuid,
                        access_token: state.access_token
                    }
                })
            }
            setNotifyMessage("Имя пользователя успешно изменено!");
        } else {
            setNotifyMessage("Проверьте ввод! Старое имя должно совпадать (включая регистр). Новое должно содержать только буквы и цифры и быть не короче 6 символов");
            oldRef.current!.focus();
        }
        openNotifyDialog(true);
    }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Paper square={false} elevation={2}>
                <TextField error={false} inputRef={oldRef} id="outlined-basic" label="Введите старое имя" variant="outlined" value={old} onChange={(e) => { setOld(e.target.value) }} />
                <TextField id="outlined-basic" label="Введите новое имя" variant="outlined" value={newName} onChange={(e) => { setNew(e.target.value) }} />
                <NotifyDialog message={notifyMessage} active={notifyDialog} setActive={openNotifyDialog} />
                <Button variant="outlined" color="secondary" onClick={(e) => (renameUser())}>
                    Изменить имя
                </Button>
            </Paper>
            <Paper>
                <ConfirmDialog setActive={openDialog} active={dialog} title={"Удалить аккаунт?"} message={"Это действие впоследствии отменить невозможно!"} handleOK={deleteAccount} ></ConfirmDialog>
                <Button variant="outlined" color="secondary" onClick={(e) => (openDialog(true))} >
                    Удалить аккаунт
                </Button>
            </Paper>
        </Grid>
    )
}