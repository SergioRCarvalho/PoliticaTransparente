'use strict';
import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Relation } from '@/components/Relation';
import { Text } from '@/components/Text';
import { usePostPages } from '@/lib/post';
import Link from 'next/link';
import styles from './RelationsList.module.css';

import { useRelaPages } from '@/lib/relations';
import stringify from 'fast-json-stable-stringify';

const RelaList = () => {
  const { data } = useRelaPages();

  const people = [
    { id: "1", desc: "Leigh", age: 35 },
    { id: "2", desc: "Jenny", age: 30 },
    { id: "3", desc: "Heather", age: 28 },
  ];
  const posts =people
  ? people.reduce((acc, person) => [...acc, person], []):[];
  /*const posts =people
  ? people.reduce((acc, person) => [...acc, person], []):[];*/

  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      { <Wrapper>{JSON.stringify(data)}</Wrapper> }

      {posts.map((relation) => (
          <Link
            key={'45'}
            href={``}
            passHref
          >
            <div className={styles.wrap}>
              <Relation className={styles.post} relation={relation} />
            </div>
          </Link>
        ))}
    </div>
  );
};

export default RelaList;
