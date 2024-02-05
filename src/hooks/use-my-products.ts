import { useEffect, useState } from 'react';
import { QueryResult, useQuery } from '@apollo/client';

import { GET_PRODUCTS } from '../api/products/gql';

export type Product = {
  id: string;
  name: string;
  description?: string | null;
};

export type UseProductsResponse = {
  products: Product[];
};

export type UseProductsOutput = {
  myProducts: Product[];
  refetch: CallableFunction;
  loading: boolean;
};

export function useMyProducts(): UseProductsOutput {
  const { data, refetch, loading }: QueryResult<UseProductsResponse> = useQuery(
    GET_PRODUCTS,
    {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      onCompleted: ({ products }) => {
        setMyProducts(products);
      },
    }
  );

  useEffect(() => {
    if (!loading && data?.products) setMyProducts(data?.products);
  });
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  return {
    myProducts,
    refetch,
    loading,
  };
}
