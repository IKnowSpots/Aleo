/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import copy from "clipboard-copy";
import { pauseEvent } from "@/utils";
import { currency } from "@/config";
import Link from "next/link";
import { fetchCurrentUsername } from "@/utils"
import CopytoClipboardButton from "@/components/CopytoClipboardButton"

const CardsReward = ({
    image,
    name,
    price,
    rewardId,
}: {
    image: any;
    name: string;
    price: any;
    rewardId: any;
}) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("")

    useEffect(() => {
        fetchUsernameData()
    }, [])

    async function fetchUsernameData() {
        const data = await fetchCurrentUsername()
        setUsername(data)
    }

    console.log("fds", rewardId)

    const textToCopy = 'This is the text to be copied.';

    return (
        <div className="text-white w-[23%] px-4 box-background pt-4 pb-5 rounded-xl">
            <div className="flex flex-col gap-6">
                <img
                    src="/sample-img.png"
                    className="h-[250px] rounded-xl"
                    // width="195"
                    // height="200"
                    alt="Event's Image"
                />
                <div className="flex gap-2 text-[0.85rem] flex-col">
                    <div className="flex justify-between items-center">
                        <p>{name}</p>
                        <div className="flex justify-center items-center gap-2 w-[35%]fixed">
                            <Link href={`/rewards/${username}/${rewardId}`} className="flex justify-end w-full">
                                <p>Link</p>
                            </Link>
                            <CopytoClipboardButton textToCopy={textToCopy} />
                        </div>
                        <p>
                            {price} {currency}
                        </p>
                    </div>
                    <div className="h-[2px] rounded-full bg-white"></div>
                    <div className="flex justify-between items-center">

                    </div>
                    {/* <p>{remaining}/{supply}</p> */}
                    {/* <p>1.20 Weth</p> */}
                    <div className="flex justify-center items-center">
                        <Link href={`/dashboard/rewards/${rewardId}/manage`}>
                            <p
                                className="view-btn px-4 py-0.5 outline rounded-lg"
                            >
                                Add Whitelist
                            </p>
                        </Link>
                    </div>
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
    );
};
export default CardsReward;
