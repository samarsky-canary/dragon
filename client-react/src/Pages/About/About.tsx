import { Container, Button, makeStyles, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import GitHub from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export const About : FC = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = "О продукте"
    },[]);

    
    return(
       <Container>
           <Typography paragraph>
           Данные программный продукт разрабатывается в рамках
           дипломного проектирования веб среды для обучения алгоритмизации с помощью языка ДРАКОН
           студентом астраханского государственного технического университета группы ДИПРБ-41 (2020-2021 год) 
           20182750 Самарским Владиславом Вальеревичом.
        </Typography>
           
           <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<GitHub />}
        href="https://github.com/samarsky-canary/dragon"
      >
        Открыть проект на GitHub
      </Button>
       </Container>
    );
}