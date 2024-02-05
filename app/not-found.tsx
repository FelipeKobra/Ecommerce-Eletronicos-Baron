import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl">Está Perdido<span className="animate-bounce inline-block">?</span> </h1>
      <h2 className="text-3xl">Encontre-se na Página Inicial</h2>
      <Link className="link link-hover link-primary text-3xl" href="/">
        Clique Aqui!
      </Link>
    </div>
  );
}
