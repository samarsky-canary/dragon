import React, { useContext, useState } from 'react';
import { Grid, TextField, Button, IconButton } from '@material-ui/core';
import { NotifyDialog } from '../../../components/NotifyDialog';
import { UserService } from '../../../services/UserService';
import { UserContext } from '../../../context/user.provider';
import { AuthStateService } from '../../../services/AuthStateService';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

type Props = {
    authService: AuthStateService
}


interface State {
    oldPassword: string;
    newPassword: string;
    Repeatpassword: string;
    showPassword: boolean;
    showRepeatPassword: boolean;
}

export const ChangePassword: React.FC<Props> = ({ authService }) => {
    const userService = new UserService(authService).getInstance();
    const [values, setValues] = React.useState<State>({
        oldPassword: '',
        newPassword: '',
        Repeatpassword: '',
        showPassword: false,
        showRepeatPassword: false,
    });

    const { state, dispatch } = useContext(UserContext);
    const [notifyDialog, openNotifyDialog] = useState<boolean>(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [visible, setVisible] = useState<boolean>(true);


    async function changePassword() {
        setNotifyMessage("")
        if (values.newPassword !== values.Repeatpassword) {
            setNotifyMessage("Пароли не совпадают. Повторите пароль в соответствующем поле ввода.")
            openNotifyDialog(true);
            return;
        } else if (values.newPassword === "" || values.Repeatpassword === "") {
            setNotifyMessage("Поля пароля не должны быть пустыми")
            openNotifyDialog(true);
            return;
        }
        const response = await authService.changePassword(values.oldPassword, values.newPassword);
        console.log(response)
        if (response.statusText === "Invalid password") {
            setNotifyMessage("Текущий пароль введен неверно");
            openNotifyDialog(true);
            return
        }
        if (response.status === 200) {
            setNotifyMessage("Пароль успешно изменен");
            openNotifyDialog(true);
            return
        }
        setNotifyMessage("Слабый пароль. Пароль должен состоять из букв латинского алфавита, содержать хотя бы 1 заглавную и 1 прописную букву или цифру. Длина не менее 6 символов");
        openNotifyDialog(true);
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
                    Изменить пароль
                </Button>
            </Grid>
            <Grid hidden={visible} item xs={10} sm={10}>
                <TextField
                    fullWidth
                    error={false}
                    id="outlined-basic"
                    label="Старый пароль"
                    variant="outlined"
                    value={values.oldPassword}
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) => { setValues({ ...values, oldPassword: e.target.value }) }}
                />
            </Grid>
            <Grid hidden={visible} item xs={1} sm={1}>
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </Grid>
            <Grid hidden={visible} item xs={12} sm={6}>
                <TextField
                    id="outlined-basic"
                    label="Новый пароль"
                    variant="outlined"
                    value={values.newPassword}
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) => { setValues({ ...values, newPassword: e.target.value }) }}
                />
            </Grid>
            <Grid hidden={visible} item xs={12} sm={6}>
                <TextField
                    id="outlined-basic"
                    label="Повторите пароль"
                    variant="outlined"
                    value={values.Repeatpassword}
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) => { setValues({ ...values, Repeatpassword: e.target.value }) }} />
            </Grid>
            <Grid hidden={visible} item xs={12} sm={6}>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={(e) => (changePassword())}>
                    Изменить пароль
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