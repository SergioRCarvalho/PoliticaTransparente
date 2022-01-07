import cljx from 'clsx';
import styles from './Contador.module.css';
import { useRelaVoto } from '@/lib/relationsVoto';

//endpoint que lhe passas um id

const Contador = ({ eKey }) => {
  const { data } = useRelaVoto();
  const posts = data
    ? data.reduce((acc, person) => [...acc, person.resu], [])
    : [];

  //console.log(posts.Record.filter((item) => item.Record.estadoVoto === '0').length);
  // console.log(posts);

  return (
    <>
      <i className={cljx('fa fa-sort-asc', styles.voto)}></i>
      <p>Número contador</p>
      <i className={cljx('fa fa-sort-desc', styles.voto)}></i>
    </>
  );
};

export default Contador;
