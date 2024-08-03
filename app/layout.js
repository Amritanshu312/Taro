import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/partials/footer/Footer";
import { AuthProvider } from "./SessionProvider";
import { getAuthSession } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Taro : Stream Anime Free Without Those Annoying Ads",
  description: "Welcome to Taro, your ultimate destination for streaming anime free of charge and without any annoying ads. Dive into a vast collection of your favorite anime series and movies, all available in high quality. Enjoy a seamless viewing experience with zero interruptions, and explore new titles every day. At Taro, your anime adventure awaits!",
  icons: {
    icon: '/images/logo.png',
  },
};

export default async function RootLayout({ children }) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <Header />
          {children}
          {/* <Footer /> */}
        </AuthProvider>

        <ToastContainer draggable theme="dark" />
      </body>
    </html>
  );
}
