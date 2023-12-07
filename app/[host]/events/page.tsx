"use client";
import CardsHostee from "@/components/cardsHostee";
import Navbar from "@/components/hostee/Navbar";
import {
    fetchUsernameValidityInfura,
    fetchActiveEventsWithUsername,
} from "@/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import FooterSection from "@/components/landing/FooterSection";
import LoadingModal from "@/components/LoadingModal";

const EventsByHost = () => {
    // comment 88-100 and uncomment 102-166

    const pathName = usePathname();
    const id = pathName?.split("/")[1];
    console.log("id => ", id);

    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [activeEvents, setActiveEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(`${id}`);
    const [hostAddress, setHostAddress] = useState<String | undefined>();
    const [shortPublicKey, setPublicKey] = useState<String>();

    function shortenString(input: String, maxLength: any) {
        if (input.length <= maxLength) {
            return input;
        } else {
            const firstPart = input.slice(0, maxLength / 2);
            const lastPart = input.slice(-maxLength / 2);
            let finalString = firstPart + "..." + lastPart;
            setPublicKey(finalString);
        }
    }

    useEffect(() => {
        if (id) {
            fetch();
        }
    }, [id]);

    async function fetch() {
        setLoading(true);
        const data = await fetchUsernameValidityInfura(id);
        if (data == true) {
            let data: any = await fetchActiveEventsWithUsername(id);
            setActiveEvents(data);
            console.log("data inside if condition => ", data);
        }
        console.log("data outside if condition => ", data);
        setIsUsernameValid(data)
        setLoading(false);
    }

    if (loading == true)
        return (
            // <LoadingModal visible={true}/>
            null
        );

    if (loading == false && isUsernameValid == false)
        return (
            <div className="text-white">
                <Layout>User do not exist</Layout>
            </div>
        );

    if (loading == false && isUsernameValid == true && activeEvents != undefined && (activeEvents.length) == 0)
        return (
            <Layout>
                <div className="text-white">
                    ACTIVE EVENTS <br /> No events
                </div>
            </Layout>
        );

    return (
        <Layout>
            {Array.isArray(activeEvents) && activeEvents.map((nft: any, i: any) => {
                return (
                    <CardsHostee
                        key={i}
                        event_id={nft.event_id}
                        image={nft.cover}
                        name={nft.name}
                        date={nft.date}
                        username={id}
                        supply={nft.supply}
                    />
                );
            })}


        </Layout>
    );

    function Layout({ children }: { children: React.ReactNode }) {
        return (
            <div className="bg-[#25143a] text-white w-full overflow-hidden h-full">
                <div>
                    <div className="grad1 blur-[220px] w-[80%] h-[100vh] absolute z-[1]"></div>
                </div>
                <Navbar />
                <div className="w-full h-full min-h-screen ">
                    <div className="flex justify-between px-[6rem]  ">
                        <div className="pb-8 ">
                            <div className="cursor-pointer text-white bg-[#070708] py-2 text-base font-semibold flex items-center gap-2 pl-5 pr-3 border border-transparent rounded-full hover:bg-white hover:text-black">
                                <p className="">@{username}</p>
                                <div className="h-[1.5rem] w-[1.5rem] grad1 rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center text-white h-[40px] border-white w-[20rem] bg-[#070708]  rounded-full px-2 py-1 ">
                            <img src="/search.svg" className="w-[10%]" alt="" />
                            <input
                                type="text"
                                placeholder="Search events"
                                className="text-white h-[40px] border-white w-[18rem] bg-[#070708] rounded-full px-4"
                            />
                        </div>
                    </div>

                    <div className=" flex gap-x-[1.5rem] gap-y-[2rem] flex-wrap pt-4 px-[7rem] pb-[5rem] ">
                        {children}
                    </div>
                </div>
                <FooterSection />
            </div>
        );
    }
};

export default EventsByHost;
