"use client";
import Image from "next/image";
import { useState } from "react";
import { publishTickets } from "@/utils";
import LoadingModal from "./LoadingModal";

const CardsMinted = ({
    image,
    name,
    tokenId,
    supply,
    setMintedCollection
}: {
    image: any;
    name: string;
    tokenId: any;
    supply: any;
    setMintedCollection: any
}) => {
    const [loading, setLoading] = useState(false);

    async function publishTicketsCall(tokenId: any) {
        setLoading(true);
        await publishTickets(tokenId);
        setMintedCollection((events: any) => events.filter((event: any) => event.tokenId !== tokenId));
        // Event id is similar to tokenId
        setLoading(false);
    }

    return (
        <>
            <LoadingModal visible={loading} />
            <div className="text-white w-[23%] px-4 box-background pt-4 pb-5 rounded-xl">
                <div className="flex flex-col gap-4">
                    <img
                        src={image}
                        className="h-[250px] rounded-xl"
                        // width="195"
                        // height="200"
                        alt="Event's Image"
                    />
                    <div className="flex text-base flex-col justify-center items-center w-full gap-2">
                        <div className="flex justify-between w-full">
                            <p>{name}</p>
                            <p>supply: {supply}</p>
                        </div>
                        {/* <p>1.20 Weth</p> */}
                        <button
                            className="view-btn px-4 py-0.5 outline rounded-lg"
                            onClick={() => publishTicketsCall(tokenId)}
                        >
                            Publish
                        </button>
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
