"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import WalletsProvider from "@/components/wallets";
// import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
    // const { wallets } = useWallet();

    // console.log("check", wallets);

    return (
        <nav className=" flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 mx-auto pt-6 pb-4">
            <Link href="/" className="flex justify-center items-center">
                <Image
                    src="/iks-logo.png"
                    width="252"
                    height="300"
                    className="w-[75%] md:w-full"
                    alt="I know spots logo"
                />
            </Link>

            <button className="bg-white px-4 py-2 rounded-2xl text-black font-semibold">Select Wallet</button>

            <p className=" md:w-[30%] lg:w-[20%] text-black rounded-[1.5rem] ">
                {/* Connect Wallet */}
                <WalletsProvider />
            </p>
        </nav>
    );
};
export default Navbar;
