import { Avatar } from '@/components/Avatar';
import * as React from 'react';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import TextField from '@mui/material/TextField';
import { fetcher } from '@/lib/fetch';
import { useRelaPages } from '@/lib/relations';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './PosterRelation.module.css';
import { Input } from '@/components/Input';

const PosterInner = ({ user }) => {
  const contentEntA = useRef();
  const contentEntB = useRef();
  const contentTP = useRef();
  const contentTR = useRef();
  const contentNR = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useRelaPages();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/relations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            enta: contentEntA.current.value,
            entb: contentEntB.current.value,
            titulo: contentTP.current.value,
            tipo: contentTR.current.value,
            nota: contentNR.current.value,
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
  const { data, error } = useCurrentUser();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <form onSubmit={onSubmit}>
      <Container>
        <a>
          <Container className={styles.creator}>
            <Avatar
              size={36}
              url={data.user.profilePicture}
              username={data.user.username}
            />
            <Container column className={styles.meta}>
              <p className={styles.name}>{data.user.name}</p>
              <p className={styles.username}>{data.user.username}</p>
            </Container>
          </Container>
        </a>
      </Container>
      <Container className={styles.poster}>
        <TextField
          style={{ marginRight: '50px', marginLeft: '50px' }}
          ref={contentEntA}
          className={styles.input}
          label="Inserir entidade A"
        />
        <TextField
          ref={contentEntB}
          style={{ marginRight: '20px', marginLeft: '20px' }}
          className={styles.input}
          label="Inserir entidade B"
        />
        <TextField
          ref={contentTP}
          style={{ marginRight: '20px', marginLeft: '20px' }}
          className={styles.input}
          label="Tipo de relação"
        />
      </Container>

      <Container className={styles.poster2}>
        <TextField
          ref={contentTR}
          style={{ marginRight: '50px', marginLeft: '50px' }}
          className={styles.input}
          label="Inserir titulo da relação"
        />
        <TextField
          ref={contentNR}
          style={{ marginRight: '20px', marginLeft: '20px' }}
          className={styles.input}
          label="Inserir nota da relação"
        />

        <Button type="success" className={styles.botao} loading={isLoading}>
          Submeter
        </Button>
      </Container>
    </form>
  );
};

const PosterRelation = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <h3 className={styles.heading}>Publicar relação</h3>
      {loading ? (
        <LoadingDots>Loading</LoadingDots>
      ) : data?.user ? (
        <PosterInner user={data.user} />
      ) : (
        <Text color="secondary">
          Please{' '}
          <Link href="/login" passHref>
            <TextLink color="link" variant="highlight">
              sign in
            </TextLink>
          </Link>{' '}
          to post
        </Text>
      )}
    </Wrapper>
  );
};

export default PosterRelation;
