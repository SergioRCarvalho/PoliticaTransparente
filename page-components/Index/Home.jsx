import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import styles from './Home.module.css';

const Home = () => {
  return (
    <Wrapper>
      <div>
        <h1 className={styles.title}>
          <span className={styles.mongodb}>Politica</span>
          <span>Transparente</span>
        </h1>
        <Container justifyContent="center" className={styles.buttons}>
          <Spacer axis="horizontal" size={1} />
          <Container>
            <Link passHref href="/relations">
              <ButtonLink className={styles.button}>
                Explore Relations
              </ButtonLink>
            </Link>
          </Container>
          <Spacer axis="horizontal" size={1} />
        </Container>
        <p className={styles.subtitle}>Politica Transparente</p>
      </div>
    </Wrapper>
  );
};

export default Home;
