import './globals.css';
import { Figtree } from 'next/font/google';

export const metadata = {
  title: 'PowerPoint optimizer - SlideSpeak',
  description: 'Reduce the size of your PowerPoint file without losing quality.',
};

const figtree = Figtree({
  subsets: ['latin'],
  // If you need specific weights (check what's available)
  weight: ['400', '500', '600', '700'],
  // Optional: Add display setting
  display: 'swap',
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={figtree.className + ' bg-[#F5F5F5]'}>
    <body>{children}</body>
  </html>
);

export default RootLayout;
