import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from "./SessionProvider";
import { getAuthSession } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  metadataBase: new URL('https://taro-anime.vercel.app'),
  applicationName: "Taro",
  title: "Taro : Stream Anime Free Without Those Annoying Ads",
  icons: {
    icon: '/images/logo.png',
  },
  description: "Welcome to Taro, your ultimate destination for streaming anime free of charge and without any annoying ads. Dive into a vast collection of your favorite anime series and movies, all available in high quality. Enjoy a seamless viewing experience with zero interruptions, and explore new titles every day. At Taro, your anime adventure awaits!",
  keywords: [
    'anime',
    'anilist-tracker',
    'trending anime',
    'watch anime subbed',
    'watch anime dubbed',
    'latest anime episodes',
    'anime streaming sub',
    'anime streaming dub',
    'subbed anime online',
    'dubbed anime online',
    'new anime releases',
    'watch anime sub and dub',
    'anime episodes subtitles',
    'english dubbed anime',
    'subbed and dubbed series',
    'anime series updates',
    'anime episodes english sub',
    'anime episodes english dub',
    'latest subbed anime',
    'latest dubbed anime',
    'subbed anime streaming',
    'dubbed anime streaming',
    'Taro latest anime',
    'anime watch list',
    'anime reviews',
    'anime news',
    'anime recommendations',
    'best anime series',
    'popular anime shows',
    'anime streaming platform',
    'anime download',
    'top anime of the year',
    'anime genres',
    'ongoing anime series',
    'anime fan community',
    'classic anime series',
    'anime movie streaming',
    'latest anime movies',
    'upcoming anime releases',
    'anime character rankings',
    'anime discussion forums',
    'anime streaming sites',
    'anime online free',
    'anime episode guide',
    'anime synopsis',
    'taro',
    'taro anime',
    'taro anime watch online',
    'taro-anime website',
    'taro-anime',
    'taro vercel',
    'taro vercel.dev',
    'anime release schedule',
    'watch anime legally',
    'anime marathons',
    'anime streaming without signup',
    'taro anime library',
    'taro anime catalog',
    'latest anime trends',
    'anime simulcast',
    'anime with multiple audio tracks',
    'taro dubbed anime',
    'anime in multiple languages',
    'anime with subtitles',
    'anime episode tracker',
    'taro anime subscriptions',
    'free anime episodes',
    'latest anime on taro',
    'anime streaming high quality',
    'discover new anime',
    'anime streaming without ads',
    'taro anime news',
    'anime streaming schedule',
    'taro anime events',
    'follow anime on taro',
    'watch anime in 4K',
    'anime HD streaming',
    'taro anime blog',
    'anime streaming experience',
    'anime series marathon',
    'popular anime on taro',
    'anime episode countdown',
    'anime streaming updates',
    'anime on demand',
    'taro anime guide',
    'anime streaming service taro',
    'anime streaming interface',
    'watch anime taro website'
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Taro : Stream Anime Free Without Those Annoying Ads",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Taro",
    title: "Taro : Stream Anime Free Without Those Annoying Ads",
    description: "Welcome to Taro, your ultimate destination for streaming anime free of charge and without any annoying ads. Dive into a vast collection of your favorite anime series and movies, all available in high quality. Enjoy a seamless viewing experience with zero interruptions, and explore new titles every day. At Taro, your anime adventure awaits!",
  },
  twitter: {
    card: "summary",
    title: "Taro : Stream Anime Free Without Those Annoying Ads",
    description: "Welcome to Taro, your ultimate destination for streaming anime free of charge and without any annoying ads. Dive into a vast collection of your favorite anime series and movies, all available in high quality. Enjoy a seamless viewing experience with zero interruptions, and explore new titles every day. At Taro, your anime adventure awaits!",
  },
  other: {
    'google-site-verification': 'ls1OUoOoLjxYsmKMPQ1ML9P99TWDsm7d5hfnGQjW7Tw',
    "X-Frame-Options": "SAMEORIGIN",
    
  }
};


export default async function RootLayout({ children }) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <Header />
          {children}
          <Analytics />
          {/* <Footer /> */}
        </AuthProvider>

        <ToastContainer draggable theme="dark" />
      </body>
    </html>
  );
}
