import Link from "next/link";

interface NoDataProps {
  title: string;
  subtitle: string;
  link: string;
}

export default function NoData({ title, subtitle, link }: NoDataProps) {
  return (
    <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl">{title}</h1>
      <h2 className="text-3xl">{subtitle}</h2>
      <Link className="link link-hover link-primary text-3xl" href={link}>
        Clique Aqui!
      </Link>
    </div>
  );
}
