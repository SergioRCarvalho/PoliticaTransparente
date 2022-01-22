import { Container } from '@/components/Layout';
import { Avatar } from '@/components/Avatar';
import { Contador } from '@/components/Contador';
import { useCurrentUser, useUser } from '@/lib/user';
import cljx from 'clsx';
import Link from 'next/link';
import styles from './Relation.module.css';
import 'font-awesome/css/font-awesome.min.css';

const Relation = ({ relation, className }) => {
  const user = useUser(relation[0].Record.idUt).data.user;
  return relation.map((e) => (
    <div key={e.Key} className={cljx(styles.root, className)}>
      <Container>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <td className={styles.td2}>
              <a>
                <Container className={styles.creator}>
                  <Avatar
                    size={36}
                    url={user.profilePicture}
                    username={user.username}
                  />
                  <Container column className={styles.meta}>
                    <p className={styles.name}>{user.name}</p>
                    <p className={styles.username}>{user.username}</p>
                  </Container>
                </Container>
              </a>
            </td>
            <Link
              href={{
                pathname: '/detailrelation',
                query: {
                  key: JSON.stringify(e.Key),
                  record: JSON.stringify(e.Record),
                },
              }}
              passHref
            >
              <td className={styles.tddesc} rowSpan="2">
                {e.Record.desc}
              </td>
            </Link>
            <td className={styles.count} rowSpan="3">
              <Contador eKey={e.Key} uKey={e.Record.idUt} />
            </td>
          </tr>
          <tr className={styles.tr}></tr>
          <Link
            href={{
              pathname: '/detailrelation',
              query: {
                key: JSON.stringify(e.Key),
                record: JSON.stringify(e.Record),
              },
            }}
            passHref
          >
            <tr className={styles.tr}>
              <td className={styles.td2}>
                Tipo Relação:{' '}
                <label className={styles.content2}> {e.Record.tipoRel}</label>
                <br />
                Transação entre{' '}
                <label className={styles.content2}>
                  Entidade {e.Record.entidade} -{' '}
                </label>
                <label className={styles.content2}>
                  {' '}
                  Entidade {e.Record.entidade2}{' '}
                </label>
              </td>

              <td className={styles.tdre}>
                <label className={styles.content2}>
                  {e.Record.dataRegisto}
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
