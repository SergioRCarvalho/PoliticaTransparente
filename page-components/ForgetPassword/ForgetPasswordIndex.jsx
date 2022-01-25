import { Button } from '@/components/Button';
import { ButtonLink } from '@/components/Button/Button';
import { Input } from '@/components/Input';
import { Spacer, Wrapper } from '@/components/Layout';
import { Text } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './ForgetPassword.module.css';

const ForgetPasswordIndex = () => {
  const emailRef = useRef();
  // 'loading' || 'success'
  const [status, setStatus] = useState();
  const [email, setEmail] = useState('');
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setStatus('loading');
      await fetcher('/api/user/password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailRef.current.value,
        }),
      });
      setEmail(emailRef.current.value);
      setStatus('success');
    } catch (e) {
      toast.error(e.message);
      setStatus(undefined);
    }
  }, []);

  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        {status === 'success' ? (
          <>
            <h1 className={styles.title}>Verifique a sua conta</h1>
            <p className={styles.subtitle}>
              Foi enviado um email{' '}
              <Text as="span" color="link">
                {email}
              </Text>
              . Use o link para fazer reset à sua password.
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Recuperar password</h1>
            <p className={styles.subtitle}>
              Entre no email associado à tua conta e receberá o link para dar
              reset à password.
            </p>
            <Spacer size={1} />
            <form onSubmit={onSubmit}>
              <Input
                ref={emailRef}
                htmlType="email"
                autoComplete="email"
                placeholder="Email"
                ariaLabel="Email"
                size="large"
                required
              />
              <Spacer size={0.5} axis="vertical" />
              <Button
                htmlType="submit"
                className={styles.submit}
                type="success"
                size="large"
                loading={status === 'loading'}
              >
                Continuar
              </Button>
            </form>
          </>
        )}
        <Spacer size={0.25} axis="vertical" />
        <Link href="/login" passHref>
          <ButtonLink type="success" size="large" variant="ghost">
            Voltar para iniciar a sessão
          </ButtonLink>
        </Link>
      </div>
    </Wrapper>
  );
};

export default ForgetPasswordIndex;
