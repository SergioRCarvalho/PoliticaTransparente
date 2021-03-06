import cljx from 'clsx';
import { Button } from '@/components/Button';
import styles from './Contador.module.css';
import { useRelaVoto } from '@/lib/relationsVoto';
import { useCurrentUser } from '@/lib/user';
import { useCallback, useRef, useState } from 'react';
import * as React from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Contador = ({ eKey }) => {
  const { data } = useRelaVoto(eKey);

  const posts = data
    ? data.reduce((acc, person) => [...acc, person.resu], [])
    : [];
  let count = '';
  let user_id = useCurrentUser();
  let VoteUp = false;
  let VoteDown = false;
  if (user_id.data.user != null) {
    if (posts.length != 0) {
      posts.map((e) => {
        e.map((r) => {
          if (
            r.Record.estadoVoto === '+1' &&
            r.Record.idUser === user_id.data.user._id
          ) {
            VoteUp = true;
            VoteDown = false;
          }
          if (
            r.Record.estadoVoto === '-1' &&
            r.Record.idUser === user_id.data.user._id
          ) {
            VoteDown = true;
            VoteUp = false;
          }
        });
      });
    }
  }

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const { mutate } = useRelaVoto(eKey);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitup = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/relationVoto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            voto: '+1',
            idRelation: eKey.toString(),
          }),
        });
        toast.success('Voto inserido com sucesso');
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error('Erro ao inserir voto');
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  const onSubmitdown = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/relationVoto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            voto: '-1',
            idRelation: eKey.toString(),
          }),
        });
        toast.success('Voto inserido com sucesso');
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error('Erro ao inserir voto');
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  if (posts.length != 0) {
    count =
      posts[0].filter((item) => item.Record.estadoVoto === '+1').length -
      posts[0].filter((item) => item.Record.estadoVoto === '-1').length;
  } else {
    count = 0;
  }
  if (user_id.data.user != null) {
    return (
      <>
        <form className={styles.center} onSubmit={onSubmitup}>
          <Button type="secondary" className={styles.voto}>
            <i
              className={cljx(
                'fa fa-sort-asc',
                VoteUp ? styles.votado : styles.voto
              )}
            ></i>
          </Button>
        </form>
        <p>{count}</p>
        <form className={styles.center} onSubmit={onSubmitdown}>
          <Button type="secondary" className={styles.voto}>
            <i
              className={cljx(
                'fa fa-sort-desc',
                VoteDown ? styles.votado : styles.voto
              )}
            ></i>
          </Button>
        </form>
      </>
    );
  } else {
    return (
      <>
        <p className={styles.center}>
          <Button
            type="secondary"
            className={styles.voto}
            onClick={handleClickOpen2}
          >
            <i className={cljx('fa fa-sort-asc', styles.voto)}></i>
          </Button>
        </p>
        <p>{count}</p>
        <p className={styles.center}>
          <Button
            type="secondary"
            className={styles.voto}
            onClick={handleClickOpen2}
          >
            <i className={cljx('fa fa-sort-desc', styles.voto)}></i>
          </Button>
        </p>
        <Dialog
          open={open2}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose2}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Voto negado'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Para proceder ao voto precisa de realizar o login
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </>
    );
  }
};
export default Contador;
