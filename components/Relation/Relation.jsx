import { Container } from '@/components/Layout';
import cljx from 'clsx';
import Link from 'next/link';
import styles from './Relation.module.css';
import 'font-awesome/css/font-awesome.min.css';

const Relation = ({ relation, className }) => {
  return relation.map((e) => (
    <div key={e.Key} className={cljx(styles.root, className)}>
      <Container>
        <table className={styles.table}>
          <tr className={styles.tw}>
            <Link href={`/user/333/post/3`} passHref>
              <td className={styles.td}>
                Descricao da relação: {e.Record.desc}
              </td>
            </Link>
            <td className={styles.w} rowSpan="2">
              <i className={cljx('fa fa-sort-asc', styles.voto)}></i>
              <p>Número contador</p>
              <i className={cljx('fa fa-sort-desc', styles.voto)}></i>
            </td>
          </tr>
          <Link href={`/user/333/post/3`} passHref>
            <tr className={styles.tr}>
              <td className={styles.td}>
                <label className={styles.content}>Transação entre </label>
                <label className={styles.content2}>
                  Entidade {e.Record.entidade} -{' '}
                </label>
                <label className={styles.content2}>
                  {' '}
                  Entidade {e.Record.entidade2}{' '}
                </label>
                <p className={styles.content}>
                  Tipo Relação:{' '}
                  <label className={styles.content2}> {e.Record.tipoRel}</label>
                </p>
                <td>
                  <label className={styles.content}>
                    Data registo:{' '}
                    <label className={styles.content2}>
                      {e.Record.dataRegisto}
                    </label>
                  </label>
                </td>
              </td>
            </tr>
          </Link>
        </table>
      </Container>
    </div>
  ));
};

export default Relation;
