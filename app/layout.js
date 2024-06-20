import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Taro : Stream Anime Free Without Those Annoying Ads",
  description: "Welcome to Taro, your ultimate destination for streaming anime free of charge and without any annoying ads. Dive into a vast collection of your favorite anime series and movies, all available in high quality. Enjoy a seamless viewing experience with zero interruptions, and explore new titles every day. At Taro, your anime adventure awaits!",
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
