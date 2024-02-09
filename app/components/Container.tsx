export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1700px] h-full mx-auto">{children}</div>;
}
