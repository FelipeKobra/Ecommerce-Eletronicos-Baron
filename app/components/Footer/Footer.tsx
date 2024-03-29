import Link from "next/link";

import FooterInfo from "./FooterInfo";
import FooterList from "./FooterList";
import FooterSocial from "./FooterSocial";
import SocialIcons from "./SocialIcons";

import "../../globals.css";
import { categories } from "@/data/categories";
import formatCategoryName from "@/utils/Formaters/formatCategoryName";
import SupportLinks from "./SupportLinks";

export default function Footer() {
  return (
    <footer>
      <div className="grid grid-cols-8 justify-between text-sm text-neutral-content bg-neutral gap-10  pt-6 px-12">
        <FooterList>
          <h2 className="text-3xl md:text-xl font-semibold select-none">
            Categorias
          </h2>
          {categories.map((categoria) => (
            <Link
              key={categoria.label}
              className="link link-hover text-xl md:text-sm"
              href={
                categoria.label === "Geral"
                  ? "/"
                  : `/?category=${categoria.label}`
              }
            >
              {formatCategoryName(categoria.label)}
            </Link>
          ))}
        </FooterList>

        <FooterList>
          <h2 className="text-3xl md:text-xl font-semibold select-none">
            Serviços
          </h2>
          <SupportLinks title="Contate-nos" />
          <SupportLinks title="Políticas de Envio" />
          <SupportLinks title="Retornos e Trocas" />
          <SupportLinks title="FAQs" />
        </FooterList>

        <FooterInfo>
          <h2 className="text-3xl md:text-xl font-semibold select-none">
            Sobre Nós
          </h2>
          <p className="select-none text-xl md:text-sm text-center md:text-start">
            Na Baron, oferecemos uma experiência excepcional em compras de
            eletrônicos. Nosso compromisso é fornecer produtos de qualidade,
            inovação tecnológica e atendimento excepcional.
            <br />
            <br />
            <span className="font-semibold">
              Baron © {new Date().getFullYear()}
            </span>
          </p>
        </FooterInfo>

        <FooterSocial>
          <h2 className="text-3xl md:text-xl w-full font-semibold select-none">
            Siga-Nos
          </h2>
          <SocialIcons />
        </FooterSocial>
      </div>
    </footer>
  );
}
