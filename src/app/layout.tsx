import { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';

export const metadata = { title: 'Каталог товаров', description: 'Простой каталог товаров с корзиной' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>
          <Header />
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}