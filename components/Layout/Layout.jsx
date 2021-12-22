import Head from 'next/head';
import Footer from './Footer';
import styles from './Layout.module.css';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Politica Transparente</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="Politica transparente" />
        <meta property="og:title" content="Politica transparente" />
        <meta property="og:description" content="Politica transparente" />
        <meta
          property="og:image"
          content="https://cdn-icons-png.flaticon.com/512/3079/3079311.png"
        />
      </Head>
      <Nav />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
