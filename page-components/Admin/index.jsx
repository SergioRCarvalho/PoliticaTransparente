import { Container, Spacer, Wrapper } from '@/components/Layout';
import styles from './admin.module.css';
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@/components/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Input } from '@/components/Input';
import { useCallback, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetcher } from '@/lib/fetch';
import { useUsers } from '@/lib/user';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true,
  },
  {
    field: 'emailVerified',
    headerName: 'Email Verificado',
    width: 150,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 150,
    editable: true,
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
    editable: true,
  },
  {
    field: 'tipo',
    headerName: 'Utilizador',
    width: 150,
    editable: true,
  },
];

let rows = [
  {
    id: 1,
    email: 'henriquesa@ipvc.pt',
    emailVerified: false,
    name: 'joel',
    username: 'henriquesa',
    tipo: 'cidadao;henriquesa',
  },
  {
    id: 2,
    email: 'joelsilva-128@hotmail.com',
    emailVerified: false,
    name: 'Silva',
    username: 'joel',
    tipo: 'cidadao;joel',
  },
  {
    id: 3,
    email: 'user@gmail.com',
    emailVerified: false,
    name: 'João Almeida',
    username: 'joaozinho',
    tipo: 'cidadao;joaozinho',
  },
  {
    id: 4,
    email: 'nuno@gmail.com',
    emailVerified: false,
    name: 'Nuno Costa',
    username: 'nuninho',
    tipo: 'cidadao;nuninho',
  },
  {
    id: 5,
    email: 'rita@gmail.com',
    emailVerified: false,
    name: 'Rita Joana',
    username: 'ritinha',
    tipo: 'cidadao;ritinha',
  },
  {
    id: 6,
    email: 'pedro@gmail.com',
    emailVerified: false,
    name: 'Pedro Matos',
    username: 'pedrinho',
    tipo: 'cidadao;pedrinho',
  },
  {
    id: 7,
    email: 'henrique@ipvc.pt',
    emailVerified: false,
    name: 'henrique Silva',
    username: 'henrique',
    tipo: 'cidadao;henrique',
  },
  {
    id: 8,
    email: 'joaooaoj@sapo.pt',
    emailVerified: false,
    name: 'João Tiago Passos',
    username: 'passos_joao',
    tipo: 'credenciado;Passos_João',
  },
  {
    id: 9,
    email: 'administrador@gmail.pt',
    emailVerified: false,
    name: 'Administrador',
    username: 'superadmin',
    tipo: 'admin;superadmin',
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Admin = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log('use =' + JSON.stringify(useUsers().data.user[0]._id));
  //const [user2, useUsers] = useState(false);

  const { user } = useUsers();

  let i = 1;

  // user.data.user.map((e) => rows.push('id: ' + i, e.username), i++);
  // console.log(JSON.stringify('row: ' + user));

  const InputUsername = useRef();
  const InputName = useRef();
  const InputPassword = useRef();
  const InputEmail = useRef();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const insertMemb = useCallback(async (e) => {
    e.preventDefault();
    try {
      await fetcher('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: InputEmail.current.value,
          name: InputName.current.value,
          password: InputPassword.current.value,
          username: InputUsername.current.value,
        }),
      });
      toast.success('Your account has been created');
    } catch (e) {
      toast.error(e.message);
    }
  });

  /*  if (user2 === undefined) {
    return <>Still loading...</>;
  }*/

  return (
    <div>
      <Spacer size={1} axis="vertical" />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label=" Lista de utilizadores " {...a11yProps(0)} />
            <Spacer size={1} axis="horizontal" />
            <Tab label=" Atividade das relações " {...a11yProps(1)} />
            <Spacer size={1} axis="horizontal" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Container className={styles.buttons}>
            <Container>
              <Button onClick={handleClickOpen} className={styles.button}>
                Adicionar{' '}
              </Button>
            </Container>
            <Spacer axis="horizontal" size={1} />

            <Container>
              <Button onClick={handleClickOpen2} className={styles.button}>
                Eliminar
              </Button>
            </Container>
          </Container>
          <Spacer size={1} axis="vertical" />
          <Wrapper>
            <div className={styles.wrap}>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            </div>
          </Wrapper>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Container className={styles.buttons}>
            <Container>
              <Button onClick={handleClickOpen} className={styles.button}>
                Adicionar{' '}
              </Button>
            </Container>
            <Spacer axis="horizontal" size={1} />

            <Container>
              <Button onClick={handleClickOpen2} className={styles.button}>
                Eliminar
              </Button>
            </Container>
          </Container>
          <Spacer size={1} axis="vertical" />
          <Wrapper>
            <div className={styles.wrap}>
              <div style={{ height: 400, width: '100%' }}>dusch</div>
            </div>
          </Wrapper>
        </TabPanel>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Adicionar membro credênciado'}</DialogTitle>
        <DialogContent>
          <Container className={styles.poster}>
            <Input
              ref={InputUsername}
              className={styles.input}
              label="Inserir o username"
              required
            />
            <Input
              ref={InputName}
              className={styles.input}
              label="Inserir nome"
              required
            />
          </Container>
          <Container>
            <Input
              ref={InputPassword}
              htmlType="password"
              className={styles.input}
              label="Inserir password"
              required
            />

            <Input
              ref={InputEmail}
              htmlType="email"
              className={styles.input}
              label="Inserir email"
              required
            />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={insertMemb}>Submeter</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Eliminar membro?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p>Confirma que deseja eliminar o membro selecionado?</p>
            <p>Esta ação é irreversível.</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Sim</Button>
          <Button onClick={handleClose2}>Não</Button>
        </DialogActions>
      </Dialog>

      <Spacer size={1} axis="vertical" />
    </div>
  );
};

export default Admin;
