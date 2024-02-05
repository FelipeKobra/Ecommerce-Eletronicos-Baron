interface FooterList {
    children:React.ReactNode
}


export default function FooterList({children}:FooterList) {
  return(
    <div className="flex justify-center w-1/6">
   <div className="flex flex-col mb-5 gap-2 w-1/2">
    {children}
  </div>
  </div>
  )
}
