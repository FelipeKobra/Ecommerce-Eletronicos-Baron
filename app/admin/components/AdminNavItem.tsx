import Link from "next/link";
import React from "react";
import {IconType} from 'react-icons'


interface AdminNavItemProps {
  label: string;
  isSelected: boolean;
  linkHref: string;
  icon: IconType;
}



export default function AdminNavItem({
  label,
  icon:Icon,
  linkHref,
  isSelected,
}: AdminNavItemProps) {

  return <div className={`w-full h-full border-b-solid ${isSelected ? "border-b-2 border-base-content " : "border-b-2 border-transparent"} hover:scale-110  hover:border-b-4 hover:border-secondary duration-300 `}>
    <Link className='h-full w-full grid grid-cols-3 justify-center items-center' href={`${linkHref}`}>
    <Icon className='w-full h-2/3'/>
    <p className='col-span-2 text-xl break-normal text-center'>{label}</p>
    </Link>
    </div>;
}
