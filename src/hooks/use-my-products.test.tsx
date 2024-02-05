import { render, waitFor } from '@testing-library/react';
import { useMyProducts, UseProductsOutput } from './use-my-products';
import { mswServer } from '../api/msw-server';
import { ApolloWrapper } from '../api/apollo-wrapper';
import { productsResponseHandler } from '../api/products/mocks/handlers';

function UseMyProductsTestComponent({
  spy,
}: {
  spy: ({ myProducts, loading, refetch }: UseProductsOutput) => void;
}) {
  const { myProducts, loading, refetch } = useMyProducts();
  spy({ myProducts, loading, refetch });
  return <div>hello world</div>;
}

function renderTestComponent(
  spy: ({ myProducts, loading, refetch }: UseProductsOutput) => void
) {
  return render(<UseMyProductsTestComponent spy={spy} />, {
    wrapper: ApolloWrapper,
  });
}

describe('useMyProducts', () => {
  beforeEach(() => {
    mswServer.use(productsResponseHandler);
  });
  it('should correctly return fetched products', async () => {
    const expectedProducts = [
      {
        id: 'product-id',
        name: 'Sample Product Name',
        description: 'Description For Sample Product',
      },
    ];
    const spy = jest.fn();
    renderTestComponent(spy);
    await waitFor(() => {
      expect(spy).toHaveBeenNthCalledWith(1, {
        myProducts: [],
        loading: true,
        refetch: expect.any(Function),
      });
      expect(spy).toHaveBeenNthCalledWith(2, {
        myProducts: expectedProducts,
        loading: true,
        refetch: expect.any(Function),
      });
    });
  });
});
