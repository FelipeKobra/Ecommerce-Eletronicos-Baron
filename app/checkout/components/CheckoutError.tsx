export default function CheckoutError() {
  return (
    <div className="text-center w-1/2 mx-auto my-auto text-3xl alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-40 w-40"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>
        Ocorreu algum erro durante a requisição, verifique se está logado e
        tente novamente
      </span>
    </div>
  );
}
