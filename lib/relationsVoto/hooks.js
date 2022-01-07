import { fetcher } from '@/lib/fetch';
import useSWRInfinite from 'swr/infinite';

export function useRelaVoto() {
  const { data, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      return `/api/relationVoto`;
    },
    fetcher,
    {
      refreshInterval: 50000,
      revalidateAll: false,
    }
  );
  return {
    data,
    ...props,
  };
}
