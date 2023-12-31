/* eslint-disable @next/next/no-img-element */
"use client";
import Navbar from "@/components/hostee/Navbar";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { fetchAllEventsWithUsername } from "@/utils";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { currency } from "@/config";
import Link from "next/link";
import FooterSection from "@/components/landing/FooterSection";
import LoadingModal from "@/components/LoadingModal";
import { AleoWorker } from "@/src/workers/AleoWorker";
const paragraphStyles = {
    WebkitLineClamp: 5,
    // WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box'
}

const Event = () => {
    const pathName = usePathname();
    const username = pathName?.split("/")[1];
    console.log("username => ", username);
    const event_id = pathName?.split("/")[3];
    console.log("event_id => ", event_id);


    const [eventData, setEventData] = useState({
        event_id: "",
        status: "1u8",
        supply: "",
        isShortlistEnabled: true,
        shortlisted_accounts: [],
        cover: "/sample-img.png",
        uri: "",
        claim_code: "",
        name: "",
        description: "",
        venue: "",
        date: "",
        isStakingEnabled: false,
        stakePrice: "0",
        eventPrice: "0",
        hostName: username,
        username: username,
        max_supply: ""
    });
    const [loading, setLoading] = useState(false);
    const [claimCode, setClaimCode] = useState("");

    /* useEffect(() => {
        fetchActiveEventsData();
        // console.log("fetchActiveEventsData => ", fetchActiveEventsData);
    }, []); */

    useEffect(() => {
        fetchActiveEventsData();
        // Function to read data from local storage
        const loadData = () => {
            const storedData = localStorage.getItem('eventsDetail');
            if (storedData) {
                // Parse the stored data back into an array/object
                const parsedData = JSON.parse(storedData);
                // Set the data to state
                setEventData(parsedData);
            }
        };

        // Call the function
        loadData();
    }, []);



    const [isOpen, setIsOpen] = useState(false);



    async function fetchActiveEventsData() {
        // console.log("This is being called here ");
        setLoading(true);
        let fetchedEvents: any = await fetchAllEventsWithUsername(username);
        console.log("fetchedEvents => ", fetchedEvents);
        let event;
        const loadData = () => {
            const storedData = localStorage.getItem('eventsDetail');
            if (storedData) {
                // Parse the stored data back into an array/object
                const parsedData = JSON.parse(storedData);
                if (parsedData) {
                    event = parsedData.find((obj: any) => obj.event_id == event_id);
                    setEventData(event);
                }

                // Set the data to state

            }
        };

        // Call the function
        loadData();
        // if (fetchedEvents)
        //     event = fetchedEvents.find((obj: any) => obj.event_id == event_id);
        // setEventData(event);
        console.log("event", event);
        if (event) {
        }
        setLoading(false);
    }

    async function fetchDataUntilAvailable(url: any, maxAttempts = 6, delay = 8000) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                // You can adjust this condition as needed, based on the expected data format
                if (data && !data.error) {
                    return data;
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        if (maxAttempts <= 1) {
            throw new Error("Couldn't fetch data - something went wrong");
        }

        await new Promise(resolve => setTimeout(resolve, delay));

        return fetchDataUntilAvailable(url, maxAttempts - 1, delay);
    }

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





    function searchRecordByEventId(records: any, event_id: any) {
        for (const address in records) {
            const matchedRecord = records[address].find((record: any) => getValueOfField(record, 'event_id') === event_id);
            if (matchedRecord) {
                return matchedRecord;
            }
        }
        return null;
    }

    // Delete a record by event ID
    function deleteRecordByEventId(records: any, event_id: any) {
        Object.keys(records).forEach(address => {
            records[address] = records[address].filter((record: any) => getValueOfField(record, 'event_id') !== event_id);
        });
    }

    function addRecordToLocalStorage(local_storage_name: any, addressKey: any, newRecord: any) {
        const records = JSON.parse(localStorage.getItem(local_storage_name) || "{}");
        records[addressKey] = records[addressKey] ? [...records[addressKey], newRecord] : [newRecord];
        localStorage.setItem(local_storage_name, JSON.stringify(records));
    }

    function searchRecordsInLocalStorage(local_storage_name: any, addressKey: any, fieldName: any, fieldValue: any) {
        const records = JSON.parse(localStorage.getItem(local_storage_name) || "{}");
        const recordEntry = records[addressKey];

        if (!recordEntry) {
            return []; // Address not found, return empty array
        }

        return recordEntry.filter((recordString: any) => {
            const value = getValueOfField(recordString, fieldName);
            return value === fieldValue;
        });
    }

    // function searchEventStateFromLocalStorage(addressKey: any, fieldName: any, fieldValue: any) {
    //     const records = JSON.parse(localStorage.getItem("eventsDetail") || "{}");
    //     /* const recordEntry = records[addressKey];

    //     if (!recordEntry) {
    //         return []; // Address not found, return empty array
    //     }

    //     return recordEntry.filter((recordString: any) => {
    //         const value = getValueOfField(recordString, fieldName);
    //         return value === fieldValue;
    //     });

    // }

    function deleteRecordFromLocalStorage(local_storage_name: any, addressKey: any, fieldName: any, fieldValueToDelete: any) {
        const records = JSON.parse(localStorage.getItem(local_storage_name) || "{}");
        const recordEntry = records[addressKey];

        if (!recordEntry) {
            return; // Address not found, nothing to delete
        }

        records[addressKey] = recordEntry.filter((recordString: any) => {
            const value = getValueOfField(recordString, fieldName);
            return value !== fieldValueToDelete;
        });

        localStorage.setItem(local_storage_name, JSON.stringify(records));
    }

    function getAndDeleteRecordByField(local_storage_name: any, eventId: any, userAddress: any) {
        // Fetch records from local storage
        const records = JSON.parse(localStorage.getItem(local_storage_name) || "{}");
        console.log("records inside getAndDeleteRecordByField => ", records);
        const modifiedEventId = eventId.endsWith() == "field" ? eventId : eventId + "field";
        console.log("modifiedEventId => ", modifiedEventId);
        console.log("eventId => ", eventId);
        // Search for the record
        const searchedEvent = searchAndDeleteRecord(records, userAddress, modifiedEventId);
        console.log("searchedEvent => ", searchedEvent);
        // Update local storage
        const new_records = JSON.parse(localStorage.getItem(local_storage_name) || "{}");
        localStorage.setItem(local_storage_name, JSON.stringify(new_records));

        if (!searchedEvent) {
            throw new Error('Record with that event_id not found');
        }

        return searchedEvent;
    }

    function searchAndDeleteRecord(records: any, address: any, event_id: any) {
        const recordEntry = records[address];
        if (!recordEntry) {
            return null; // Address not found, no record to return or delete
        }

        let foundRecord = null;
        records[address] = recordEntry.filter((recordString: any) => {
            const eventIDValue = getValueOfField(recordString, 'event_id');
            const isMatch = eventIDValue === event_id;

            if (isMatch) {
                foundRecord = recordString; // Store the record to return
            }

            return !isMatch; // Keep the record in the array if it's not a match
        });

        return foundRecord;
    }

    const addRecordToEventPasses = (address: any, eventPassDataStr: any) => {
        const records = JSON.parse(localStorage.getItem('eventPasses') || "{}");
        records[address] = records[address] ? [...records[address], eventPassDataStr] : [eventPassDataStr];
        localStorage.setItem('eventPasses', JSON.stringify(records));
    };

    async function handleClaimPrivateNFT(event_id: any, user_address: any) {


        const aleoWorker = AleoWorker();
        console.log(`Minting an NFT for Private Event ${event_id}`);
        // debugger;

        const event_id_field = event_id.endsWith() == "field" ? event_id : event_id + "field";
        // const max_supply_u32 = formInput.supply + "u32"
        let program_name = "iknowspots_2.aleo";
        let function_name = "claim_private_event";
        console.log("program_name ", program_name);
        console.log("function_name ", function_name);
        console.log("event_id_field ", event_id_field);
        console.log("eventPasses in local storage as => ", JSON.parse(localStorage.getItem('eventPasses') || "{}"));


        const eventPass = getAndDeleteRecordByField("eventPasses", event_id, user_address);
        console.log("eventPass => ", eventPass);
        if (!eventPass) {
            throw new Error("Couldn't find a pass for the event with event id => ", event_id);
        }

        try {


            const transaction_id = await aleoWorker.execute(program_name, function_name, [eventPass]);

            const transactionUrl = "http://localhost:3030/testnet3/transaction/" + transaction_id;
            console.log("transactionUrl => ", transactionUrl)
            const data = await fetchDataUntilAvailable(transactionUrl);
            console.log("data => ", data);
            // console.log("type of data is => ", typeof (data));
            let record;
            try {
                record = data.execution.transitions[0].outputs[0].value;
                console.log("record ", record);
            } catch (error) {
                console.error("Record cannot be extracted from the fetched response")
            }

            const decryptedRecord = await aleoWorker.decrypt_record(record);
            console.log("decryptedRecord => ", decryptedRecord);
            let address = getValueOfField(decryptedRecord, "owner");


            addRecordToLocalStorage("NFTs", address, decryptedRecord);
            // localStorage.setItem("privateRecords", ))
            /*
            const data = await fetchDataUntilAvailable(transactionUrl);
            console.log("data => ", data);
            const old_supply = getValueInEventsDetailByEventId(event_id, "supply");
            const max_supply = getValueInEventsDetailByEventId(event_id, "max_supply");
            // const fetchedRecord = getAndDeleteRecordByField("eventsDetail", event_id, user_address);
            updateSingleEventField(event_id, "supply", old_supply - 1);
            const event_name = getValueInEventsDetailByEventId(event_id, "name");
            console.log("event_name => ", event_name);
            const false_string = "false";
            const newRecord = `{owner: ${user_address}.private,  event_id: ${event_id_field}.private,  max_supply: ${max_supply}u32.private, name: ${event_name}.private, isShortlistEnabled: ${false_string}.private }`;
            saveToLocalStorage("NFTs", user_address, newRecord);
             */
            toast.success("Private Event NFT Claimed!", {
                position: "bottom-left",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            addRecordToLocalStorage("eventPasses", user_address, eventPass);
            console.error("Error in handleClaimPrivateNFT function ", error);
            addRecordToEventPasses(user_address, eventPass);
        }
        return null;
    }

    /* function getAndDeleteRecordByField(local_storage_name: any, eventId: any, userAddress: any) {
        // Fetch records from local storage
        const records = JSON.parse(localStorage.getItem(local_storage_name) || "{}");
        console.log("records inside getAndDeleteRecordByField => ", records);
        const modifiedEventId = eventId.endsWith() == "field" ? eventId : eventId + "field";
        console.log("modifiedEventId => ", modifiedEventId);
        console.log("eventId => ", eventId);
        // Search for the record
        const searchedEvent = searchAndDeleteRecord(records, userAddress, modifiedEventId);
        console.log("searchedEvent => ", searchedEvent);
        // Update local storage
        const new_records = JSON.parse(localStorage.getItem(local_storage_name) || "{}");
        localStorage.setItem(local_storage_name, JSON.stringify(new_records));

        if (!searchedEvent) {
            throw new Error('Record with that event_id not found');
        }

        return searchedEvent;
    } */

    function updateSingleEventField(eventId: any, fieldName: any, newValue: any) {
        console.log("eventId => ", eventId);
        // Retrieve the current events from local storage
        const events = JSON.parse(localStorage.getItem('eventsDetail') || '[]');

        // Find the event with the matching event_id
        const eventIndex = events.findIndex((event: any) => event.event_id === eventId);

        // Check if the event is found
        if (eventIndex !== -1) {
            // Update the specific field of the event
            events[eventIndex][fieldName] = newValue;

            // Save the updated events array back to local storage
            localStorage.setItem('eventsDetail', JSON.stringify(events));
        } else {
            console.error('Event not found');
        }
    }

    function getValueInEventsDetailByEventId(eventId: any, fieldName: any) {
        // Retrieve the events array from local storage
        const events = JSON.parse(localStorage.getItem('eventsDetail') || '[]');

        // Find the event with the matching event_id
        const event = events.find((event: any) => event.event_id === eventId);

        // Check if the event is found and the field exists
        if (event && fieldName in event) {
            // Return the value of the specified field
            return event[fieldName];
        } else {
            // Return null or throw an error if event is not found or field does not exist
            console.error('Event not found or field does not exist');
            return null;
        }
    }


    function saveToLocalStorage(local_storage_name: any, address: any, record: any) {
        // Retrieve existing data from local storage or initialize an empty object
        const existingData = JSON.parse(localStorage.getItem(local_storage_name) || "{}");

        // Check if the address already exists in the data
        if (existingData[address]) {
            // If it exists, append the new record to the array for that address
            existingData[address].push(record);
        } else {
            // If it doesn't exist, create a new array with the record
            existingData[address] = [record];
        }

        // Save the updated data back to local storage
        localStorage.setItem(local_storage_name, JSON.stringify(existingData));
    }



    function getEventName(event_id: any) {
        const allEvents = JSON.parse(localStorage.getItem("eventsDetail") || "[]");
        if (allEvents.length > 0) {
            const filteredArray = allEvents.filter(
                (subarray: any) =>
                    // subarray.status =="1u8" &&
                    subarray.event_id == event_id
            );
            console.log("filteredArray => ", filteredArray);
            return filteredArray.name;
        }
        return null;
    }

    async function handleClaimPublicNFT(event_id: any, claim_code: any, user_address: any) {


        const aleoWorker = AleoWorker();
        console.log(`Minting an NFT for Public Event ${event_id}`);
        // debugger;

        const event_id_field = event_id.endsWith() == "field" ? event_id : event_id + "field";
        const claim_code_field = claim_code.endsWith() == "field" ? claim_code : claim_code + "field";
        // const max_supply_u32 = formInput.supply + "u32"
        let program_name = "iknowspots_2.aleo";
        let function_name = "claim_public_event";
        console.log("program_name ", program_name);
        console.log("function_name ", function_name);
        console.log("event_id_field ", event_id_field);

        // debugger;
        try {

            const transaction_id = await aleoWorker.execute(program_name, function_name, [event_id_field, claim_code_field]);

            const transactionUrl = "http://localhost:3030/testnet3/transaction/" + transaction_id;
            console.log("transactionUrl => ", transactionUrl)

            const data = await fetchDataUntilAvailable(transactionUrl);
            console.log("data => ", data);
            const old_supply = getValueInEventsDetailByEventId(event_id, "supply");
            const max_supply = getValueInEventsDetailByEventId(event_id, "max_supply");
            // const fetchedRecord = getAndDeleteRecordByField("eventsDetail", event_id, user_address);
            updateSingleEventField(event_id, "supply", old_supply - 1);
            const event_name = getValueInEventsDetailByEventId(event_id, "name");
            console.log("event_name => ", event_name);
            const false_string = "false";
            const newRecord = `{owner: ${user_address}.private,  event_id: ${event_id_field}.private,  max_supply: ${max_supply}u32.private, name: ${event_name}, isShortlistEnabled: ${false_string} }`;
            saveToLocalStorage("NFTs", user_address, newRecord);


            /*


            {
            owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,
            event_id: 11u32.private,
            status: 1u32.private,
            max_supply: 111u32.private,
            shortlisted: {
                addr0: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,
                addr1: aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9.private,
                addr2: aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c.private,
                addr3: aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp.private
            },
            _nonce: 6824693696704378489474296855031414529416577986306679321674021009829907431876group.public
            }

            */

            toast.success("Public Event NFT Minted!", {
                position: "bottom-left",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.error("Error in createEvent function ", error);
        }
        return null;
    }

    function isTyoeOfEventPrivateByEventID(event_id: any, address: any) {
        const event = searchRecordsInLocalStorage("eventsDetail", address, "isShortlistEnabled", event_id);
        console.log("event => ", event);
        return event.isShortlistEnabled;
    }

    function getIsShortlistEnabled(arr: any, eventId: any) {
        // Find the element in the array where the event_id matches the provided eventId
        const event = arr.find((item: any) => item.event_id === eventId);
        console.log("Event inside getIsShortlistEnabled => ", event);
        // If the event is found, return the value of isShortlistEnabled
        if (event) {
            console.log("event.isShortlistEnabled => ", event.isShortlistEnabled);
            return event.isShortlistEnabled;
        } else {
            // Handle the case where no matching event_id is found
            console.log('No event found with the provided event_id');
            return null;
        }
    }

    async function claim(event_id: any, user_address: any, claim_code: any) {
        // if (claim_code == "") { }
        // await buyTicket(username, event_id);
        const allEventDetails = JSON.parse(localStorage.getItem("eventsDetail") || "[]");
        console.log("allEventDetails => ", allEventDetails);
        console.log("")
        getIsShortlistEnabled(allEventDetails, event_id) ? handleClaimPrivateNFT(event_id, user_address).then(() => console.log("Private Event NFT Minted")) : handleClaimPublicNFT(event_id, claim_code, user_address).then(() => console.log("Public Event NFT Minted"));
        // console.log("NFT Minted");
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
                            src={eventData?.cover ? "" : "/sample-img.png"}
                            alt="event img"
                            className="w-[90%] h-fit rounded-xl flex justify-center items-center mx-auto "
                        />
                    </div>
                    <div className="flex flex-col px-24 w-[60%] ">
                        {/*  <div className="flex items-center py-2  ">
                            <Image
                                src={"/icons/dollar.svg"}
                                width={20}
                                height={30}
                                alt="dollar svg"
                            />
                            <p className="font-lg pl-2">RSVP Escrow</p>
                        </div> */}
                        <div>
                            <h1 className="text-2xl font-bold py-2">
                                {eventData?.name} #{eventData?.event_id}
                            </h1>
                        </div>
                        <div className="gap-2 flex flex-col">
                            <p>
                                Max Supply {eventData.max_supply}
                            </p>
                            {/*  <p>
                                {eventData?.price} {currency}
                            </p> */}
                        </div>
                        <div className="flex flex-col py-4">
                            <div className="flex items-center mb-6">
                                <Image
                                    src={"/icons/person_avatar.png"}
                                    width={50}
                                    height={30}
                                    alt="person avatar"
                                />
                                <div className="h-[3rem] w-[3rem] grad1 rounded-full"></div>
                                <div className="pl-4">
                                    <p className="text-[rgba(255,255,255,0.65)] text-lg">
                                        Host {eventData.hostName}
                                    </p>
                                    <p className="text-white text-lg font-semibold">
                                        {eventData.username}
                                    </p>
                                    <h3 className="text-xl">
                                        {eventData.hostName}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex text-lg font-semibold gap-2 text-white/60"> Event Type:
                                {eventData?.isShortlistEnabled === true ? (
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
                            <button className='text-[#3E8BFF] font-bold' onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Read Less" : "Read More"}</button>
                            {/* <Link href={"/"} className="text-[#3E8BFF] text-lg font-semibold cursor-pointer flex items-center gap-2">
                            Know More
                            <img src="/external-link.svg" alt="" />
                        </Link> */}
                        </div>
                        {
                            getIsShortlistEnabled(JSON.parse(localStorage.getItem("eventsDetail") || "[]"), event_id) == false && (<input
                                type="text"
                                id="event-name"
                                placeholder="Enter the claim code for this event NFT mint"
                                className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
                                onChange={(e) => setClaimCode(e.target.value)}
                            />)
                        }

                        <button
                            className="bg-white font-semibold text-black px-4 py-2 w-1/3 rounded-xl hover:text-white hover:bg-black mx-auto"
                            onClick={() => {
                                console.log("event_id => ", event_id);
                                console.log("claimCode => ", claimCode);
                                claim(event_id, "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut", claimCode);
                            }
                            }
                        >
                            Mint NFT
                        </button>

                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <FooterSection />
        </div >
    );
};

export default Event;
