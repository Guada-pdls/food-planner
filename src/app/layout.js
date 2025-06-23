import Footer from "@/Components/Footer/Footer";
import "./globals.css"
import SessionWrapper from "@/Components/Auth/SessionWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-full flex flex-col">
        <SessionWrapper>
          {children}
        </SessionWrapper>
        <Footer />
      </body>
    </html>
  );
}