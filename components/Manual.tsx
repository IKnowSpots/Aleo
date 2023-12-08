import { AleoWorker } from "@/src/workers/AleoWorker";
import { updateShortlist } from "@/utils";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Manual(event_id: any) {
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [whiteListAddresses, setWhiteListAddresses] = useState(["aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp", "aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c", "aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9", "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut"]);

    const updateWhitelistAtIndex = (index: any, value: any) => {
        if (value.length != 63) {
            alert("Address should be of length 63");
        }
        // Create a copy of the current whiteList array
        const newWhitelist = [...whiteListAddresses];

        // Update the value at the specified index
        newWhitelist[index] = value;

        // Update the state with the new array
        setWhiteListAddresses(newWhitelist);
    };
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

    function addRecordToLocalStorage(local_storage_name: any, addressKey: any, newRecord: any) {
        const records = JSON.parse(localStorage.getItem(local_storage_name) || "{}");
        records[addressKey] = records[addressKey] ? [...records[addressKey], newRecord] : [newRecord];
        localStorage.setItem(local_storage_name, JSON.stringify(records));
    }

    function addRecordToLocalStorageEventPasses(addressKey: any, newRecord: any) {

        const records = JSON.parse(localStorage.getItem("eventPasses") || "{}");
        records[addressKey] = records[addressKey] ? [...records[addressKey], newRecord] : [newRecord];
        localStorage.setItem("eventPasses", JSON.stringify(records));
    }

    function getAndDeleteRecordByField(local_storage_name: any, eventId: any, userAddress: any) {
        // Fetch records from local storage

        const records = JSON.parse(localStorage.getItem(local_storage_name) || "{}");
        const modifiedEventId = eventId + "field";
        console.log("local_storage_name => ", local_storage_name);
        console.log("eventId => ", eventId);
        console.log("modifiedEventId => ", modifiedEventId);
        console.log("userAddress => ", userAddress);
        console.log("records => ", records);

        // Search for the record
        const searchedEvent = searchAndDeleteRecord(records, userAddress, modifiedEventId);

        console.log("searchedEvent => ", searchedEvent);
        // Update local storage
        localStorage.setItem(local_storage_name, JSON.stringify(records));

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
            const eventIDValue = getValueOfField(recordString, 'event_id')?.split(".field")[0];
            const isMatch = eventIDValue === event_id;

            if (isMatch) {
                foundRecord = recordString; // Store the record to return
            }

            return !isMatch; // Keep the record in the array if it's not a match
        });

        return foundRecord;
    }
    function updateRecordWhileShortlisting(event_id: any, new_state: any) {
        /* let old_event_record = getARecordCorrespondingToAnEventCreation(event_id);
        console.log("old_event_record => ", old_event_record);
        const old_event_record_with_status = "status: " + old_state;
        const record_updated_with_status = "status: " + new_state;
        const updated_event_record = old_event_record.replace(old_event_record_with_status, record_updated_with_status);
        console.log("New updated record => ", updated_event_record);
        addRecordToEventRecords(old_event_record.owner, updated_event_record); */
        const events = JSON.parse(localStorage.getItem('eventsDetail') || "{}") || {};
        const modifiedEventId = event_id;
        console.log("events inside updateRecordWhileShortlisting=> ", events);

        // Find and update the specific event
        const updatedEvents = events.map((event: any) => {
            if (event.event_id == event_id) {
                return { ...event, shortlisted_accounts: new_state };
            }
            return event;
        });
        console.log("updatedEvents inside updateRecordWhileShortlisting => ", updatedEvents);

        // Save the updated array back to local storage
        localStorage.setItem('eventsDetail', JSON.stringify(updatedEvents));

    }

    async function updateShortlistCall(event_id: any) {

        const event_id_from_event_id_object = event_id.event_id;
        // event.preventDefault;
        setLoading(true);
        console.log("event_id inside  updateShortlistCall => ", event_id_from_event_id_object)

        const aleoWorker = AleoWorker();
        console.log(`Updating Shortlist for Event ${event_id_from_event_id_object}`);
        const event_id_field = event_id_from_event_id_object + "field"
        let program_name = "iknowspots_2.aleo";
        let function_name = "set_shortlist";
        console.log("program_name ", program_name);
        console.log("function_name ", function_name);
        console.log("event_id_field ", event_id_field);

        const eventRecord = getAndDeleteRecordByField("privateRecords", event_id_from_event_id_object, "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut")
        console.log("eventRecord => ", eventRecord);
        // debugger;
        if (!eventRecord) {
            throw new Error("You are not authorized to access the event with event id => ", event_id_from_event_id_object);
        }
        try {

            const transaction_id = await aleoWorker.execute(program_name, function_name, [eventRecord, whiteListAddresses[0], whiteListAddresses[1], whiteListAddresses[2], whiteListAddresses[3]]);

            const transactionUrl = "http://localhost:3030/testnet3/transaction/" + transaction_id;
            console.log("transactionUrl => ", transactionUrl)
            const data = await fetchDataUntilAvailable(transactionUrl);
            console.log("data => ", data);
            // console.log("type of data is => ", typeof (data));
            let event_record;
            try {
                event_record = data.execution.transitions[0].outputs[0].value;
                console.log("event_record ", event_record);
            } catch (error) {
                console.error("Event Record cannot be extracted from the fetched response")
            }
            let eventpass_record;
            try {
                eventpass_record = data.execution.transitions[0].outputs[4].value;
                console.log("eventpass_record ", eventpass_record);
            } catch (error) {
                console.error("Event Record cannot be extracted from the fetched response")
            }


            const decryptedEventRecord = await aleoWorker.decrypt_record(event_record);
            console.log("decryptedEventRecord => ", decryptedEventRecord);
            const decryptedEventPassRecord = await aleoWorker.decrypt_record(eventpass_record);
            console.log("decryptedEventPassRecord => ", decryptedEventPassRecord);
            let address = getValueOfField(decryptedEventRecord, "owner");


            // const extracted_record =
            console.log("address => ", address);
            addRecordToLocalStorage("privateRecords", address, decryptedEventRecord);
            // addRecordToLocalStorage("eventsDetail", address, decryptedEventRecord);
            searchAndDeleteRecord(JSON.parse(localStorage.getItem("eventPasses") || "{}"), address, event_id);
            addRecordToLocalStorage("eventPasses", address, decryptedEventPassRecord);
            updateRecordWhileShortlisting(event_id_from_event_id_object, whiteListAddresses);
            // localStorage.setItem("privateRecords", ))

            toast.success("Shortlisted Account updated!", {
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
            addRecordToLocalStorage("privateRecords", address, eventRecord);
            console.error("Error in createEvent function ", error);
        }
    }


    return (
        <div className="flex flex-col justify-center items-center mt-8 gap-10">
            <div className="w-full flex flex-col">
                <label className="pb-3 text-[1.5rem] font-semibold">
                    Wallet Address
                </label>
                <input
                    type="text"
                    id="event-name"
                    placeholder="Wallet Address"
                    className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
                    onChange={(e) => updateWhitelistAtIndex(0, e.target.value)}
                    required={true}
                />
                <input
                    type="text"
                    id="event-name"
                    placeholder="Wallet Address"
                    className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
                    onChange={(e) => updateWhitelistAtIndex(1, e.target.value)}
                    required={true}
                />
                <input
                    type="text"
                    id="event-name"
                    placeholder="Wallet Address"
                    className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
                    onChange={(e) => updateWhitelistAtIndex(2, e.target.value)}
                    required={true}
                />
                <input
                    type="text"
                    id="event-name"
                    placeholder="Wallet Address"
                    className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
                    onChange={(e) => updateWhitelistAtIndex(3, e.target.value)}
                    required={true}

                />

                <p className="text-white/50 mt-1">
                    Enter wallet address to be added to shortlist
                </p>
            </div>


            <div className="w-[60%]">
                <button
                    className="w-full subscribe-button hover:bg-[#44444400] px-5 py-1"
                    onClick={() => updateShortlistCall(event_id)}
                >
                    Update
                </button>
            </div>
        </div>
    );
}
