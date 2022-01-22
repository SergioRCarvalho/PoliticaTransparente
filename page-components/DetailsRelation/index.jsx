import { Container, Spacer, Wrapper } from '@/components/Layout';
import styles from './Detailrelation.module.css';
import { Detailrelation } from '@/components/Detailrelation';

export const DetailsRelation = ({ RelationKey, RelationRecord }) => {
  return (
    <div>
      <Spacer size={1} axis="vertical" />
      <Wrapper>
        <div className={styles.wrap}>
          <Detailrelation
            RelationKey={RelationKey}
            RelationRecord={RelationRecord}
          />
        </div>
      </Wrapper>
    </div>
  );
};
