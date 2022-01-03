import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Relation.module.css';

const Relation = ({ relation, className }) => {
  var contentKeys = Object.keys(relation);
  return (
    relation.map((e) => (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
        <p className={styles.content}>{e.Record.desc}</p>
      </div>
    </div>
  )));
};

export default Relation;