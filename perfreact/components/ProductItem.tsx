import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import { AddProdutcToWishListProps } from './AddProdutcToWishList';

const AddProdutcToWishList = dynamic<AddProdutcToWishListProps>(() => {
  return import('./AddProdutcToWishList').then(nod => nod.AddProdutcToWishList);
}, {
  loading: () => <span>Carregando...</span>
});

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
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormated}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddProdutcToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});