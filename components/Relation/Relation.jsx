import { Container } from '@/components/Layout';
import { Avatar } from '@/components/Avatar';
import { Contador } from '@/components/Contador';
import { useCurrentUser } from '@/lib/user';
import cljx from 'clsx';
import Link from 'next/link';
import styles from './Relation.module.css';
import 'font-awesome/css/font-awesome.min.css';

const Relation = ({ relation, className }) => {
  const { data, error } = useCurrentUser();
  return relation.map((e) => (
    <div key={e.Key} className={cljx(styles.root, className)}>
      <Container>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <td className={styles.td2}>
              <Link href={`/user/${data.user.username}`}>
                <a>
                  <Container className={styles.creator}>
                    <Avatar
                      size={36}
                      url={data.user.profilePicture}
                      username={data.user.username}
                    />
                    <Container column className={styles.meta}>
                      <p className={styles.name}>{data.user.name}</p>
                      <p className={styles.username}>{data.user.username}</p>
                    </Container>
                  </Container>
                </a>
              </Link>
            </td>
            <Link href={`/detailrelation`} passHref>
              <td className={styles.tddesc} rowSpan="2">
                {e.Record.desc}
              </td>
            </Link>
            <Contador></Contador>
          </tr>
          <tr className={styles.tr}></tr>
          <Link href={`detailrelation`} passHref>
            <tr className={styles.tr}>
              <td className={styles.td2}>
                <p className={styles.content}>
                  Tipo Relação:{' '}
                  <label className={styles.content2}> {e.Record.tipoRel}</label>
                </p>
                <label className={styles.content}>Transação entre </label>
                <label className={styles.content2}>
                  Entidade {e.Record.entidade} -{' '}
                </label>
                <label className={styles.content2}>
                  {' '}
                  Entidade {e.Record.entidade2}{' '}
                </label>
              </td>

              <td className={styles.tdre}>
                <label className={styles.content}>
                  Data registo:{' '}
                  <label className={styles.content2}>
                    {e.Record.dataRegisto}
                  </label>
                </label>
              </td>
            </tr>
          </Link>
        </table>
      </Container>
    </div>
  ));
};

export default Relation;
