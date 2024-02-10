import Link from "next/link";

export default function CheckoutNoItem() {
  return (
    <div className="text-center w-full md:w-1/2  mx-auto my-[20rem] text-4xl alert alert-info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current shrink-0 w-40 h-40"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <Link href="/">
      <span className="hover:animate-pulse ">Adicione produtos no Carrinho para realizar o Checkout!</span>
      </Link>
    </div>
  );
}
