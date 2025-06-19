import "./globals.css"
import SessionWrapper from "@/Components/Auth/SessionWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}