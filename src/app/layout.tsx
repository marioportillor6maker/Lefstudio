import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LEF CQFH - Laboratorio de Especialidades Farmacéuticas",
  description: "Sistema Integral Administrativo y Operativo LEF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-inter antialiased bg-slate-50 text-slate-900 h-screen overflow-hidden flex`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
