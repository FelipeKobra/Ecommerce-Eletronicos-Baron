interface ProductInfo {
  categoria: string;
  brand: string;
  stock: number;
}

export default function ProductInfo({ categoria, brand, stock }: ProductInfo) {
  return (
    <>
      <p>
        <span className="text-base-content text-lg font-bold">Categoria:</span>{" "}
        {categoria}
      </p>
      <p>
        <span className="text-base-content text-lg font-bold">Marca:</span>{" "}
        {brand}
      </p>
      <p className={stock > 0 ? "text-green-400" : "text-red-400"}>
        {stock > 0 ? "Em Estoque: " + stock  : "Fora de Estoque"}
      </p>
    </>
  );
}
