"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchCurrentUsername } from "@/utils";
import WalletsProvider from "../wallets";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";

const CreateNav = () => {
    const [username, setUsername] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsernameCall();
    }, []);

    async function fetchUsernameCall() {
        setLoading(true);
        let user = await fetchCurrentUsername();
        setUsername(user);
        // setUsername("consentsam");
        setLoading(false);
    }

    return (
        <div className="flex justify-between items-center py-4">
            <Link href="/">
                <Image
                    src={"/iks-logo.png"}
                    width={300}
                    height={300}
                    alt="iks logo"
                />
            </Link>
            <WalletMultiButton className="bg-[#1253fa]  top-75-left" />
            <div className="flex items-center ">

                <Link href={`/${username}/events`}>
                    <div className="text-white bg-[#070708] py-2 text-base font-semibold flex items-center gap-2 pl-5 pr-3 border border-transparent rounded-full hover:bg-white hover:text-black">
                        <p className="">Hii, @{username}</p>
                        <div className="h-[1.5rem] w-[1.5rem] grad1 rounded-full"></div>
                    </div>
                </Link>
                {/* remaning: fix the basic gradients of this */}
                <div className="flex items-center py-3 px-3 rounded-lg">
                    {/* <Image
                        src={wallets[0].adapter.icon}
                        width={"30"}
                        height={"30"}
                        alt="Metamask fox svg"
                    /> */}
                    <WalletsProvider />
                </div>
            </div>
        </div>
    );
};

export default CreateNav;
