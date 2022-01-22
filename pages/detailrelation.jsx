import { DetailsRelation } from '@/page-components/DetailsRelation';
import Head from 'next/head';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './box.module.css';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useCurrentUser } from '@/lib/user';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useCallback, useRef, useState, useEffect } from 'react';
import { useRelaVoto } from '@/lib/relationsVoto';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EditRelation from '@/page-components/Relations/EditRelation';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const actions = [
  { icon: <EditIcon />, name: 'Editar' },
  { icon: <DeleteIcon />, name: 'Eliminar' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailRelationPage = ({ className, routers = useRouter() }) => {
  const user_id = useCurrentUser()._id;
  // const routers = useRouter();
  const RelationRecord = JSON.parse(routers.query.record);
  const RelationKey = JSON.parse(routers.query.key);
  const user_relation = RelationRecord.idUt;

  const fab = user_id == user_relation ? true : false;
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const { mutate } = useRelaVoto();
  const [isLoading, setIsLoading] = useState(false);

  const deleteRelation = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/relations', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: RelationKey,
          }),
        });
        toast.success('You have posted successfully');
        // refresh post lists
        handleClose.true;
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  function onOperator(id, op) {
    if (op == 'Eliminar') {
      setOpen(true);
      // deleteRelation(id);
    } else {
      setOpen2(true);
    }
  }

  /* async function getRouter() {
    await routers;
    RelationRecord = JSON.parse(routers.query.record);
    RelationKey = await routers.query.key;
    return;
  }*/

  /* if (RelationKey == '') {
    getRouter();
    console.log('e=' + RelationKey);
  }*/

  return (
    <>
      <Head>
        <title>DetailsRelation</title>
      </Head>
      <div>
        <Box
          style={{ visibility: fab ? 'visible' : 'hidden' }}
          className={styles.box}
          sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<MoreVertIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                onClick={(e) => {
                  e.preventDefault();
                  onOperator(RelationKey, action.name);
                }}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>
      </div>
      <DetailsRelation
        RelationKey={RelationKey}
        RelationRecord={RelationRecord}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Eliminar relação'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p>Confirma que deseja eliminar esta relação?</p>
            <p>Esta ação é irreversível.</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteRelation}>
            <Link href="/relations">Sim</Link>
          </Button>
          <Button onClick={handleClose}>Não</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogTitle>{'Editar relação'}</DialogTitle>
          <EditRelation
            RelationKey={RelationKey}
            RelationRecord={RelationRecord}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailRelationPage;
