
import{Ubuntu} from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const ubuntu = Ubuntu({subsets:['latin'],weight:['400','700']})

export default function LogoText() {
  return (
    <div className="py-4 pl-10 inline-block">
    <Link  href={"/"}>
      <h1 className={`text-base-content text-4xl font-semibold ${ubuntu.className}`}>Baron</h1>
    </Link>
  </div>
  )
}
