import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lore of Legends — Archive Interdite de Runeterra",
  description:
    "Plonge dans les archives de Runeterra. Consulte l'Oracle du Lore, forge ton propre champion guidé par Kindred. Une expérience narrative IA immersive.",
  keywords: ["Runeterra", "League of Legends", "Lore", "Kindred", "Champion", "IA", "Narratif"],
  openGraph: {
    title: "Lore of Legends — Archive Interdite de Runeterra",
    description: "Forge ton destin dans les archives de Runeterra, guidé par Kindred.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${cinzel.variable} ${cinzelDecorative.variable} ${inter.variable} antialiased bg-void text-ivory overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
