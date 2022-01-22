import Head from 'next/head';
import * as React from 'react';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import styles from './box.module.css';
import Admin from '@/page-components/Admin';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Wrapper>
        <Container className={styles.root}>
          <Admin></Admin>
        </Container>
      </Wrapper>
    </>
  );
};

export default AdminPage;
