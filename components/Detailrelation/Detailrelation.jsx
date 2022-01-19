import cljx from 'clsx';
import styles from './Detail.module.css';
import { Container, Wrapper } from '../Layout';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { Contador } from '@/components/Contador';
import { CommentList } from '@/components/CommentList';
import { Commenter } from '@/components/Commenter';
import { withRouter } from 'next/router';

const Detailrelation = ({ className, router: { query } }) => {
  const { data, error } = useCurrentUser();

  const data2 = JSON.parse(query?.dataRelation);
  //console.log(data2.Record.notas);

  return (
    <Wrapper>
      <div className={cljx(styles.root, className)}>
        <Container>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <td className={styles.td2} colSpan="2">
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
              <td className={styles.count} rowSpan="3">
                <Contador eKey={data2.Key} />
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td2} colSpan="2">
                Descrição: {data2.Record.desc}
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td2}>
                Transação entre:
                <label className={styles.content2}>
                  {' '}
                  {data2.Record.entidade} -{' '}
                </label>
                <label className={styles.content2}>
                  {' '}
                  {data2.Record.entidade2}{' '}
                </label>
              </td>
              <td className={styles.td3}>
                Tipo Relação:{' '}
                <label className={styles.content2}>
                  {data2.Record.tipoRel}{' '}
                </label>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.tddesc} colSpan="3">
                Nota: {data2.Record.notas}
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.tdre} colSpan="3">
                {data2.Record.dataRegisto}
              </td>
            </tr>
          </table>
        </Container>
      </div>
      <Link passHref href="/relations">
        <Button className={styles.botao}> Voltar </Button>
      </Link>
      <Commenter eKey={data2.Key} />
      <CommentList eKey={data2.Key} />
    </Wrapper>
  );
};

export default withRouter(Detailrelation);
