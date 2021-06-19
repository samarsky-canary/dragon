import React, { useContext, useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { NotifyDialog } from '../../../components/NotifyDialog';
import { UserService } from '../../../services/UserService';
import { UserContext } from '../../../context/user.provider';
import { AuthStateService } from '../../../services/AuthStateService';

type Props = {
    authService: AuthStateService
}



export const RenameForm: React.FC<Props> = ({ authService }) => {
    const userService = new UserService(authService).getInstance();

    const [old, setOld] = useState('');
    const [newName, setNew] = useState('');
    const { state, dispatch } = useContext(UserContext);
    const [notifyDialog, openNotifyDialog] = useState<boolean>(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [visible, setVisible] = useState<boolean>(true);


    function renameUser() {
        console.log(authService.getUsername());
        if (old === authService.getUsername()) {
            if (newName.length >= 6) {
                const role = state.role!;
                const uuid = state.uuid!;
                const email = state.email!;
                userService.UpdateData({
                    username: newName,
                    role: role,
                    uuid: uuid,
                    email: email,
                });
                dispatch({
                    type: "UPDATE",
                    payload: {
                        username: newName,
                        role: state.role,
                        uuid: state.uuid,
                        access_token: state.access_token,
                        email: state.email
                    }
                })
            }
            setNotifyMessage("Имя пользователя успешно изменено!");
            setVisible(!visible)
        } else {
            setNotifyMessage("Проверьте ввод! Старое имя должно совпадать (включая регистр). Новое должно содержать только буквы и цифры и быть не короче 6 символов");
        }
        openNotifyDialog(true);
    }

    return (
        <React.Fragment>
            <NotifyDialog message={notifyMessage} active={notifyDialog} setActive={openNotifyDialog} />
            <Grid item xs={12} sm={12}>
                <Button
                    hidden={!visible}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e) => (setVisible(!visible))}>
                    Изменить имя пользователя
                </Button>
            </Grid>
            <Grid hidden={visible} item xs={12} sm={6}>
                <TextField error={false} id="outlined-basic" label="Введите старое имя" variant="outlined" value={old} onChange={(e) => { setOld(e.target.value) }} />
            </Grid>
            <Grid hidden={visible} item xs={12} sm={6}>
                <TextField id="outlined-basic" label="Введите новое имя" variant="outlined" value={newName} onChange={(e) => { setNew(e.target.value) }} />
            </Grid>
            <Grid hidden={visible} item xs={12} sm={6}>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={(e) => (renameUser())}>
                    Изменить имя
                </Button>
            </Grid>
            <Grid hidden={visible} item xs={12} sm={6}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e) => (setVisible(!visible))}>
                    Закрыть
                </Button>
            </Grid>
        </React.Fragment>
    )
}