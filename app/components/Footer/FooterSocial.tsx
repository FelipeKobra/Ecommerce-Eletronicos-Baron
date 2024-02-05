interface FooterSocial {
    children:React.ReactNode
}


export default function FooterSocial({children}:FooterSocial) {
  return(
    <div className="flex flex-col items-center justify-start w-1/6">
   <div className="flex flex-wrap mb-5 gap-3 ">
    {children}
  </div>
  </div>
  )
}
