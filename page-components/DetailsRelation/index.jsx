import { Container, Spacer, Wrapper } from '@/components/Layout';
import styles from './Feed.module.css';
import { Detailrelation } from '@/components/Detailrelation';
import Commenter from './Commenter';
import CommentList from './CommentList';

export const DetailsRelation = () => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Wrapper>
      <div className={styles.wrap}>
        <Detailrelation/>
      </div>
      <Commenter />
      <CommentList post={'61c2a94970aea0571034056d'} />
      </Wrapper>
    </div>
  );
};
