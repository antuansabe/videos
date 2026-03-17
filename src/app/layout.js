import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata = {
  title: "Video Downloader — Sin anuncios, sin tracking",
  description:
    "Descarga videos de YouTube, Instagram, TikTok y más. Sin publicidad, sin rastreo, open source.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
