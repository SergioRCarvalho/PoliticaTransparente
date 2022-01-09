import cljx from 'clsx';
import { Button } from '@/components/Button';
import styles from './Contador.module.css';
import { useRelaVoto } from '@/lib/relationsVoto';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';

//endpoint que lhe passas um id

const Contador = ({ eKey }) => {
  const { data } = useRelaVoto(eKey);
  const posts = data
    ? data.reduce((acc, person) => [...acc, person.resu], [])
    : [];
  var count = '';

  const { mutate } = useRelaVoto();
  const [isLoading, setIsLoading] = useState(false);
  const contentEntA = useRef();
  const contentEntB = useRef();

  const onSubmitup = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/relationVoto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            voto: '1',
            idRelation: eKey.toString(),
          }),
        });
        toast.success('You have posted successfully');
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );


  const onSubmitdown = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/relationVoto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            voto: '-1',
            idRelation: eKey.toString(),
          }),
        });
        toast.success('You have posted successfully');
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );


  if (posts.length != 0) {
    count =
      posts[0].filter((item) => item.Record.estadoVoto === '1').length -
      posts[0].filter((item) => item.Record.estadoVoto === '-1').length;
  } else {
    count = 0;
  }
  //console.log(posts[0].filter((item) => item.Record.estadoVoto === '0').length);
  // posts[0].filter((item) =>console.log(item.Record.estadoVoto));
  return (
    <>
      <form onSubmit={onSubmitup}>
        <Button type="success">
          <i className={cljx('fa fa-sort-asc', styles.voto)}></i>
        </Button>
      </form>
      <p>{count}</p>
      <form onSubmit={onSubmitdown}>
      <Button type="success">
      <i className={cljx('fa fa-sort-desc', styles.voto)}></i>
      </Button>
      </form>
    </>
  );
};

export default Contador;
