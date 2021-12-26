import { ProductItem } from './ProductItem';

type Product = {
  id: number;
  price: number;
  title: string;
  priceFormated: string;
}

type SearchResultsProps = {
  results: Product[];
  totalPrice: number;
  onAddToWishList: (id: number) => void;
}

export function SearchResults({ results, totalPrice, onAddToWishList }: SearchResultsProps): JSX.Element {


  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map(product => (
        <ProductItem
          product={product} key={product.id}
          onAddToWishList={onAddToWishList}
        />
      ))}
    </div>
  );
}