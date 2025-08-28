import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

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
            <body className={`antialiased font-body`}>
                <SmoothScroll />
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
