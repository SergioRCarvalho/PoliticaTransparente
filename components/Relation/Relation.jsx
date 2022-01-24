import { Container } from '@/components/Layout';
import { Avatar } from '@/components/Avatar';
import { Contador } from '@/components/Contador';
import { useCurrentUser, useUser, useUsers } from '@/lib/user';
import cljx from 'clsx';
import Link from 'next/link';
import styles from './Relation.module.css';
import 'font-awesome/css/font-awesome.min.css';

const Relation = ({ relation, className }) => {
  //const user = useUser(relation[0].Record.idUt);
  let user = useCurrentUser();
  if (useCurrentUser().data.user == null) {
    user = [
      {
        data: {
          user: {
            _id: '61c2687bf24b3ec21be49d16',
            profilePicture:
              'https://res.cloudinary.com/dpndhlh5l/image/upload/v1640229758/ddrnsd3rf2gfzvj34iz3.jpg',
            name: 'jjjsadj',
            username: 'jjjj',
            bio: 'sdfsdfsdf',
          },
        },
      },
    ];
    user = user[0];
  }
  // const { data } = useUser('61c2687bf24b3ec21be49d16');
  // console.log('user: ' + JSON.stringify(data));

  //console.log('ola' + JSON.stringify(user));

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
                    url={user.data.user.profilePicture}
                    username={user.data.user.username}
                  />
                  <Container column className={styles.meta}>
                    <p className={styles.name}>{user.data.user.name}</p>
                    <p className={styles.username}>{user.data.user.username}</p>
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
                  {e.Record.entidade} -{' '}
                </label>
                <label className={styles.content2}>
                  {' '}
                  {e.Record.entidade2}{' '}
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
