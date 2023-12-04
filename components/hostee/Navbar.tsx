"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
// import { useWallet } from "@solana/wallet-adapter-react";
import WalletProvider from "../wallets";
// const WalletsProvider = dynamic(
//     () => import("../wallets"),
//     {
//         ssr: false,
//     }
// );

const Navbar = () => {
    // const { wallets } = useWallet();

    // console.log("check", wallets);

    return (
        <nav className=" flex gap-[20rem] justify-center items-center py-8">
            <Link href="/">
                <Image
                    src="/iks-logo.png"
                    width="252"
                    height="300"
                    className=""
                    alt="I know spots logo"
                />
            </Link>
            <div className="flex justify-center items-center">
                {/* <Link href="/dashboard">
                    <p className="hoverUnderline">Dashboard</p>
                </Link>

                <Link href="#howitworks">
                    <p className="hoverUnderline">Product</p>
                </Link>
                <Link href="/infra">
                    <p>Infra</p>
                </Link> */}

                {/* <Link
                    target="_blank"
                    href="https://docs.google.com/document/d/1Ayzu2fjTUuCTS3TXmCySz6xfIWffbJshLgd0Uh47wS0/edit"
                >
                    <p className="hoverUnderline">Docs</p>
                </Link>
                <Link href="/support">
                    <p className="hoverUnderline">Support</p>
                </Link> */}

                {/* <input
                    type="text"
                    placeholder="Search events"
                    className="text-white h-[40px] border-white w-[20rem] bg-[#1C1C1C] mx-auto rounded-full px-4 "
                /> */}

                <div className="flex gap-6">
                    <Link href="/inventory">
                        <p className="hoverUnderline text-xl">Inventory</p>
                    </Link>
                    <Link href="/support">
                        <p className="hoverUnderline text-xl">Support</p>
                    </Link>
                </div>
            </div>

            <p className=" text-center w-[12%] text-black   rounded-[1.5rem] ">
                {/* Connect Wallet */}
                <WalletProvider />
            </p>
        </nav>
    );
};
export default Navbar;
