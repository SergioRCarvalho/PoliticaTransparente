import cljx from 'clsx';
import styles from './Detail.module.css';
import { Container, Wrapper } from '../Layout';
import { Avatar } from '@/components/Avatar';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { Contador } from '@/components/Contador';
import { withRouter } from 'next/router';

const Detailrelation = ({ className, router: { query } }) => {
  const { data, error } = useCurrentUser();

  const data2 = JSON.parse(query.dataRelation);
  //console.log(data2.Record.notas);

  return (
    <Wrapper>
      <div className={cljx(styles.root, className)}>
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
              <td className={styles.count} rowSpan="4">
                <Contador eKey={data2.Key} />
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td2}>Descrição: {data2.Record.desc}</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.tddesc}>Nota: {data2.Record.notas}</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td2}>
                <p className={styles.content}>
                  Tipo Relação: {data2.Record.tipoRel}
                  <label className={styles.content2}> </label>
                </p>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td2}>
                <label className={styles.content}>Transação entre: </label>
                <label className={styles.content}>
                  {data2.Record.entidade} -{' '}
                </label>
                <label className={styles.content}>
                  {' '}
                  {data2.Record.entidade2}{' '}
                </label>
              </td>
              <td className={styles.tdre}>{data2.Record.dataRegisto}</td>
            </tr>
          </table>
        </Container>
      </div>
    </Wrapper>
  );
};

export default withRouter(Detailrelation);
