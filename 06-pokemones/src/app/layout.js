import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./lib/registry";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mi App de pokemones",
  description: "Aplicación para ver una lista de pokemones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
