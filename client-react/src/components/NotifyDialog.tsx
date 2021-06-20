import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';



type Props = {
    message: string
    active: boolean
    setActive: (value: boolean) => void
}

export const NotifyDialog: React.FC<Props> = ({message, active, setActive}) => {
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
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        ОК
                    </Button>
                </DialogActions>
            </Dialog>
    );
}