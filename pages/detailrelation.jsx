import { DetailsRelation } from '@/page-components/DetailsRelation';
import Head from 'next/head';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import customtheme from '@/page-components/Relations/theme';
import styles from './box.module.css';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

const actions = [
  { icon: <EditIcon />, name: 'Editar' },
  { icon: <DeleteIcon />, name: 'Eliminar' },
];

const DetailRelationPage = () => {
  return (
    <>
      <Head>
        <title>DetailsRelation</title>
      </Head>
      <div>
        <Box
          className={styles.box}
          sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon theme={customtheme} color="primary" />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>
      </div>
      <DetailsRelation />
    </>
  );
};

export default DetailRelationPage;
