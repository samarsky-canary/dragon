import { Button, Container, createStyles, Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import React, { useContext } from 'react';
import { useState } from 'react';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { UserContext } from '../../context/user.provider';
import { AuthStateService } from '../../services/AuthStateService';
import { ChangePassword } from './Components/ChangePassword';
import { RenameForm } from './Components/RenameForm';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type Props = {
    authService: AuthStateService
}



export const AccountControl: React.FC<Props> = ({ authService }) => {
    const { state, dispatch } = useContext(UserContext);

    const [dialog, openDialog] = useState<boolean>(false);
    const classes = useStyles();
    function handleLogout() {
        dispatch({
            type: "LOGOUT",
            payload: {
                access_token: undefined,
                role: undefined,
                username: undefined,
                uuid: undefined,
                email: undefined,
            }
        })
    }

    function deleteAccount() {
        handleLogout()
        authService.DeleteRegistrationData(authService.getUUID());
        openDialog(false);
    }



    return (
        <Container component="main" maxWidth="xs">
            <form className={classes.form}>
                <Grid container spacing={2}>
                    <RenameForm authService={authService}/>
                    <ChangePassword authService={authService}/>
                    <ConfirmDialog
                        setActive={openDialog}
                        active={dialog}
                        title={"Удалить аккаунт?"}
                        message={"Это действие впоследствии отменить невозможно!"}
                        handleOK={deleteAccount}
                    />
                    <Grid item xs={12} sm={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={(e) => (openDialog(true))} >
                            Удалить аккаунт
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}