import { NavbarContextProvider } from "@/app/_context/NavbarContext";
import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { Outfit, MuseoModerno } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "block",
});

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-museo-moderno",
  display: "block",
});

export const metadata: Metadata = {
  title: "Yuri Cunha",
  description:
    "Database Administrator portfolio site, constructed by Yuri Cunha.",
  openGraph: {
    type: "website",
    url: "https://yuricunha.com/",
    title: "Yuri Cunha",
    description:
      "Database Administrator portfolio site, constructed by Yuri Cunha.",
    siteName: "Yuri Cunha",
    images: [
      {
        url: "https://yuricunha.com/images/og.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@isyuricunha",
    images: [
      {
        url: "https://yuricunha.com/images/og.jpg",
        width: "1200",
        height: "630",
        type: "image/jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NavbarContextProvider>
        <body
          className={`${outfit.variable} ${museoModerno.variable} font-sans`}
        >
          {children}
        </body>
      </NavbarContextProvider>
    </html>
  );
}
