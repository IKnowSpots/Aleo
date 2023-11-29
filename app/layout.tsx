"use client"
import "./globals.css";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css"
import { Providers } from "./provider";
// import { Inter } from "next/font/google";
// import WalletContext from "@/components/WalletContextProvider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//     title: "iknowspots",
//     description: "More than ticketing",
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <title>iKnowSpots</title>
            </head>
            <body >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
