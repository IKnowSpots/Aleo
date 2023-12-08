/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { currency } from "@/config";

const CardsHostee = ({
    image,
    name,
    date,
    username,
    event_id,
    supply,
    isShortlistEnabled

}: {
    image: any;
    name: string;
    date: any;
    username: string;
    event_id: any;
    supply: any;
    isShortlistEnabled: any;

}) => {
    function pushPage() {
        redirect(`/${username}/events/${event_id}`);
    }

    // console.log("tok", tokenId)

    return (
        <div className="text-white w-[23%] px-4 box-background pt-4 pb-5 rounded-xl">
            <div className="flex flex-col gap-4">
                <img
                    src="/sample-img.png"
                    className="h-[250px] rounded-xl"
                    // width="190"
                    // height="200"
                    alt="Event's Image"
                />

                <div className="flex gap-2 text-[0.85rem] flex-col">
                    <div className="flex justify-between items-center">
                        <p>{name}</p>
                        <p>{isShortlistEnabled ? "Private" : "Public"}</p>
                    </div>
                    <div className="h-[2px] rounded-full bg-white"></div>
                    <div className="flex justify-between items-center">
                        <p>
                            Max Supply: {supply}
                        </p>
                        <p>{date}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link
                            href={`/${username}/events/${event_id}`}
                            className="view-btn px-4 py-1 outline rounded-lg"
                            onClick={pushPage}
                        >
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CardsHostee;
