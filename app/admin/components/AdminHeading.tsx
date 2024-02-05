interface AdminHeadingProps {
  title: string;
}

export default function AdminHeading({ title }: AdminHeadingProps) {
  return (
    <div className="text-4xl mt-8 font-semibold text-center">
      <h1>{title}</h1>
    </div>
  );
}
