"use client";
import CardsHostee from "@/components/cardsHostee";
import Navbar from "@/components/hostee/Navbar";
import { fetchUsernameValidity, fetchActiveEventsWithInfura } from "@/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import FooterSection from "@/components/landing/FooterSection";

const EventsByHost = () => {
    // comment 88-100 and uncomment 102-166

    const pathName = usePathname();
    const id = pathName?.split("/")[1];

    const [isUsernameValid, setIsUsernameValid] = useState(false);
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
            checkUsernameValidityData();
        }
    }, [id]);

    useEffect(() => {
        if (isUsernameValid == true) {
            fetchActiveEventsData();
        }
    }, [isUsernameValid]);

    async function checkUsernameValidityData() {
        const data = await fetchUsernameValidity(id);
        setIsUsernameValid(data);
    }

    async function fetchActiveEventsData() {
        setLoading(true);
        let data: any = await fetchActiveEventsWithInfura(id);
        setActiveEvents(data);
        setLoading(false);
    }

    if (loading == true) return <div className="text-white">Fetching..</div>;

    if (loading == false && isUsernameValid == false)
        return <div className="text-white">User do not exist</div>;

    if (loading == false && isUsernameValid == true && activeEvents.length == 0)
        return (
            <Layout>
                <div className="text-white">
                    ACTIVE EVENTS <br /> No events
                </div>
            </Layout>
        );

    return (
        <Layout>
            {activeEvents.map((nft: any, i: any) => {
                return (
                    <CardsHostee
                        key={i}
                        tokenId={nft.tokenId}
                        image={nft.cover}
                        name={nft.name}
                        price={nft.price}
                        date={nft.date}
                        username={id}
                        supply={nft.supply}
                        remaining={nft.remaining}
                    />
                    
                );
            })}
             {/* <CardsHostee
                        image={"1.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={id}
                        tokenId="01"
                    />
                    <CardsHostee
                        image={"2.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={id}
                        tokenId="01"
                    />
                    <CardsHostee
                        image={"3.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={id}
                        tokenId="01"
                    />
                    <CardsHostee
                        image={"4.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={id}
                        tokenId="01"
                    />

                    <CardsHostee
                        image={"1.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={id}
                        tokenId="01"
                    />
                    <CardsHostee
                        image={"2.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={id}
                        tokenId="01"
                    />
                    <CardsHostee
                        image={"3.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={id}
                        tokenId="01"
                    />
                    <CardsHostee
                        image={"4.png"}
                        name="Lorem Ipsum"
                        price="1.20"
                        date="01.34.45"
                        username={id}
                        tokenId="01"
                    />  */}
        </Layout>
    );

    function Layout({ children }: { children: React.ReactNode }) {
        return (
            <div className="bg-[#25143a] text-white w-full overflow-hidden h-full">
                <div>
                    <div className="grad1 blur-[220px] w-[80%] h-[100vh] absolute z-[1]"></div>
                </div>
                <Navbar />
                <div className="w-100vh h-full ">
                    <div className="flex justify-between px-[6rem]  ">
                        <div className="pb-8 ">
                            <p className="w-full text-white text-[1.5rem]">
                                @{id}
                            </p>
                        </div>
                        <div className="flex justify-center items-center text-white h-[40px] border-white w-[20rem] bg-[#1C1C1C]  rounded-full px-2 py-1 ">
                            <img src="/search.png" className="w-[10%]" alt="" />
                            <input
                                type="text"
                                placeholder="Search events"
                                className="text-white h-[40px] border-white w-[18rem] bg-[#1C1C1C] rounded-full px-4"
                            />
                        </div>
                    </div>

                    <div className=" flex gap-x-[2rem] gap-y-[3rem] flex-wrap pt-4 px-[7rem] pb-[5rem] ">
                        {children}
                    </div>
                </div>
                {/* <FooterSection/> */}
            </div>
        );
    }
};

export default EventsByHost;
