import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syntheverse Instrumentation Shell API',
  description: 'Instrument-grade measurement and verification API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
