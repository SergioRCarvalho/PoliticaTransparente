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
import { Input, Textarea } from '@/components/Input';

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
        toast.success('Relação inserida com sucesso');
        // refresh post lists
        handleClose.true;
        mutate();
      } catch (e) {
        toast.error('Erro ao preencher os campos');
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
      <div>
        <Container className={styles.poster}>
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
          <Input
            ref={contentEntA}
            className={styles.input}
            label="Inserir entidade A"
            required
          />
          <Input
            ref={contentEntB}
            className={styles.input}
            label="Inserir entidade B"
            required
          />
          <Input
            ref={contentTP}
            className={styles.input}
            label="Tipo de relação"
            required
          />
        </Container>

        <Container className={styles.poster2}>
          <Input
            ref={contentTR}
            className={styles.input}
            label="Inserir titulo da relação"
            required
          />
          <Button type="success" className={styles.botao} loading={isLoading}>
            Submeter
          </Button>
        </Container>
        <Container>
          <Textarea
            placeholder="Inserir nota"
            ref={contentNR}
            className={styles.input}
            label="Nota da relação"
            required
          />
        </Container>
      </div>
    </form>
  );
};

const PosterRelation = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper className={styles.wrap}>
      <h3 className={styles.heading}>Publicar relação</h3>
      {loading ? (
        <LoadingDots>A carregar</LoadingDots>
      ) : data?.user ? (
        <PosterInner user={data.user} />
      ) : (
        <Text color="secondary">
          Faça o{' '}
          <Link href="/login" passHref>
            <TextLink color="link" variant="highlight">
              login
            </TextLink>
          </Link>{' '}
          para publicar
        </Text>
      )}
    </Wrapper>
  );
};

export default PosterRelation;
