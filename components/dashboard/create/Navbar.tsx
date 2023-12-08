"use client";
import Image from "next/image";
import Link from "next/link";
import WalletsProvider from "../../wallets";
import { useState, useEffect } from "react";
import { fetchCurrentUsername } from "@/utils";

const Navbar = () => {
    const [username, setUsername] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsernameCall();
    }, []);

    async function fetchUsernameCall() {
        setLoading(true);
        let user = await fetchCurrentUsername();
        setUsername(user);
        // setUsername("iamacid");
        setLoading(false);
    }
    // const { wallets } = useWallet();

    return (
        <div className="flex justify-between items-center py-4">
            <Link href="/">
                <Image
                    src={"/iks-logo.png"}
                    width={200}
                    height={200}
                    alt="iks logo"
                />
            </Link>
            <div className="flex items-center ">
                <Link href={`/${username}/events`}>
                    <button className="rounded-full px-8 py-2 mr-8 flex items-center bg-gradient-to-r from-[#9000FF] to-[#1D102700] hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-black ">
                        {/* <Image
                    src={"/bored_ape_image.png"}
                    width={30}
                    height={50}
                    alt="bored ape nft image"
                    className="rounded-xl"
                    /> */}
                        <p>@{username}</p>
                    </button>
                </Link>
                {/* remaning: fix the basic gradients of this */}
                <button className="flex items-center py-3 px-3 rounded-lg">
                    {/* <Image
                        src={"/icons/metamask-icon.svg"}
                        width={"30"}
                        height={"30"}
                        alt="Metamask fox svg"
                    /> */}
                    <p>
                        <WalletsProvider />
                    </p>
                </button>
            </div>
        </div>
    );
};
export default Navbar;
