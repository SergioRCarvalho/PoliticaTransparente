import { Spacer } from '@/components/Layout';
import styles from './Feed.module.css';
import PosterRelation from './PosterRelation';
import RelationsList from './RelationsList';

export const Relations = () => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <PosterRelation />
      <RelationsList />
    </div>
  );
};
