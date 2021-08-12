import React, { FormEvent, Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReplyIcon from '@material-ui/icons/Reply';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AnyCnameRecord } from 'dns';
import { createNewTweet } from '../../redux/actions/tweetActions';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

export interface IPropsModal {
    tweetId?: string;
}

export default function FormDialog({ tweetId }: IPropsModal) {

    const [tweetText, setTweetText] = useState('');
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleClickOpen = (tweetId: string) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmitPost = (e: FormEvent): void => {
        e.preventDefault();
        dispatch(createNewTweet(tweetText))
    }
    return (
        <Fragment>

            <ReplyIcon className="replayIcon" onClick={() => handleClickOpen(tweetId!)} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Reply to tweet</DialogTitle>
                <form onSubmit={handleSubmitPost}>
                    <DialogContent>
                        <TextField
                            id="standard-multiline-static"
                            label="Tweet to post"
                            multiline
                            rows={5}
                            onChange={(e) => setTweetText(e.target.value)}
                            defaultValue=""
                            variant="standard"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary" type="submit">
                            Submit Reply
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </Fragment>
    );
}