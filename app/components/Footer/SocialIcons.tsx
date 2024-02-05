import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link';

export default function SocialIcons() {
  return (
    <div className='text-2xl flex gap-4'>
    <Link className='link' href='#' >
    <FacebookIcon className='hover:scale-105 duration-300' fontSize='large'/>
    </Link>
    <Link className='link' href='#'>
    <XIcon className='hover:scale-105 duration-300' fontSize='large'/>
    </Link>
    <Link className='link' href='#'>
    <InstagramIcon className='hover:scale-105 duration-300' fontSize='large'/>
    </Link>
    <Link className='link' href='#'>
    <YouTubeIcon className='hover:scale-105 duration-300' fontSize='large'/>
    </Link>
    </div>
  )
}
