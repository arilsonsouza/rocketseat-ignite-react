import { useMemo } from 'react';
import { ProductItem } from './ProductItem';

type Product = {
  id: number;
  price: number;
  title: string;
}

type SearchResultsProps = {
  results: Product[]
}

export function SearchResults({ results }: SearchResultsProps): JSX.Element {
  const totalPrice = useMemo(() => {
    return results.reduce((acc, product) => acc + product.price, 0)
  }, [results]);

  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map(product => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}