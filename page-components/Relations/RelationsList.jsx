'use strict';
import { Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Relation } from '@/components/Relation';
import styles from './RelationsList.module.css';
import { useRelaPages } from '@/lib/relations';
import React, { useState, useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';

// const items = [];

const RelaList = () => {
  const { data } = useRelaPages();

  const [searchValue, setSearch] = useState();
  let posts = data
    ? data.reduce((acc, person) => [...acc, person.resu], [])
    : [];

  const descserarch = useRef();

  const [filteredResult, setfilteredResult] = useState([]);

  function filterItems(query) {
    return data[0].resu.filter(function (el) {
      return el.Record.desc.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  function getDesc() {
    if (data) {
      return data[0].resu.map(function (el) {
        return el.Record.desc;
      });
    }
    return [{}];
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
      <Stack spacing={1} sx={{ width: 300, paddingTop: 2, marginLeft: 25 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={getDesc()}
          renderInput={(params) => (
            <TextField
              ref={descserarch}
              id="input-with-icon-adornment"
              {...params}
              label="Procurar"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value);
                if (e.target.value === '') {
                  setfilteredResult([]);
                }
              }}
            />
          )}
        />
      </Stack>
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
