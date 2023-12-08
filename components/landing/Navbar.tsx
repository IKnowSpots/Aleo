/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WalletsProvider from "../wallets";
import { isWallet } from "@/utils";

const Navbar = () => {
    const [Toggle, setToggle] = useState(true);

    useEffect(() => { }, []);

    const handleClick = () => {
        setToggle(!Toggle);
    };

    function pushingDashboard() {
        if (!isWallet) {
            toast.warn("Connect your wallet to proceed further!", {
                position: "bottom-left",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            // window.location.replace("/dashboard/active");
            window.location.replace("/dashboard");
        }
    }

    function pushingInventory() {
        if (!isWallet) {
            toast.warn("Connect your wallet to proceed further!", {
                position: "bottom-left",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            window.location.replace("/inventory");
        }
    }

    return (
        <div>
            <nav className="z-[10] flex justify-between md:justify-center items-center px-8 py-8 w-full absolute">
                {/* <nav className="z-[10] ml-[-10%] flex gap-[8%] justify-center items-center py-8 w-[110%] absolute"> */}

                <Link href="/">
                    <Image
                        src="/iks-logo.png"
                        width="252"
                        height="300"
                        className="w-[75%]"
                        alt="I know spots logo"
                    />
                </Link>
                <div className="md:flex gap-[2rem] lg:gap-[3.5rem] justify-center items-center hidden">
                    {/* <button onClick={pushingDashboard}>
                    <p className="hoverUnderline text-[0.75rem] lg:text-base">
                        Dashboard
                    </p>
                </button> */}

                    <Link href="#howitworks">
                        <p className="hoverUnderline text-[0.75rem] lg:text-base">
                            Product
                        </p>
                    </Link>
                    {/* <Link href="/infra">
                    <p>Infra</p>
                </Link> */}
                    <Link
                        target="_blank"
                        href="https://drive.google.com/file/d/1AksnU1BU4UNidCx0Pw0ts2m76i2gqDDR/view?usp=sharing"
                    >
                        <p className="hoverUnderline text-[0.75rem] lg:text-base">
                            Whitepapers
                        </p>
                    </Link>
                    <Link href="/support">
                        <p className="hoverUnderline text-[0.75rem] lg:text-base">
                            Support
                        </p>
                    </Link>

                    <div className="flex gap-[0.75rem] text-[0.5rem] lg:text-base">
                        <p className="w-[150px] lg:w-[205px]">
                            <WalletsProvider />
                        </p>

                        <button onClick={pushingInventory}>
                            <p className="border border-[#C584F5] px-4 py-2 rounded-xl">
                                Inventory
                            </p>
                        </button>
                    </div>
                </div>

                {Toggle ? (
                    <img
                        src="/hamburger (1).png"
                        alt=""
                        className="z-0 md:hidden ml-4 h-[20px]"
                        onClick={handleClick}
                    />
                ) : (
                    <img
                        src="/close.png"
                        alt=""
                        className="z-0 md:hidden ml-4 h-[20px]"
                        onClick={handleClick}
                    />
                )}

                <div
                    className={`delay-300 md:hidden flex text-center gap-8 p-12 h-screen bg-black/90 w-full fixed top-[80px] text-white text-left  flex-col ${Toggle ? "right-[100%]" : "left-[100%]}"
                        }`}
                >
                    <button onClick={pushingDashboard}>
                        <p className="hoverUnderline">Dashboard</p>
                    </button>

                    <Link href="#howitworks">
                        <p className="hoverUnderline">Product</p>
                    </Link>
                    {/* <Link href="/infra">
                    <p>Infra</p>
                </Link> */}
                    <Link
                        target="_blank"
                        href="https://docs.google.com/document/d/1Ayzu2fjTUuCTS3TXmCySz6xfIWffbJshLgd0Uh47wS0/edit"
                    >
                        <p className="hoverUnderline">Docs</p>
                    </Link>
                    <Link href="/support">
                        <p className="hoverUnderline">Support</p>
                    </Link>

                    <div className="flex flex-col justify-center items-center gap-8 ">
                        <p className="">
                            <WalletsProvider />
                        </p>

                        <button onClick={pushingInventory}>
                            <p className="border border-[#C584F5] px-4 py-2 rounded-xl">
                                Inventory
                            </p>
                        </button>
                    </div>
                </div>
            </nav>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};
export default Navbar;
