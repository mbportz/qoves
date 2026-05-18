import type { Metadata } from "next";
import { GsapProvider } from "@/components/animations/GsapProvider";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Qoves",
  description: "Facial analysis landing experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GsapProvider>{children}</GsapProvider>
      </body>
    </html>
  );
}
