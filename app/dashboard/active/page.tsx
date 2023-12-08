"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Image from "next/image";
import CardsActive from "@/components/cardsActive";
import DashNav from "@/components/dashboard/Navbar";
import { useEffect, useState } from "react";
import { fetchActiveEvents } from "@/utils";
import LoadingModal from "@/components/LoadingModal";

const ActiveEvents = () => {
    // to run this page static comment 42-51 and uncomment 52-57

    const [activeEvents, setActiveEvents] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchActiveEventsData();
    }, []);

    async function fetchActiveEventsData() {
        console.log(" fetchActiveEventsData has been called");
        try {
            setLoading(true);
            let data: any = await fetchActiveEvents();
            console.log("data inside fetchActiveEvents => ", data);
            setActiveEvents(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    function CreateButton() {
        return (
            <a href="/dashboard/create">
                <div className="create-event-btn text-[0.8rem] flex justify-around w-[10rem] mx-auto px-4 py-2 border rounded-xl z-[10]">
                    <Image
                        src={"/icons/qr.svg"}
                        width={20}
                        height={20}
                        alt="qr code svg"
                        className=""
                    />
                    <p className="z-[10] text-white">Create an Event</p>
                </div>
            </a>
        );
    }

    if (loading == true)
        return (
            <Layout>
                {/* <div className="text-white">Fetching..</div> */}
                {/* // <LoadingModal visible={true}/> */}
            </Layout>
        );
    // console.log("activeEvents => ", activeEvents ? "YES" : "NO");
    if (loading == false && (activeEvents == undefined || activeEvents.length == 0))
        return (
            <Layout>
                {/* <div className="text-white p-4">No Events</div> */}
                {/* <p>something</p> */}
                <div className="flex justify-center items-center mt-10 mb-10">
                    <Image
                        src={"/noactive-banner.svg"}
                        width={17}
                        height={20}
                        alt="back-btn"
                        className="w-[30%] h-fit"
                    />
                </div>
                <div>
                    <CreateButton />
                </div>
            </Layout>
        );

    return (
        <Layout>
            <div className="flex gap-x-6 gap-y-5 flex-wrap pt-4 px-6 ">

                {Array.isArray(activeEvents) ? activeEvents.map((nft: any, i: any) => {
                    return (
                        <CardsActive

                            setActiveEvents={setActiveEvents}
                            isShortlistEnabled={nft.isShortlistEnabled}
                            key={i}
                            date={nft?.date}
                            event_id={nft?.event_id}
                            image={nft?.cover}
                            name={nft?.name}
                            max_supply={nft?.max_supply}
                        />
                    );
                }) : ""}
                {/* <CardsMinted tokenId="01" image={"3.png"} name="Lorem Ipsum" />
                        <CardsActive tokenId="01" image={"3.png"} name="Lorem Ipsum" />
                        <CardsActive tokenId="01" image={"3.png"} name="Lorem Ipsum" />
                        <CardsActive tokenId="01" image={"3.png"} name="Lorem Ipsum" />
                        <CardsActive tokenId="01" image={"3.png"} name="Lorem Ipsum" />
                        <CardsActive tokenId="01" image={"3.png"} name="Lorem Ipsum" /> */}

                {/* <div className="">
                        <Calender className="rounded-xl py-8 px-2 items-center bg-black text-center justify-around " />
                    </div> */}
            </div>
        </Layout>
    );

    function Layout({ children }: { children: React.ReactNode }) {
        return (
            <div className="w-full flex">
                <Sidebar />
                <div className="bg-[#25143a] w-[80%] min-h-screen overflow-y-auto">
                    <DashNav />
                    <div className="px-12">
                        <div className="bg-createEvent blur-[220px] absolute w-[70%] h-[75vh] z-[-1]" />

                        <p className="text-white font-semibold pl-4 pt-2">
                            ACTIVE EVENTS
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
};

export default ActiveEvents;
