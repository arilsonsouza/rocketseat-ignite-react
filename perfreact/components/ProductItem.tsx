type Product = {
  id: number;
  price: number;
  title: string;
}

type ProductItemProps = {
  product: Product
}

export function ProductItem({ product }: ProductItemProps): JSX.Element {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  );
}