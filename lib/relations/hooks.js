import { fetcher } from '@/lib/fetch';
import useSWRInfinite from 'swr/infinite';

export function useRelaPages() {
  const { data, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      return `/api/relations`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );
console.log(`zz : ${JSON.stringify(data)}`);
  return {
    data,
    ...props,
  };
}
