import Link from "next/link"

export default function NoItemPage() {
  return (
    <div className="flex flex-col my-[15rem] justify-center items-center text-center gap-3">
    <h1 className="text-4xl font-medium">Nenhum Produto Adicionado</h1>
    <Link href="/" className="link link-hover hover:link-primary text-3xl">
      Vamos as Compras!
    </Link>
  </div>
  )
}
