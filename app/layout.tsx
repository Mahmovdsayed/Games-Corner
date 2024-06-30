import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/Providers/providers";
import Nav from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import Search from "@/components/sections/Search";
import { Analytics } from "@vercel/analytics/react";

import("@/public/manifest.json")
const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gamescorner.vercel.app'),

  title: "Games Corner",
  manifest: "/manifest.json",
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  keywords: ['Games Corner', 'games-corner', 'nest', 'games nest', 'corner'],
  icons: {
    icon: "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719723610/rtbitackjl4nix0sgzde.png",
    apple:
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719723610/rtbitackjl4nix0sgzde.png",
  },
  creator: "Mahmoud Sayed",
  applicationName: "Games Corner",

  description:
    "Welcome to Games Corner, your ultimate destination for everything gaming! With comprehensive reviews of over 800,000 games and detailed information on more than 40,000 pages, Games Corner has everything you need to make informed gaming choices. What sets Games Corner apart is its unique feature allowing users to save their favorite games to their personal accounts, enabling easy access for future enjoyment without the hassle of searching. Explore the world of gaming and personalize your experience with Games Corner.",
  openGraph: {
    images: [
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg",
    ],
    title: "Games Corner",
    description:
      "Welcome to Games Corner, your ultimate destination for everything gaming! With comprehensive reviews of over 800,000 games and detailed information on more than 40,000 pages, Games Corner has everything you need to make informed gaming choices. What sets Games Corner apart is its unique feature allowing users to save their favorite games to their personal accounts, enabling easy access for future enjoyment without the hassle of searching. Explore the world of gaming and personalize your experience with Games Corner.",
    countryName: "Egypt",
  },
  twitter: {
    card: "summary_large_image",
    title: "Games Corner",
    description:
      "Welcome to Games Corner, your ultimate destination for everything gaming! With comprehensive reviews of over 800,000 games and detailed information on more than 40,000 pages, Games Corner has everything you need to make informed gaming choices. What sets Games Corner apart is its unique feature allowing users to save their favorite games to their personal accounts, enabling easy access for future enjoyment without the hassle of searching. Explore the world of gaming and personalize your experience with Games Corner.",
    images: [
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg",
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className} >
        <Providers>
          <main className="overflow-hidden">
            <div className="w-full min-h-screen scroll-smooth  bg-[#F0F0F0]  ">
              <Nav />
              <Search />
              {children}
              <Analytics />
            </div>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
