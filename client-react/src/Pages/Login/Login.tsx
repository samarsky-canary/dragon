import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import './Login.scss';
import { AuthStateService } from '../../services/AuthStateService';
import { UserAction } from '../../context/user.provider';
import { Avatar, Button, Container, CssBaseline, makeStyles, TextField, Typography, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockTwoTone';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


const greet = "DRAKON IDE";
const authStateService = new AuthStateService().getInstance();

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?dragon)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(16, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.light,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.primary.light
    },
}));

type Props = {
    setRegisterData: React.Dispatch<UserAction>;
}

interface State {
    username: string;
    email: string
    password: string;
    repeatPassword: string;
    showPassword: boolean;
    registrationForm: boolean
}

export const Login: React.FC<Props> = ({ setRegisterData }) => {
    const [values, setValues] = React.useState<State>({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        showPassword: false,
        registrationForm: false,
    });
    const [errorHidden, setErrorHidden] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const classes = useStyles();


    const togglePasswordVisiblity = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };


    function handleAuthentificationButton(e?: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) {
        e?.preventDefault();
        if (values.registrationForm) {
            if (values.password === values.repeatPassword) {
                return handleSignupSubmit();
            } else {
                setErrorMessage("Пароли не совпадают")
                setErrorHidden(false);
            }
        } else {
            return handleLoginSubmit()
        }
    }

    const handleLoginSubmit = async () => {
        const response = await authStateService.Authentificate(values.username, values.password);
        if (response.status === 200 && response.body) {
            console.log(response.body)
            setRegisterData({
                type: "LOGIN",
                payload: response.body
            });
        }
        else {
            if (response.statusText) {
                setErrorMessage(response.statusText.replace("QueryFailedError:", ''));
            } else {
                setErrorMessage("No response")
            }
            setErrorHidden(false);
        }
    }

    const handleSignupSubmit = async () => {
        const response = await authStateService.RegisterUser(values.username, values.password, values.email);
        if (response.status === 201 && response.body) {
            setRegisterData({
                type: "LOGIN",
                payload: response.body
            });
        }
        else {
            if (response.statusText) {
                setErrorMessage(response.statusText);
            } else {
                setErrorMessage("No response")
            }
            setErrorHidden(false);
        }
    }


    useEffect(() => {
        document.title = "Вход и регистрация"
    }, []);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        {greet}
                    </Typography>
                    <Avatar className={classes.avatar}>
                        {values.registrationForm ? <VpnKeyIcon /> : <LockOutlinedIcon />}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {values.registrationForm ? "Регистрация" : "Вход"}
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Логин"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={e => {
                                setValues({ ...values, username: e.target.value });
                            }}
                        />
                        <TextField
                            hidden={!values.registrationForm}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => {
                                setValues({ ...values, email: e.target.value });
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            onChange={e => {
                                setValues({ ...values, password: e.target.value });
                            }}
                        />
                        <TextField
                            hidden={!values.registrationForm}
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Повторите пароль"
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            onChange={e => {
                                setValues({ ...values, repeatPassword: e.target.value });
                            }}
                        />
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisiblity}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        <Alert hidden={errorHidden} variant="danger">{errorMessage}</Alert>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e) => { handleAuthentificationButton(e); }}
                        >
                            {values.registrationForm ? "Регистрация" : "Вход"}
                        </Button>
                        <Button
                            variant="text"
                            fullWidth
                            onClick={e => {
                                setValues({ ...values, registrationForm: !values.registrationForm });
                            }}
                        >
                            {values.registrationForm ? "Есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
                        </Button>
                    </form>
                </div>
            </Container>
        </div >);
};

export default Login;