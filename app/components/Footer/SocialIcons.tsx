import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function SocialIcons() {
  return (
    <div className="text-4xl  flex gap-4">
      <Link
        className="link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/FelipeKobra"
      >
        <FaFacebook className="hover:scale-105 duration-300" />
      </Link>
      <Link
        className="link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.linkedin.com/in/felipekobra/"
      >
        <FaXTwitter className="hover:scale-105 duration-300" />
      </Link>
      <Link
        className="link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.instagram.com/felipekbra/"
      >
        <FaInstagram className="hover:scale-105 duration-300" />
      </Link>
      <Link
        className="link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.linkedin.com/in/felipekobra/"
      >
        <FaYoutube className="hover:scale-105 duration-300" />
      </Link>
    </div>
  );
}
