import cljx from 'clsx';
import styles from './Detail.module.css';
import { Container, Wrapper } from '../Layout';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { useUser, useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { Contador } from '@/components/Contador';
import { CommentList } from '@/components/CommentList';
import { Commenter } from '@/components/Commenter';

const Detailrelation = ({ RelationKey, RelationRecord }) => {
  //const user = useUser(RelationRecord.idUt);
  const user = useCurrentUser();
  //const data2 = JSON.parse(!!query);
  //console.log(data2.Record.notas);
  //query = JSON.parse(query);
  // console.log('u: ' + JSON.stringify(user2.data.user.username));
  return (
    <Wrapper>
      <div className={cljx(styles.root)}>
        <Container>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <td className={styles.td2} colSpan="2">
                <Link href={`/user/${user.username}`}>
                  <a>
                    <Container className={styles.creator}>
                      <Avatar
                        size={36}
                        url={user.profilePicture}
                        username={user.username}
                      />
                      <Container column className={styles.meta}>
                        <p className={styles.name}>{user.data.user.name}</p>
                        <p className={styles.username}>
                          {user.data.user.username}
                        </p>
                      </Container>
                    </Container>
                  </a>
                </Link>
              </td>
              <td className={styles.count} rowSpan="3">
                <Contador eKey={RelationKey} />
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td2} colSpan="2">
                Descrição: {RelationRecord.desc}
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td2}>
                Transação entre:
                <label className={styles.content2}>
                  {' '}
                  {RelationRecord.entidade} -{' '}
                </label>
                <label className={styles.content2}>
                  {' '}
                  {RelationRecord.entidade2}{' '}
                </label>
              </td>
              <td className={styles.td3}>
                Tipo Relação:{' '}
                <label className={styles.content2}>
                  {RelationRecord.tipoRel}{' '}
                </label>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.tddesc} colSpan="3">
                Nota: {RelationRecord.notas}
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.tdre} colSpan="3">
                {RelationRecord.dataRegisto}
              </td>
            </tr>
          </table>
        </Container>
      </div>
      <Link passHref href="/relations">
        <Button className={styles.botao}> Voltar </Button>
      </Link>
      <Commenter user={user} eKey={RelationKey} />
      <CommentList eKey={RelationKey} />
    </Wrapper>
  );
};

export default Detailrelation;
