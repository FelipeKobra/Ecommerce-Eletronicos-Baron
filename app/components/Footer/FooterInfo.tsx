interface FooterList {
    children:React.ReactNode
}


export default function FooterInfo({children}:FooterList) {
  return(
    <div className="flex justify-center w-1/6">
   <div className="flex flex-col mb-5 gap-2 w-full">
    {children}
  </div>
  </div>
  )
}
