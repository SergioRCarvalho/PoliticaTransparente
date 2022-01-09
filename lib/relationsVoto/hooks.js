import { fetcher } from '@/lib/fetch';
import useSWRInfinite from 'swr/infinite';

export function useRelaVoto(RelationId) {
  const { data, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      return `/api/relationVoto?id=${RelationId}`;
    },
    fetcher,
    {
      refreshInterval: 50000,
      revalidateAll: true,
    }
  );
  return {
    data,
    ...props,
  };
}
