import { Avatar } from '@/components/Avatar';
import * as React from 'react';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import TextField from '@mui/material/TextField';
import { fetcher } from '@/lib/fetch';
import { useRelaPages } from '@/lib/relations';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './EditRelation.module.css';
import { Input, Textarea } from '@/components/Input';
import { useRouter } from 'next/router';

const PosterInner = ({ RelationKey, RelationRecord }) => {
  let user = useCurrentUser();
  if (useCurrentUser().data.user == null) {
    user = [
      {
        data: {
          user: {
            _id: '61ef044b85f3c05689e6583f',
            profilePicture:
              'https://res.cloudinary.com/dpndhlh5l/image/upload/v1640229758/sample.jpg',
            name: 'Silvas',
            username: 'henriques',
            bio: '',
          },
        },
      },
    ];
    user = user[0];
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const contentEntA = useRef();
  const contentEntB = useRef();
  const contentTP = useRef();
  const contentTR = useRef();
  const contentNR = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    // console.log('value: ' + contentEntA.current.value);
    try {
      setIsLoading(true);
      await fetcher('/api/relations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enta: contentEntA.current.value,
          entb: contentEntB.current.value,
          titulo: contentTR.current.value,
          tipo: contentTP.current.value,
          nota: contentNR.current.value,
          id: RelationKey,
          date: RelationRecord.dataRegisto,
        }),
      });
      toast.success('Relação Editada');
      handleClose.true;
      const dataquery = {
        dataRegisto: RelationRecord.dataRegisto,
        tipoRel: contentTP.current.value,
        entidade: contentEntA.current.value,
        entidade2: contentEntB.current.value,
        idUt: user.data.user._id,
        notas: contentNR.current.value,
        desc: contentTR.current.value,
      };
      router.push({
        pathname: '/detailrelation',
        query: {
          key: JSON.stringify(RelationKey),
          record: JSON.stringify(dataquery),
        },
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <Container className={styles.poster}>
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
        </Container>
        <Container className={styles.poster}>
          <Input
            ref={contentEntA}
            className={styles.input}
            label="Inserir entidade A"
            defaultValue={RelationRecord.entidade}
            required
          />
          <Input
            ref={contentEntB}
            className={styles.input}
            label="Inserir entidade B"
            required
            defaultValue={RelationRecord.entidade2}
          />
          <Input
            ref={contentTP}
            className={styles.input}
            label="Tipo de relação"
            defaultValue={RelationRecord.tipoRel}
            required
          />
        </Container>

        <Container className={styles.poster2}>
          <Input
            ref={contentTR}
            className={styles.input}
            label="Inserir titulo da relação"
            defaultValue={RelationRecord.desc}
            required
          />
          <Button type="success" className={styles.botao} loading={isLoading}>
            Submeter
          </Button>
        </Container>
        <Container>
          <Textarea
            placeholder="Inserir nota"
            ref={contentNR}
            className={styles.input}
            defaultValue={RelationRecord.notas}
            label="Nota da relação"
            required
          />
        </Container>
      </div>
    </form>
  );
};

export default PosterInner;
