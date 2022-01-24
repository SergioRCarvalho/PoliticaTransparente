import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { useCommentPages } from '@/lib/comment';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Commenter.module.css';

const CommenterInner = ({ user, eKey }) => {
  const contentRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useCommentPages({ postId: eKey });

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher(`/api/relations/${eKey}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: contentRef.current.value }),
        });
        toast.success('Comentário adicionado com sucesso');
        contentRef.current.value = '';
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error('Erro ao inserir comentário');
      } finally {
        setIsLoading(false);
      }
    },
    [mutate, eKey]
  );

  return (
    <form onSubmit={onSubmit}>
      <Container className={styles.poster}>
        <Avatar size={40} username={user.username} url={user.profilePicture} />
        <Input
          ref={contentRef}
          className={styles.input}
          placeholder="Adicionar comentário"
          ariaLabel="Adicionar comentário"
        />
        <Button type="success" loading={isLoading}>
          Comentar
        </Button>
      </Container>
    </form>
  );
};

const Commenter = ({ eKey }) => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>
        Responder{' '}
        <Link href={``} passHref>
          <TextLink color="link">@{}</TextLink>
        </Link>
      </h3>
      {loading ? (
        <LoadingDots>Carregar</LoadingDots>
      ) : data?.user ? (
        <CommenterInner eKey={eKey} user={data.user} />
      ) : (
        <Text color="secondary">
          Faça o{' '}
          <Link href="/login" passHref>
            <TextLink color="link" variant="highlight">
              login
            </TextLink>
          </Link>{' '}
          para comentar
        </Text>
      )}
    </div>
  );
};

export default Commenter;
