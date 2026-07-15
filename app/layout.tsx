import type { Metadata } from 'next';
import { Inter, Fraunces, Cormorant_Garamond, Rajdhani } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/menu/CartDrawer';
import { CartProvider } from '@/lib/cart/cart-context';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({ 
  subsets: ['latin'], 
  variable: '--font-fraunces',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '600'], 
  style: ['italic'], 
  variable: '--font-cormorant',
  display: 'swap',
});

const rajdhani = Rajdhani({ 
  subsets: ['latin'], 
  weight: ['500', '600', '700'], 
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Parallel Cafe | Coffee • Food • Play • Screen',
  description: 'One brand, three experiences — a café, private screening room, and gaming zone all under one roof in Jayanagar, Bengaluru.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${cormorant.variable} ${rajdhani.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main className="flex-1 flex flex-col min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
