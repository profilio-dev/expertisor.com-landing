import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

// app/layout.js or app/layout.tsx

export const metadata = {
  title: "Expertisor | Connect, Learn, and Grow",
  description:
    "Expertisor is a professional network that connects experts and learners to share knowledge, grow skills, and collaborate on meaningful opportunities.",
  keywords: [
    "Expertisor",
    "professional network",
    "experts",
    "learners",
    "mentorship",
    "collaboration",
    "career growth",
    "knowledge sharing",
  ],
  authors: [{ name: "Expertisor Team" }],
  creator: "Expertisor",
  publisher: "Expertisor",
  metadataBase: new URL("https://www.expertisor.com"), // your domain
  openGraph: {
    title: "Expertisor | Connect, Learn, and Grow",
    description:
      "Join Expertisor — the platform where experts meet learners to share knowledge and create opportunities together.",
    url: "https://www.expertisor.com",
    siteName: "Expertisor",
    images: [
      {
        url: "/images/og-image.png", // add this in /public/images
        width: 1200,
        height: 630,
        alt: "Expertisor — Professional Network for Experts and Learners",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expertisor | Connect, Learn, and Grow",
    description:
      "A professional network for experts and learners to connect, share knowledge, and collaborate.",
    creator: "@expertisor", // optional if you have a Twitter handle
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/images/Logo.svg", // favicon in /public/images
    shortcut: "/images/Logo.svg",
    apple: "/images/Logo.svg",
  },
  themeColor: "#0B3D91", // your brand color
  manifest: "/manifest.json", // optional if you use PWA
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* <Navbar /> */}
        <main className="min-h-screen">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
