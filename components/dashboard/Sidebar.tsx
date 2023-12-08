"use client";
import Image from "next/image";
import SidebarItems from "./sidebarItems";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
// import { ConnectButton } from '@rainbow-me/rainbowkit';

// const WalletsProvider = dynamic(
//     () => import("../../components-integration/wallets"),
//     {
//         ssr: false,
//     }
// );

import WalletsProvider from "@/components/wallets";

const Sidebar = () => {
    // const { publicKey, wallets, sendTransaction } = useWallet();
    const [shortPublicKey, setPublicKey] = useState<String>();

    function shortenString(input: String, maxLength: any) {
        // if (input === null) return
        if (input.length <= maxLength) {
            return input; // No need to shorten if it's already shorter than maxLength.
        } else {
            const firstPart = input.slice(0, maxLength / 2);
            const lastPart = input.slice(-maxLength / 2);
            let finalString = firstPart + "..." + lastPart;
            setPublicKey(finalString);
            // return firstPart + "..." + lastPart;
        }
    }

    let publicKey = undefined;

    // useEffect(() => {
    //     console.log("Public Key is ", publicKey);
    //     if (publicKey == null) return
    //     shortenString(publicKey?.toBase58(), 10);
    // }, [publicKey]);

    return (
        <div id="sidebar" className="pl-8 bg-[rgb(61,23,111)] w-[20%] pt-8 h-screen sticky top-0">
            <div className="bg-dashboard blur-[220px] absolute w-[60%] h-[400px]"></div>

            <Link href="/" className="relative z-10">
                <Image
                    src="/iks-logo.png"
                    width="200"
                    height="400"
                    alt="I know spots logo"
                />
            </Link>
            <div className="py-[10%] text-white pr-4 relative">
                {/* <SidebarItems icon_name="Home_fill" section_name="Dashboard" /> */}

                <Link
                    href="/dashboard/active"
                    className="opacity-75 sidebar-btn"
                >
                    <SidebarItems
                        icon_name="Fire_fill"
                        section_name="Active Events"
                        page_name="active"
                    />
                </Link>

                <Link
                    href="/dashboard/inactive"
                    className="opacity-75 sidebar-btn"
                >
                    <SidebarItems
                        icon_name="3d_box_fill"
                        section_name="Inactive Events"
                        page_name="inactive"
                    />
                </Link>

                <Link
                    href="/dashboard/minted"
                    className="opacity-75 sidebar-btn"
                >
                    <SidebarItems
                        icon_name="Fire_fill"
                        section_name="Minted NFTs"
                        page_name="minted"
                    />
                </Link>

                {/* <SidebarItems
                    icon_name="Ticket_use_fill"
                    section_name="Minted Collection"
                /> */}

                <Link
                    href="/dashboard/shortlist"
                    className="opacity-75 sidebar-btn"
                >
                    <SidebarItems icon_name="CPU" section_name="Shortlist" page_name="shortlist" />
                </Link>

                {/*  <Link
                    href="/dashboard/rewards"
                    className="opacity-75 sidebar-btn"
                >
                    <SidebarItems
                        icon_name="lightning_fill"
                        section_name="Rewards"
                        page_name="rewards"
                    />
                </Link> */}
            </div>
            <div className="text-base pl-10 text-white">
                <Link target="_blank" href="/support">
                    <p className="py-1 relative z-10 opacity-40 sidebar-elements">Support</p>
                </Link>
                <Link target="_blank" href="/">
                    <p className="py-1 relative z-10 opacity-40 sidebar-elements">Docs</p>
                </Link>
                <Link target="_blank" href="https://github.com/IKnowSpots">
                    <div className="flex items-center py-1 sidebar-elements">
                        <p className=" pr-2 opacity-40 sidebar-elements">
                            GitHub{" "}
                        </p>
                        <Image
                            src="/icons/arrow.svg"
                            width="17"
                            height="100"
                            alt="arrow icon"
                            className="rotate-[145deg] opacity-50"
                        />
                    </div>
                </Link>
                <Link target="_blank" href="https://twitter.com/iknowspots">
                    <div className="flex items-center py-1 sidebar-elements">
                        <p className="pr-2 opacity-40 sidebar-elements sidebar-elements">
                            Twitter
                        </p>
                        <Image
                            src="/icons/arrow.svg"
                            width="17"
                            height="100"
                            alt="arrow icon"
                            className="rotate-[145deg] opacity-50"
                        />
                    </div>
                </Link>
            </div>
            <div className="mt-[5%]">
                {publicKey ? (
                    <button className="block">
                        <div className="flex border border-white px-3 py-4">
                            {/* <Image
                                src={wallets[0].adapter.icon}
                                width="30"
                                height="100"
                                alt="wallet logo"
                            /> */}
                            <p className="px-4 text-white">
                                {/* {shortPublicKey} */}
                                <WalletsProvider />
                            </p>
                        </div>
                    </button>
                ) : (
                    <WalletsProvider />
                )}
                <button className="block  bg-black my-6 ">
                    {/* <div className="flex px-6 py-4">
                        <Image
                            src="/icons/pulsechain.png"
                            width="30"
                            height="100"
                            alt="metamask logo"
                        />
                        <p className="px-2 text-white">Solana Testnet</p>
                    </div> */}
                </button>
            </div>
        </div>
    );
};
export default Sidebar;
