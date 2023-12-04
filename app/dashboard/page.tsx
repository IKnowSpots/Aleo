/* eslint-disable @next/next/no-img-element */
"use client";
import { fetchIfDeployed, deploy } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';

import LoadingModal from "@/components/LoadingModal";

const Dashboard = () => {
    const [isDeployed, setIsDeployed] = useState<Boolean>();
    const [loading, setLoading] = useState<Boolean>(false);

    useEffect(() => {
        checkDeployment();
    }, []);

    // comment line 18-26 to make this page static

    // useEffect(() => {
    //     if (isDeployed == true) {
    //         pushPage();
    //     }
    // }, [isDeployed]);

    // function pushPage() {
    //     window.location.replace("/dashboard/active");
    // }

    async function checkDeployment() {
        setLoading(true);
        const data = await fetchIfDeployed();
        console.log("deploy", data);
        setIsDeployed(data);
        setLoading(false);
    }

    // if (loading == true) return // <LoadingModal visible={true}/>;

    return (
        <div>
            {/* // <LoadingModal visible={loading?true:false}/> */}
            <RenderSetUsername />
        </div>
    );

    function RenderSetUsername() {
        const [username, setUsernameHook] = useState<String>();

        // if deployed is true then change button to Move forward

        async function setUsernameCall() {
            setLoading(true)
            await deploy(username);
            setIsDeployed(true);
            setLoading(false);
        }

        function pushPage() {
            window.location.replace("/dashboard/active");
        }

        return (
            <div className="text-white flex bg-[#25143a] h-screen gap-4">
                <div className="bg-[#624c9ba6] border-white border-opacity-60 rounded-lg">
                    <div className="w-[45vw] h-[100%] flex rounded-xl justify-center items-center">
                        {/* <div className="grad2 blur-[220px] absolute w-full h-[700px]"></div> */}

                        <div className="bg-createEvent blur-[150px] absolute w-full h-[80vh]" />

                        <img
                            src="/events/3.jpeg"
                            className=" flex w-[80%] h-[80%] rounded-2xl"
                            alt="welcome image"
                        />
                    </div>
                </div>

                <div className="flex flex-col m-6 justify-between items-center w-[100%]">
                    <div className="flex justify-start items-start overflow-hidden">
                        <div className="grad1 blur-[100px] h-[80vh] w-[20%] flex absolute"></div>
                    </div>
                    <div className="my-6">
                        <Link href="/">
                            <Image
                                src={"/iks-logo.png"}
                                width={300}
                                height={100}
                                alt="iks logo"
                                className=""
                            />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-row items-center w-3/4 gap-2">
                                <h3 className="text-3xl mb-4 ">Welcome</h3>
                                <h1 className="text-4xl mb-4 animate-wave ">👋🏻</h1>
                            </div>
                            <p className="w-3/4 text-[rgba(255,255,255,0.65)] font-light">
                                Today is a new day. It&apos;s your day. You shape
                                it. Your username, your entry ticket.{" "}
                            </p>
                            <div className="flex flex-col w-3/4 pb-8">
                                <label htmlFor="username" className={`font-lg py-2 ${isDeployed ? "hidden" : ""}`}>
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="iknowspots"
                                    className={`px-4 py-2 rounded-xl my-2 text-black ${isDeployed ? "hidden" : ""}`}
                                    onChange={(e) =>
                                        setUsernameHook(e.target.value)
                                    }
                                />
                                {isDeployed ? (
                                    <button
                                        className="get-started-btn py-3 rounded-xl bg-[#162D3A] my-2"
                                        onClick={pushPage}
                                    >
                                        Move Forward
                                    </button>
                                ) : (
                                    <button
                                        className="get-started-btn py-3 rounded-xl bg-[#162D3A] my-2"
                                        onClick={setUsernameCall}
                                    >
                                        Set Username
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-[rgba(255,255,255,0.65)] text-sm">
                            © 2023 ALL RIGHTS RESERVED
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Dashboard;
