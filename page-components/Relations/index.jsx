import * as React from 'react';
import RelationsList from './RelationsList';
import PosterRelation from './PosterRelation';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import styles from './Feed.module.css';
import customtheme from '@/page-components/Relations/theme';
import { useCurrentUser } from '@/lib/user';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Relations = () => {
  const { data, error } = useCurrentUser();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let fab = false;

  if (data.user != null) {
    const wallet = data.user.wallet;
    const user_tipo = wallet.split(';');

    if (user_tipo[0] == 'credenciado') {
      fab = true;
    }
  }
  return (
    <div className={styles.root}>
      <Box
        style={{ visibility: fab ? 'visible' : 'hidden' }}
        className={styles.box}
        sx={{ '& > :not(style)': { m: 1 } }}
      >
        <Fab
          theme={customtheme}
          color="primary"
          aria-label="add"
          onClick={handleOpen}
        >
          <AddIcon />
          <Dialog
            className={styles.root}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <PosterRelation />
          </Dialog>
        </Fab>
      </Box>
      <RelationsList />
    </div>
  );
};
