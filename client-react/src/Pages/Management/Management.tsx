import { Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { AuthStateService } from '../../services/AuthStateService';
import { AccountControl } from './AccountControl';
import { UserManagement } from './UserManagement';


const authService: AuthStateService = new AuthStateService().getInstance();


export const ManagementPage: React.FC = () => {


    useEffect(() => {
        document.title = "Управление"
    },[]);
    
    return (
        <Container >
            <Grid>
                <Container>
                    <Typography align="center" variant="h4">Управление учётной записью</Typography>
                </Container>
            </Grid>
            <Grid>
                <AccountControl authService={authService}></AccountControl>
            </Grid>
            <Grid>
                <UserManagement authService={authService}></UserManagement>
            </Grid>
            
        </Container>
    );
}