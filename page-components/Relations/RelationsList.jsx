'use strict';
import { Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Relation } from '@/components/Relation';
import styles from './RelationsList.module.css';
import { useRelaPages } from '@/lib/relations';
import React, { useState, useEffect } from 'react';

// const items = [];

const RelaList = () => {
  const { data } = useRelaPages();

  const [searchValue, setSearch] = useState();
  let posts = data
    ? data.reduce((acc, person) => [...acc, person.resu], [])
    : [];

  const [filteredResult, setfilteredResult] = useState([]);

  function filterItems(query) {
    return data[0].resu.filter(function (el) {
      return el.Record.desc.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  useEffect(() => {
    if (searchValue) {
      onChangeSearch(searchValue);
    }
  }, [searchValue]);

  const onChangeSearch = (value) => {
    let result = [{}];

    result[0] = filterItems(value);

    if (result[0] === undefined || result[0].length === 0) {
      setfilteredResult([]);
    } else {
      setfilteredResult(result);
    }
  };

  return (
    <div className={styles.root}>
      <input
        id="search"
        onChange={(e) => {
          e.preventDefault();
          setSearch(e.target.value);
          if (e.target.value === '') {
            setfilteredResult([]);
          }
        }}
        value={searchValue || ''}
      />
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {filteredResult.length === 0
          ? posts.map((relation) => (
              <div key={relation.Key} className={styles.wrap}>
                <Relation className={styles.post} relation={relation} />
              </div>
            ))
          : filteredResult.map((relation) => (
              <div key={relation.Key} className={styles.wrap}>
                <Relation className={styles.post} relation={relation} />
              </div>
            ))}
      </Wrapper>
    </div>
  );
};

export default RelaList;
