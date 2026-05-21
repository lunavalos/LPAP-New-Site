import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getGlobal } from "@/lib/payload";

export async function generateMetadata(): Promise<Metadata> {
  let siteSettings = null;
  try {
    siteSettings = await getGlobal('site-settings');
  } catch (e) {
    console.error('Metadata: Error fetching site settings', e);
  }

  const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';
  const logoUrl = siteSettings?.logo?.url 
    ? (siteSettings.logo.url.startsWith('http') ? siteSettings.logo.url : `${PAYLOAD_URL}${siteSettings.logo.url}`)
    : '/assets/favicon.ico';

  return {
    title: "LPAP - Lucha Por Ángeles Pequeños A.C.",
    description: "Apoyando a niños en situaciones vulnerables. Únete a nuestra causa.",
    icons: {
      icon: logoUrl,
    },
  };
}

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
