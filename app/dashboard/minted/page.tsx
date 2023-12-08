"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Image from "next/image";
import CardsMinted from "@/components/cardsMinted";
import DashNav from "@/components/dashboard/Navbar";
import { useEffect, useState } from "react";
// import { fetchMintedCollection } from "../../../utils";
import LoadingModal from "@/components/LoadingModal";

const MintedCollections = () => {
    const [mintedCollection, setMintedCollection] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // fetchMintedCollectionData();
        console.log("Updated mintedCollection: ", mintedCollection);
        console.log("isArray => ", Array.isArray(mintedCollection));
    }, [mintedCollection]);




    useEffect(() => {
        // Function to read data from local storage
        const loadData = () => {
            const storedData = localStorage.getItem('NFTs');
            if (storedData) {
                // Parse the stored data back into an array/object
                const parsedData = JSON.parse(storedData);
                // Set the data to state
                const key = "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut";
                const array_of_nfts = parsedData[key];
                console.log("Parsed data inside load effect ", array_of_nfts);
                setMintedCollection(array_of_nfts.map((recordString: any) => transformRecord(recordString)));
                // setMintedCollection(array_of_nfts);

            }
        };

        // Call the function
        loadData();
    }, []);


    function getValueOfField(recordString: string, fieldName: string) {
        try {
            // Look for the field in the string using a regular expression
            const regex = new RegExp(fieldName + "\\s*:\\s*([\\w\\.]+)");
            const match = regex.exec(recordString);

            if (match && match[1]) {
                return match[1].split('.')[0]; // Split at '.' and return the first part
            }
        } catch (error) {
            console.error('Error parsing record:', error);
        }
        return null;
    }

    function modifiedGetValueOfField(recordString: any, fieldName: any) {
        try {
            // Modified regular expression to capture the field value including spaces
            const regex = new RegExp(fieldName + "\\s*:\\s*([\\w\\s\\.]+)", "i");
            const match = recordString.match(regex);

            if (match && match[1]) {
                return match[1].trim(); // Return the captured field value, trimming any leading/trailing whitespace
            }
        } catch (error) {
            console.error('Error parsing record:', error);
        }
        return null;
    }


    /* // Function to transform the data
    function transformData(dataArray: any) {
        return dataArray.map((recordString: any) => {
            return {
                owner: getValueOfField(recordString, "owner"),
                event_id: getValueOfField(recordString, "event_id"),
                max_supply: getValueOfField(recordString, "max_supply"),
                is_private_event: getValueOfField(recordString, "is_private_event"),
                // You might need to adjust these fields based on how you want to use them
                // and what data is available in your original string
                date: "", // Date needs to be provided or parsed if available in the data
                name: modifiedGetValueOfField(recordString, "name"), // Name needs to be provided or parsed if available in the data
                cover: "", // Cover image URL needs to be provided or parsed if available in the data
                isShortlistEnabled: getValueOfField(recordString, "is_private_event") == "false" ? false : true,
            };
        });
    } */

    function transformRecord(recordString: string) {
        return {
            owner: getValueOfField(recordString, "owner"),
            event_id: getValueOfField(recordString, "event_id")?.split('u32')[0],
            max_supply: getValueOfField(recordString, "max_supply")?.split('u32')[0],
            isShortlistEnabled: getValueOfField(recordString, "isShortlistEnabled") === "true",
            name: modifiedGetValueOfField(recordString, "name"),
            date: "", // Assuming date is not available in the string, you need to provide it
            cover: "", // Assuming cover is not available in the string, you need to provide it
        };
    }




    /* async function fetchMintedCollection() {
        let allEvents = JSON.parse(localStorage.getItem("NFTs") || "[]");
        console.log("allEvents => ", allEvents);
        console.log("allEvents inside fetchMintedCollection => ", allEvents);
        console.log("allEvents[0] =>  ", allEvents[Object.keys(allEvents)[0]]);

        // allEvents
        return allEvents[Object.keys(allEvents)[0]];// hardcoded as first key is my address

    }


    async function fetchMintedCollectionData() {
        try {
            setLoading(true);
            let data: any = await fetchMintedCollection();
            console.log("data inside fetchMintedCollectionData => ", data);
            const transformed_data = transformData(data);
            console.log("transformed_data => ", transformed_data);
            // console.log("type of transformed_data => ", (transformed_data));
            console.log("Before setMintedCollection on data", mintedCollection);
            setMintedCollection(transformed_data);
            // console.log("After setMintedCollection on data", mintedCollection);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
 */
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

    if (loading == false && mintedCollection != undefined && mintedCollection.length == 0)
        return (
            <Layout>
                {/* <div className="text-white p-4">No Events</div> */}
                <div className="flex justify-center items-center mt-10 mb-10">
                    <Image
                        src={"/nominted-banner.svg"}
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
            <div className="flex gap-x-6 gap-y-5 flex-wrap pt-4 px-6">
                {Array.isArray(mintedCollection) ? mintedCollection.map((nft: any, i: any) => {
                    return (
                        <CardsMinted
                            isShortlistEnabled={nft?.isShortlistEnabled}
                            date={nft?.date}
                            setMintedCollection={setMintedCollection}
                            key={i}
                            image={nft?.cover}
                            name={nft?.name}
                            event_id={nft?.event_id}
                            max_supply={nft?.max_supply}
                        />
                    );
                }) : ""}
                {/* <CardsMinted tokenId="01" image={"3.png"} name="Lorem Ipsum" />
                        <CardsMinted tokenId="01" image={"3.png"} name="Lorem Ipsum" />
                        <CardsMinted tokenId="01" image={"3.png"} name="Lorem Ipsum" />
                        <CardsMinted tokenId="01" image={"3.png"} name="Lorem Ipsum" />
                        <CardsMinted tokenId="01" image={"3.png"} name="Lorem Ipsum" />
                        <CardsMinted tokenId="01" image={"3.png"} name="Lorem Ipsum" /> */}

                {/* <div className="">
                        <Calender className="rounded-xl py-8 px-2 items-center bg-black text-center justify-around " />
                    </div> */}
            </div>
        </Layout>
    );

    function Layout({ children }: { children: React.ReactNode }) {
        return (
            <div className="flex w-full">
                <Sidebar />
                <div className="bg-[#25143a] w-[80%] min-h-screen overflow-y-auto">
                    <DashNav />
                    <div className="px-12 ">
                        <div className="bg-createEvent blur-[220px] absolute w-[70%] h-[75vh] z-[-1]" />
                        <p className="text-white font-semibold pl-4 pt-2">
                            MINTED NFTs
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
};

export default MintedCollections;
