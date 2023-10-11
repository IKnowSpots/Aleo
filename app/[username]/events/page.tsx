"use client";
import CardsHostee from "@/components/cardsHostee";
import Navbar from "@/components/hostee/Navbar";
import { fetchUsername } from "@/utils";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

const EventsByHost = () => {
    const [username, setUsername] = useState("iamacid");
    const [hostAddress, setHostAddress] = useState<String | undefined>();
    const [loading, setLoading] = useState(false);

    const { wallets } = useWallet();

    useEffect(() => {
        fetchUsernameCall();
    }, []);

    async function fetchUsernameCall() {
        setLoading(true);
        let user = await fetchUsername();
        // setUsername(user);
        setUsername("iamacid");
        await getHosteeAddress();
        setLoading(false);
    }

    async function getHosteeAddress() {
        let hostee = "88J...4RMV8yw";
        setHostAddress(hostee);
    }

    return (
        <div className="bg-[#25143a] h-[100%] text-white w-full overflow-hidden">
            <Navbar />
            <div>
                <div className="flex justify-between px-[6rem]">
                    <div className="pb-8">
                        <p className="w-full text-white text-[2rem] ml-[0rem]">
                            @{username}
                        </p>
                        <div className="flex gap-2 justify-center text-center">
                            <Image
                                src={wallets[0].adapter.icon}
                                width="30"
                                height="100"
                                alt="wallet logo"
                            />
                            <p className="w-full text-white text-[1rem] opacity-75">
                                {hostAddress}
                            </p>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Search events"
                        className="text-white h-[40px] border-white w-[20rem] bg-[#1C1C1C]  rounded-full px-4 "
                    />
                </div>

                <div className="flex gap-x-[2rem] gap-y-[3rem] flex-wrap pt-4 px-[7rem] pb-[5rem]">
                    <CardsHostee
                        image={"1.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={username}
                    />
                    <CardsHostee
                        image={"2.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={username}
                    />
                    <CardsHostee
                        image={"3.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={username}
                    />
                    <CardsHostee
                        image={"4.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={username}
                    />

                    <CardsHostee
                        image={"1.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={username}
                    />
                    <CardsHostee
                        image={"2.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={username}
                    />
                    <CardsHostee
                        image={"3.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={username}
                    />
                    <CardsHostee
                        image={"4.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={username}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventsByHost;
