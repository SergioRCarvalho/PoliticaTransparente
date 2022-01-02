import { Spacer } from '@/components/Layout';
import styles from './Feed.module.css';
import Poster from './Poster';
import RelationsList from './RelationsList';

export const Relations = () => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Poster />
      <RelationsList />
    </div>
  );
};
