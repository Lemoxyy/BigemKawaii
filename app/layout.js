import "./globals.css";

export const metadata = {
  title: "BIGEM Kawaii Playground",
  description:
    "A cute React + Next.js website for BIGEM with canvas animation and playful style.",
  icons: {
    icon: "/img/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
