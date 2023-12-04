/* eslint-disable @next/next/no-img-element */
"use client";
import Navbar from "@/components/hostee/Navbar";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { fetchAllEventsWithUsername, buyTicket } from "@/utils";
import { usePathname } from "next/navigation";
import { currency } from "@/config";
import Link from "next/link";
import FooterSection from "@/components/landing/FooterSection";
import LoadingModal from "@/components/LoadingModal";

const paragraphStyles = {
    WebkitLineClamp: 5,
    // WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box'
}

const Event = () => {
    const pathName = usePathname();
    const username = pathName?.split("/")[1];
    let eventId = pathName?.split("/")[3];

    const [eventData, setEventData] = useState({
        name: "",
        hostName: "",
        price: "",
        venue: "",
        description: "",
        cover: "",
        tokenId: "",
        supply: "",
        remaining: "",
        isShortlist: "",
        isStaking: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchActiveEventsData();
    }, []);

    // const [toggle,setToggle]=useState(false)
    // const [more,setMore]=useState(eventData?.description.slice(0,350))
    // function handleClick() {
    //     toggle?setMore(eventData?.description.slice(0,350)):setMore(eventData?.description)
    //     setToggle(!toggle)
    // }

    const [isOpen, setIsOpen] = useState(false);

    // const [showReadMore, setShowReadMore] = useState(false)

    // const ref = useRef(null)
    // useEffect(() => {
    //     if (ref.current) {
    //         console.log(ref.current.scrollHeight, ref.current.clientHeight)
    //         setShowReadMore( ref.current.scrollHeight !== ref.current.clientHeight)
    //     }
    // })

    async function fetchActiveEventsData() {
        setLoading(true);
        let fetchedEvents: any = await fetchAllEventsWithUsername(username);
        const event = fetchedEvents.find((obj: any) => obj.tokenId == eventId);
        setEventData(event);
        console.log("event", event);
        if (event) {
        }
        setLoading(false);
    }

    async function claim(tokenId: any, price: any) {
        await buyTicket(username, tokenId, price);
    }

    return (
        <div className="bg-[#25143a] text-white pb-8 px-8 w-full h-full">
            {/* // <LoadingModal visible={loading}/> */}
            <div>
                <div className="grad1 blur-[220px] w-[80%] h-[100vh] absolute z-[1]"></div>
            </div>
            <Navbar />
            <div className="w-full h-full min-h-screen mb-16">
                <div className="md:flex-row flex flex-col py-4 justify-center w-full">
                    <div className="w-[40%] h-fit flex justify-center items-center rounded-2xl border-red">
                        <img
                            src={eventData?.cover}
                            alt="event img"
                            className="w-[90%] h-fit rounded-xl flex justify-center items-center mx-auto "
                        />
                    </div>
                    <div className="flex flex-col px-24 w-[60%] ">
                        <div className="flex items-center py-2  ">
                            <Image
                                src={"/icons/dollar.svg"}
                                width={20}
                                height={30}
                                alt="dollar svg"
                            />
                            <p className="font-lg pl-2">RSVP Escrow</p>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold py-2">
                                {eventData?.name} #{eventData?.tokenId}
                            </h1>
                        </div>
                        <div className="gap-2 flex flex-col">
                            <p>
                                {eventData.remaining} / {eventData.supply}
                            </p>
                            <p>
                                {eventData?.price} {currency}
                            </p>
                        </div>
                        <div className="flex flex-col py-4">
                            <div className="flex items-center mb-6">
                                {/* <Image
                                    src={"/icons/person_avatar.png"}
                                    width={50}
                                    height={30}
                                    alt="person avatar"
                                /> */}
                                <div className="h-[3rem] w-[3rem] grad1 rounded-full"></div>
                                <div className="pl-4">
                                    <p className="text-[rgba(255,255,255,0.65)] text-lg">
                                        Host
                                    </p>
                                    <p className="text-white text-lg font-semibold">
                                        {username}
                                    </p>
                                    <h3 className="text-xl">
                                        {eventData?.hostName}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex text-lg font-semibold gap-2 text-white/60"> Event Type:
                            {eventData?.isShortlist ? (
                                <p className="text-white text-xl font-bold">Private Event</p>
                            ) : (
                                <p className="text-white text-xl font-bold">Public Event</p>
                            )}
                            </div>
                        </div>
                        <div className="bg-[#1E1E1EA6] min-h-[15rem] my-4 py-4 px-6 rounded-2xl shadow-2xl ">
                            <div className="flex items-center pb-4 gap-2">
                                <img
                                    src="/map-pin.png"
                                    className="w-[5%]"
                                    alt=""
                                />
                                <h1 className="text-xl font-semibold">
                                    {eventData?.venue}
                                </h1>
                            </div>
                            <p className={`text-white mb-1 ${isOpen ? "line-clamp-none" : "line-clamp-5"}`}
                                // style={isOpen ? undefined : paragraphStyles}
                                // ref={ref}
                            >
                                {eventData?.description}
                                {/* {more} */}
                            </p>
                                <button className='text-[#3E8BFF] font-bold' onClick={()=>setIsOpen(!isOpen)}>{isOpen ? "Read Less" : "Read More"}</button>
                            {/* <Link href={"/"} className="text-[#3E8BFF] text-lg font-semibold cursor-pointer flex items-center gap-2">
                            Know More
                            <img src="/external-link.svg" alt="" />
                        </Link> */}
                        </div>
                        {eventData?.isStaking ? (
                            <button
                                className="bg-white font-semibold text-black px-4 py-2 w-1/3 rounded-xl hover:text-white hover:bg-black mx-auto"
                                onClick={() =>
                                    claim(eventData.tokenId, eventData.price)
                                }
                            >
                                Stake Now
                            </button>
                        ) : (
                            <button
                                className="bg-white font-semibold text-black px-4 py-2 w-1/3 rounded-xl hover:text-white hover:bg-black mx-auto"
                                onClick={() =>
                                    claim(eventData.tokenId, eventData.price)
                                }
                            >
                                Get Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <FooterSection />
        </div>
    );
};

export default Event;
