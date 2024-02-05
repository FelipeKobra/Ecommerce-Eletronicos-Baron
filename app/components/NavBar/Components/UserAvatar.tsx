"use client";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { currentUserType } from "@/utils/types/types";


export default function UserAvatar({
  currentUser,
}: {
  currentUser: currentUserType | null;
}) {
  let imagem =
    "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp";

  if (currentUser && currentUser.image) {
    imagem = currentUser.image;
  }

  return (
    <div className="dropdown dropdown-bottom dropdown-end dropdown-hover z-50">
      <div className="avatar cursor-pointer">
        {" "}
        <div className="w-10 rounded-full ring ring-primary">
          <Image
            src={imagem}
            alt={"Foto do Usuário"}
            width={100}
            height={100}
          />
        </div>
      </div>

      {currentUser ? (
        <ul className="p-2 shadow menu dropdown-content  bg-base-100 rounded-box w-52">
          <li>
            <Link href="/pedidos">
              {" "}
              <LocalOfferIcon /> Pedidos
            </Link>
          </li>
          {currentUser.role === "ADMIN" && (
            <li>
              <Link href="/admin">
                <LockOpenIcon /> Painel do Administrador
              </Link>
            </li>
          )}
          <hr />
          <li onClick={() => signOut()}>
            <Link href="/">
              <LogoutIcon /> Deslogar
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <Link href="/login">
              <LoginIcon /> Login
            </Link>
          </li>
          <li>
            <Link href="/register">
              <VpnKeyIcon /> Registre-se
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
