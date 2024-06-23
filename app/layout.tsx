import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import "./globals.css"

import LocalStorageProvider from "@/utils/providers/LocalStorageProvider";

import Container from "./components/Container";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baron",
  description: "O Melhor Site de Eletrônicos do Brasil",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={poppins.className}>
      <body className="flex flex-col min-h-screen">
        <NextTopLoader
          color="oklch(var(--p))"
          showSpinner={false}
          shadow="0 0 10px oklch(var(--p)),0 0 5px oklch(var(--p))"
        />
        <Toaster
          toastOptions={{
            style: { background: "rgb(51 65 85)", color: "#fff" },
          }}
        />
        <LocalStorageProvider>
          <Container>
            <NavBar />
            <main className="flex-grow flex flex-col ">{children}</main>
            <Footer />
          </Container>
        </LocalStorageProvider>
      </body>
    </html>
  );
}
