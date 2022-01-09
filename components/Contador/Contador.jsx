import cljx from 'clsx';
import styles from './Contador.module.css';
import { useRelaVoto } from '@/lib/relationsVoto';

//endpoint que lhe passas um id

const Contador = ({ eKey }) => {
  const { data } = useRelaVoto(eKey);
  const posts = data
    ? data.reduce((acc, person) => [...acc, person.resu], [])
    : [];
  var count = '';
  if (posts.length != 0) {
    count =
      posts[0].filter((item) => item.Record.estadoVoto === '1').length -
      posts[0].filter((item) => item.Record.estadoVoto === '-1').length;
  } else {
    count = 0;
  }
  //console.log(posts[0].filter((item) => item.Record.estadoVoto === '0').length);
  // posts[0].filter((item) =>console.log(item.Record.estadoVoto));
  console.log(count);
  return (
    <>
      <i className={cljx('fa fa-sort-asc', styles.voto)}></i>
      <p>{count}</p>
      <i className={cljx('fa fa-sort-desc', styles.voto)}></i>
    </>
  );
};

export default Contador;
