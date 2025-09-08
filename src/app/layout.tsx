import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "@/components/SmoothScroll";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PCCoE LFDT Club - Linux Foundation Decentralized Trust",
    description:
        "Official student chapter of the Linux Foundation Decentralized Trust at Pimpri Chinchwad College of Engineering. Exploring blockchain, digital identity, and decentralized systems.",
    icons: {
        icon: [
            {
                url: "/favicon/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/favicon/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/favicon/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                url: "/favicon/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
            { url: "/favicon/favicon.ico" },
        ],
        apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
        shortcut: ["/favicon/favicon.ico"],
    },
    manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + "antialiased font-body"}>
                <AuthProvider>
                    <SmoothScroll />
                    <Layout>{children}</Layout>
                    <SpeedInsights />
                    <Analytics />
                </AuthProvider>
            </body>
        </html>
    );
}
