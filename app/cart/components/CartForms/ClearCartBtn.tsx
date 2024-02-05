interface ClearCartBtn {
  removeStorage: (key: string) => void;
  cartSize: number;
}
export default function ClearCartBtn({
  removeStorage,
  cartSize,
}: ClearCartBtn) {
  return (
    cartSize > 0 && (
      <>
        <button
          onClick={() => removeStorage("Cart")}
          className="btn btn-outline text-lg"
        >
          Limpar Carrinho
        </button>
      </>
    )
  );
}
