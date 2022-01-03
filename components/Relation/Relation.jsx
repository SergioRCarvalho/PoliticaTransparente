/* eslint-disable react/jsx-key */
import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import cljx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Relation.module.css';
import 'font-awesome/css/font-awesome.min.css';

const Relation = ({ relation, className }) => {
  var contentKeys = Object.keys(relation);
  return relation.map((e) => (
    <div className={cljx(styles.root, className)}>
      <Container>
        {/* <p className={styles.name}>{e.Record.desc}</p><br/>
        <label className={styles.content}>Entidade A: </label><text className={styles.content}>{e.Record.entidade} - </text>
        <label className={styles.content}> Entidade B: </label><text className={styles.content}>{e.Record.entidade2}</text><br/><br/>
        <label className={styles.name}>Tipo Relação: </label><text className={styles.content}>{e.Record.tipoRel}</text><br/>
        <p className={styles.wrap}>{e.Record.dataRegisto}</p> */}
        <table className={styles.table}>
          <tr className={styles.tw}>
            <Link key={'45'} href={`/user/333/post/3`} passHref>
              <td className={styles.td}>
                Descricao da relação: {e.Record.desc}
              </td>
            </Link>
            <td className={styles.w} rowSpan="2">
              <i className={cljx("fa fa-sort-asc",styles.voto)}></i>
              <p>Número contador</p>
              <i className={cljx("fa fa-sort-desc",styles.voto)}></i>
            </td>
          </tr>
          <Link key={'45'} href={`/user/333/post/3`} passHref>
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
