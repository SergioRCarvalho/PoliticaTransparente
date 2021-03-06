import { fetcher } from '@/lib/fetch';
import useSWRInfinite from 'swr/infinite';

export function useRelaDetail({ query } = {}) {
  const { data, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      return `/api/relations`;
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
