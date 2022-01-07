import { LoadingDots } from '@/components/LoadingDots';
import cljx from 'clsx';
import { forwardRef } from 'react';
import styles from './Contador.module.css';
import { useRelaVoto } from '@/lib/relationsVoto';

//endpoint que lhe passas um id

const Contador = ( {eKey}) => {
  const { data } = useRelaVoto();
  const posts = data
    ? data.reduce((acc, person) => [...acc, person.resu], [])
    : [];

  //console.log(posts.Record.filter((item) => item.Record.estadoVoto === '0').length);
 // console.log(posts);

  return (
    <td className={styles.count} rowSpan="3">
      <i className={cljx('fa fa-sort-asc', styles.voto)}></i>
      <p>Número contador</p>
      <i className={cljx('fa fa-sort-desc', styles.voto)}></i>
    </td>
  );
};

export default Contador;
