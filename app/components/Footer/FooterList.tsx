interface FooterList {
    children:React.ReactNode
}


export default function FooterList({children}:FooterList) {
  return(
    <div className="flex justify-center col-span-8 sm:col-span-4 lg:col-span-2">
   <div className="flex flex-col items-center lg:items-start mb-5 gap-2 w-full lg:w-1/2">
    {children}
  </div>
  </div>
  )
}
