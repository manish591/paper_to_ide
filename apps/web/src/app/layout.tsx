import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';

const font = Ubuntu({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'paper to ide',
  description: 'Execute code seamlessly on mobile with great user experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
