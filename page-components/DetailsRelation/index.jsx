import { Container, Spacer, Wrapper } from '@/components/Layout';
import styles from './Detailrelation.module.css';
import { Detailrelation } from '@/components/Detailrelation';

export const DetailsRelation = () => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Wrapper>
        <div className={styles.wrap}>
          <Detailrelation />
        </div>
      </Wrapper>
    </div>
  );
};
