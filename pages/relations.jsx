import { Relations } from '@/page-components/Relations';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';


const RelationsPage = () => {
  return (
    <>
      <Head>
        <title>Relations</title>
      </Head>
      <Relations />
    </>
  );
};


export default RelationsPage;
