import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Relation.module.css';

const Relation = ({ relation, className }) => {
  var contentKeys = Object.keys(relation);
  return (
    relation.map((e) => (
    <div className={clsx(styles.root, className)}>
      
      <div className={styles.wrap}>
        <p className={styles.name}>{e.Record.desc}</p><br/>
        <label className={styles.content}>Entidade A: </label><text className={styles.content}>{e.Record.entidade} - </text>
        <label className={styles.content}> Entidade B: </label><text className={styles.content}>{e.Record.entidade2}</text><br/><br/>
        <label className={styles.name}>Tipo Relação: </label><text className={styles.content}>{e.Record.tipoRel}</text><br/>
        <p className={styles.wrap}>{e.Record.dataRegisto}</p>
      </div>
    </div>
  )));
};

export default Relation;
