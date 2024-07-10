import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <div className="backgroundgradient"></div>
        <div className="backgroundgradient2"></div>
        <div className="backgroundgradient3"></div>
        <div className="backgroundgradient4"></div>
        {children}

        <ToastContainer draggable theme="dark" />
      </body>
    </html>
  );
}
