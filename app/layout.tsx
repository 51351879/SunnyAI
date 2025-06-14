import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ScrollbarManager from '@/components/ScrollbarManager';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DEVFOLIO - 创造数字未来',
  description: '全栈开发者作品集，展示创新的数字产品和解决方案',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <LanguageProvider>
          <ScrollbarManager />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}