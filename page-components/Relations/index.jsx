import * as React from 'react';
import RelationsList from './RelationsList';
import PosterRelation from './PosterRelation';
import { Modal } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import styles from './Feed.module.css';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import customtheme from '@/page-components/Relations/theme';

export const Relations = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={styles.root}>
      <Box className={styles.box} sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab theme={customtheme} color="primary" aria-label="add">
          <AddIcon onClick={handleOpen} />
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box className={styles.trans}>
                <PosterRelation />
              </Box>
            </Fade>
          </Modal>
        </Fab>
      </Box>
      <RelationsList />
    </div>
  );
};
