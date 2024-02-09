interface FooterSocial {
  children: React.ReactNode;
}

export default function FooterSocial({ children }: FooterSocial) {
  return (
    <div className="flex flex-col justify-self-center items-center sm:items-start lg:items-center justify-start col-span-8 sm:col-span-4 lg:col-span-2">
      <div className="flex flex-wrap justify-center text-center lg:justify-start lg:text-start  mb-5 gap-3 ">
        {children}
      </div>
    </div>
  );
}
