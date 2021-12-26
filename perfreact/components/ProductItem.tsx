import { memo } from 'react';

type Product = {
  id: number;
  price: number;
  title: string;
  priceFormated: string;
}

type ProductItemProps = {
  product: Product;
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps): JSX.Element {
  return (
    <div>
      {product.title} - <strong>{product.priceFormated}</strong>
      <button onClick={() => onAddToWishList(product.id)}>
        Add to wish list
      </button>
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});