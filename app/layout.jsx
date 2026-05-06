import './globals.css';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Campaign Director · ImagineArt',
  icons: { icon: '/assets/imagine-logo.svg' },
};

export const viewport = {
  width: 1280,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dark">
        {children}
        <Footer />
      </body>
    </html>
  );
}
