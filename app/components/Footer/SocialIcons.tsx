import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";

export default function SocialIcons() {
  return (
    <div className="text-2xl flex gap-4">
      <Link
        className="link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/FelipeKobra"
      >
        <FacebookIcon
          className="hover:scale-105 duration-300"
          fontSize="large"
        />
      </Link>
      <Link
        className="link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.linkedin.com/in/felipekobra/"
      >
        <XIcon className="hover:scale-105 duration-300" fontSize="large" />
      </Link>
      <Link
        className="link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.instagram.com/felipekbra/"
      >
        <InstagramIcon
          className="hover:scale-105 duration-300"
          fontSize="large"
        />
      </Link>
      <Link
        className="link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.linkedin.com/in/felipekobra/"
      >
        <YouTubeIcon
          className="hover:scale-105 duration-300"
          fontSize="large"
        />
      </Link>
    </div>
  );
}
