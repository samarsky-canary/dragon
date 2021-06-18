import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useEffect } from 'react';



type Props = {
    title: string
    message: string
    handleOK: ()=> void
    active: boolean
    setActive: (value: boolean) => void
}

export const ConfirmDialog: React.FC<Props> = ({title, message, handleOK, active, setActive}) => {

    const handleClose = () => {
        setActive(false);
    };

    return (
            <Dialog
                open={active}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleOK} color="primary" autoFocus>
                        ОК
                    </Button>
                </DialogActions>
            </Dialog>
    );
}