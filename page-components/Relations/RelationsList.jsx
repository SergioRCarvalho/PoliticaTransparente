'use strict';
import { Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Relation } from '@/components/Relation';
import styles from './RelationsList.module.css';
import { useRelaPages } from '@/lib/relations';
import useSearch from 'react-hook-search';

const items = [];

const RelaList = () => {
  const { data } = useRelaPages();
  const posts = data
    ? data.reduce((acc, person) => [...acc, person.resu], [])
    : [];
  // posts.Record.desc
  posts.map((relation) => items.push(relation));

  const [filteredItems, search, setSearch] = useSearch(
    posts,
    (searchValue, item) => item[1].Record.desc.includes(searchValue)
  );
  //(searchValue, item) => item.includes(searchValue)
  return (
    <div className={styles.root}>
      <input value={search} onChange={setSearch} />
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {filteredItems.map((relation) => (
          <div key={relation.Key} className={styles.wrap}>
            <Relation className={styles.post} relation={relation} />
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default RelaList;
