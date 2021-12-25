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
  return (
    <div>
      {results.map(product => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}