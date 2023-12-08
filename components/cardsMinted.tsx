"use client";
import Image from "next/image";
import { useState } from "react";
import { publishTickets } from "@/utils";
import LoadingModal from "./LoadingModal";

const CardsMinted = ({
    image,
    date,
    name,
    event_id,
    max_supply,
    setMintedCollection,
    isShortlistEnabled
}: {
    image: any;
    date: any;
    name: string;
    event_id: any;
    max_supply: any;
    setMintedCollection: any;
    isShortlistEnabled: any
}) => {
    const [loading, setLoading] = useState(false);

    async function publishTicketsCall(event_id: any) {
        setLoading(true);
        await publishTickets(event_id);
        setMintedCollection((events: any) => events.filter((event: any) => event.event_id !== event_id));
        // Event id is similar to tokenId
        setLoading(false);
    }
    // publishTicketsCall(event_id);

    return (
        <>
            <LoadingModal visible={loading} />
            <div className="text-white w-[23%] px-4 box-background pt-4 pb-5 rounded-xl">
                <div className="flex flex-col gap-4">
                    <img
                        src="/sample-img.png"
                        className="h-[250px] rounded-xl"
                        // width="195"
                        // height="200"
                        alt="Event's Image"
                    />
                    <div className="flex gap-2 text-[0.85rem] flex-col">
                        <div className="flex justify-between items-center">
                            <p>{name.split('.private')}</p>
                            <p>{isShortlistEnabled ? "Private" : "Public"}</p>
                        </div>
                        <div className="h-[2px] rounded-full bg-white"></div>
                        <div className="flex justify-between items-center">
                            <p>Max Supply: {max_supply?.split('u32')[0]}</p>
                            {/* <p>{date}</p> */}
                        </div>
                        {/* <p>{remaining}/{supply}</p> */}
                        {/* <p>1.20 Weth</p> */}
                        <div className="flex justify-center items-center">
                            {/*  <button className="view-btn px-4 py-0.5 outline rounded-lg" onClick={() => pauseEventCall(event_id)}>
                                Pause
                            </button> */}
                        </div>

                    </div>
                    <div className="flex text-base flex-col justify-center items-center w-full gap-2">
                        {/* <div className="flex justify-between w-full">
                            <p>{name}</p>
                            <p>supply: {max_supply.split('')[0]}</p>
                        </div> */}
                        {/* <p>1.20 Weth</p> */}
                        {/* <button
                            className="view-btn px-4 py-0.5 outline rounded-lg"
                            onClick={() => publishTicketsCall(tokenId)}
                        >
                            Publish
                        </button> */}
                    </div>
                    {/* <hr />
                <div className="flex justify-between my-6">
                    <p>End&apos;s In 01.34.45</p>
                    <button className="px-4 py-1 outline rounded-lg">
                        Run
                    </button>
                </div> */}
                </div>
            </div>
        </>
    );
};
export default CardsMinted;
