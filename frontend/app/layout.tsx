import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  const hideNavbar =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen">
        {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
