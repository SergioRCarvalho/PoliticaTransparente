import { DetailsRelation } from '@/page-components/DetailsRelation';
import Head from 'next/head';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import customtheme from '@/page-components/Relations/theme';
import styles from './box.module.css';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useCurrentUser } from '@/lib/user';
import { useRelaVoto } from '@/lib/relationsVoto';
import { withRouter } from 'next/router';

const actions = [
  { icon: <EditIcon />, name: 'Editar' },
  { icon: <DeleteIcon />, name: 'Eliminar' },
];

const DetailRelationPage = ({ className, router: { query } }) => {
  const { data, error } = useCurrentUser();
  const user_id = data.user._id;
  const data2 = JSON.parse(query?.dataRelation);
  const user_relation = data2.Record.idUt;
  console.log(user_id);
  console.log(data2.Record.idUt);

  let fab = false;
  if (user_id == user_relation) {
    fab = true;
  }
  // console.log(data);
  // console.log();
  return (
    <>
      <Head>
        <title>DetailsRelation</title>
      </Head>
      <div>
        <Box
          style={{ visibility: fab ? 'visible' : 'hidden' }}
          className={styles.box}
          sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<MoreVertIcon />}
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
      <DetailsRelation query={data2} />
    </>
  );
};

export default withRouter(DetailRelationPage);
