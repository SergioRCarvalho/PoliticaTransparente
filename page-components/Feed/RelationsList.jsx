'use strict';
import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Post } from '@/components/Post';
import { Text } from '@/components/Text';
import { usePostPages } from '@/lib/post';
import Link from 'next/link';
import styles from './PostList.module.css';
import { zeze } from 'dist/relations';
import { useRelaPages } from '@/lib/relations';

const RelaList = () => {
  const { data } = useRelaPages();
  const posts = data;
  console.log(`ola : ${JSON.stringify(data)}`);
  //JSON.stringify(data);
  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>{JSON.stringify(data)}</Wrapper>
    </div>
  );
};

export default RelaList;
