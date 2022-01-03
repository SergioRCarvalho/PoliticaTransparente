'use strict';
import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Relation } from '@/components/Relation';
import { Text } from '@/components/Text';
import Link from 'next/link';
import styles from './RelationsList.module.css';
import { useRelaPages } from '@/lib/relations';

const RelaList = () => {
  const { data } = useRelaPages();
  const posts = data
    ? data.reduce((acc, person) => [...acc, person.resu], [])
    : [];
  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
      {posts.map((relation) => (
          <div className={styles.wrap}>
            
            <Relation className={styles.post} relation={relation} />
          </div>
        
        
      ))}

      </Wrapper>
    </div>
    

  );
};

export default RelaList;
