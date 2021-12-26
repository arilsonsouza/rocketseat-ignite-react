export type AddProdutcToWishListProps = {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export function AddProdutcToWishList({
  onAddToWishList,
  onRequestClose
}: AddProdutcToWishListProps): JSX.Element {
  return (
    <span>
      Deseja adicionar aos favoritos?
      <button onClick={onAddToWishList}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </span>
  );
}