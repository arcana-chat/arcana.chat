import { ArcanaProvider } from './ArcanaProvider';

export const metadata = {
  title: '🔮 Arcana',
  description: 'A Tarot Card Reader',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ArcanaProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ArcanaProvider>
  );
}
