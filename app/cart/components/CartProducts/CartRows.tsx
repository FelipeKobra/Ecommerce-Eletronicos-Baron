export default function CartRows() {
  return (
    <div role="rowgroup" className="hidden lg:grid grid-cols-5 text-xl mt-10 mb-5 px-[4rem]">
      <div role="columnheader" className="col-span-2 justify-self-start">PRODUTO</div>
      <div role="columnheader" className="justify-self-center">PREÇO</div>
      <div role="columnheader" className="justify-self-center">QUANTIDADE</div>
      <div role="columnheader" className="justify-self-end">TOTAL</div>
    </div>
  );
}