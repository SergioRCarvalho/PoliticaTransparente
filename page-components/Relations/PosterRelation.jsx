import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { useRelaPages } from '@/lib/relations';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './PosterRelation.module.css';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

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
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return (
    <form onSubmit={onSubmit}>
      <Container className={styles.poster}>
        <Avatar size={40} username={user.username} url={user.profilePicture} />
      </Container>
      <Container className={styles.poster}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              className={styles.input}
              ref={contentEntA}
              required
              id="outlined-required"
              placeholder="Entidade A"
            />
            <TextField
              className={styles.input}
              ref={contentEntB}
              required
              id="outlined-required "
              placeholder="Entidade B"
            />
            <TextField
              className={styles.input}
              ref={contentTP}
              required
              id="outlined-required "
              placeholder="Tipo de relação"
            />
            <TextField
              className={styles.input}
              ref={contentTR}
              required
              id="outlined-required "
              placeholder="Titulo da relação"
            />

            <p>Inserir nota</p>
            <SunEditor ref={contentNR} className={styles.seditor} />

            <Button
              type="success"
              loading={isLoading}
              className={styles.input3}
            >
              Submeter
            </Button>
          </div>
        </Box>
        {/* 
        <Container className={styles.poster2}>
         <Input
            ref={contentEntA}
            className={styles.input}
            placeholder={` Inserir entidade A`}
            ariaLabel={` Inserir entidade A`}
          />
          <Input
            ref={contentEntB}
            className={styles.input}
            placeholder={` Inserir entidade B`}
            ariaLabel={` Inserir entidade B`}
          />
          <Input
            ref={contentTP}
            className={styles.input}
            placeholder={` Tipo de relação`}
            ariaLabel={` Tipo de relação`}
          />
          <Input
            ref={contentTR}
            className={styles.input2}
            placeholder={` Inserir titulo da relação`}
            ariaLabel={` Inserir titulo da relação`}
          />
          <Input
            ref={contentNR}
            className={styles.input}
            placeholder={` Inserir nota da relação`}
            ariaLabel={` Inserir nota da relação`}
          />

          <SunEditor />

          <Button type="success" loading={isLoading}>
            Post
          </Button>
        </Container> */}
      </Container>
    </form>
  );
};

const PosterRelation = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
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
      </div>
    </Wrapper>
  );
};

export default PosterRelation;
