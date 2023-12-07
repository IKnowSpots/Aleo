"use client";
import { create_private_event, create_public_event, getValueOfField, call_hello_world, } from "@/src/workers/helper"
import { uploadToIPFS, mint } from "@/utils";
import { JSONRPCClient } from 'json-rpc-2.0';
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import Image from "next/image";
import { useState, useEffect, ChangeEvent, MouseEventHandler, DetailedHTMLProps, ButtonHTMLAttributes, MouseEvent } from "react";
import CreateNav from "@/components/dashboard/CreateNav";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import FooterSection from "@/components/landing/FooterSection";
import { text } from "stream/consumers";
import PopUp from "@/components/Popup";
import LoadingModal from "@/components/LoadingModal";
import { isImageUri } from "viem/_types/utils/ens/avatar/utils";
import { WalletMultiButton, WalletModalProvider } from '@demox-labs/aleo-wallet-adapter-reactui';
import { Account, AleoNetworkClient } from "@aleohq/sdk";
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import {
	Deployment,
	WalletAdapterNetwork,
	WalletNotConnectedError,
	Transaction,
	Transition
} from '@demox-labs/aleo-wallet-adapter-base';
import { AleoWorker } from "@/src/workers/AleoWorker";
import { PrivateKey, ProgramManager } from "@demox-labs/aleo-sdk-web";

const TESTNET3_API_URL = process.env.RPC_URL!;
// const ALEO_URL = 'https://api.explorer.aleo.org/v1/testnet3';
const ALEO_URL = 'https://localhost:3030';

const Create = (props: any) => {

	const [formInput, setFormInput] = useState({
		event_id: "",
		status: "1u8",
		supply: "",
		isShortlistEnabled: true,
		shortlisted_accounts: ["aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp", "aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c", "aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9", "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut"],
		cover: "",
		uri: "",
		claim_code: "",
		name: "",
		description: "",
		venue: "",
		date: "",
		isStakingEnabled: false,
		stakePrice: "0",
		eventPrice: "0",
		username: "consentsam",
		max_supply: ""
	});
	const { wallet, publicKey, decrypt } = useWallet();
	console.log("Wallet => ", wallet);
	useEffect(() => {
		console.log("publicKey => ", publicKey);
	}, [publicKey]);




	const toggleSwitch = () => {

		if (formInput.isShortlistEnabled == true) {
			console.log("Changing Event type to public ")
			setFormInput({ ...formInput, isShortlistEnabled: false });
		} else {
			setFormInput({ ...formInput, isShortlistEnabled: true });
			console.log("Changing Event type to private ")
		}
	};

	// console.log(formInput);

	const [loading, setLoading] = useState(false);
	const [imgLoading, setImgLoading] = useState(false);
	const [isFieldDisabled, setIsFieldDisabled] = useState(false);
	const [isButtonClicked, setIsButtonClicked] = useState(false);
	const [enableInput, setEnableInput] = useState(true);
	const [popUpVisible, setPopUpVisible] = useState(false);
	const [val, setVal] = useState("");
	const [word, setWord] = useState(0);
	let [fee, setFee] = useState<string>('4');
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const data = e.target.value.split(" ");
		// console.log(data);

		if (data.length <= 160) {
			setVal(e.target.value);
			setWord(data.length);
			if (e.target.value == "") {
				setWord(0);
			}
		} else {
			alert("you can type only 1000 characters");
		}
	};






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


	const addRecord = (local_storage_name: any, address: any, dataStr: any) => {
		const records = JSON.parse(localStorage.getItem(local_storage_name) || "{}");
		records[address] = records[address] ? [...records[address], dataStr] : [dataStr];
		localStorage.setItem(local_storage_name, JSON.stringify(records));
	};


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




	const handleCreatePrivateEvent: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
		event.preventDefault;
		// debugger;
		/* const param_event_id = formInput.event_id;
		const param_max_supply = formInput.supply;

		const privateEventCreated = await create_private_event(param_event_id, param_max_supply);
		console.log("privateEventCreated => ", privateEventCreated); */

		const aleoWorker = AleoWorker();
		console.log(`Create Event for ${formInput.event_id} with maxSupply ${formInput.supply}`);
		// debugger;
		try {
			const event_id_field = formInput.event_id + "field"
			const max_supply_u32 = formInput.supply + "u32"
			let program_name = "iknowspots_2.aleo";
			let function_name = "create_private_event";
			console.log("program_name ", program_name);
			console.log("function_name ", function_name);
			console.log("event_id_field ", event_id_field);
			console.log("max_supply_u32 ", max_supply_u32);

			const transaction_id = await aleoWorker.execute(program_name, function_name, [event_id_field, max_supply_u32]);

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
			// console.log("haha");



			let new_local_storage = [];
			if (!localStorage.getItem("eventsDetail")) {
				new_local_storage = [{ ...formInput }]
			} else {
				new_local_storage = [formInput, ...JSON.parse(localStorage.getItem("eventsDetail") || "[]")]
			}
			localStorage.setItem("eventsDetail", JSON.stringify(new_local_storage))
			let address = getValueOfField(decryptedRecord, "owner");
			/* let new_local_storage_for_records = [];
			if (!localStorage.getItem("privateRecords")) {
				new_local_storage_for_records = [{ ...decryptedRecord }]
			} else {
				new_local_storage_for_records = [decryptedRecord, ...JSON.parse(localStorage.getItem("privateRecords"))]
			} */
			addRecord("privateRecords", address, decryptedRecord);
			// localStorage.setItem("privateRecords", ))

			toast.success("Private Event Created!", {
				position: "bottom-left",
				autoClose: 5000,
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





	const handleCreatePublicEvent: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
		// debugger;
		const aleoWorker = AleoWorker();
		console.log(`Create Public Event for ${formInput.event_id} with maxSupply ${formInput.supply}`);

		const event_id_field = formInput.event_id + "field"
		const max_supply_u32 = formInput.supply + "u32"
		const claim_code_field = formInput.claim_code + "field"
		let program_name = "iknowspots_2.aleo";
		let function_name = "create_public_event";
		console.log("program_name ", program_name);
		console.log("function_name ", function_name);
		console.log("event_id_field ", event_id_field);
		console.log("max_supply_u32 ", max_supply_u32);
		console.log("claim_code_field ", claim_code_field);
		try {


			const transaction_id = await aleoWorker.execute(program_name, function_name, [event_id_field, max_supply_u32, claim_code_field]);

			const transactionUrl = "http://localhost:3030/testnet3/transaction/" + transaction_id;
			console.log("transactionUrl => ", transactionUrl)
			const data = await fetchDataUntilAvailable(transactionUrl);
			console.log("fetched data =>", data);

			let new_local_storage = [];
			if (!localStorage.getItem("eventsDetail")) {
				new_local_storage = [{ ...formInput }]
			} else {
				new_local_storage = [formInput, ...JSON.parse(localStorage.getItem("eventsDetail") || "[]")]
			}

			localStorage.setItem("eventsDetail", JSON.stringify(new_local_storage))

			toast.success("Public Event Created!", {
				position: "bottom-left",
				autoClose: 5000,
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
	}



	return (
		<>
			<LoadingModal visible={loading} />
			<div className="bg-createEvent text-white  px-8">
				<CreateNav />
				<div className="relative order-last flex shrink-0 items-center gap-3 sm:gap-6 lg:gap-8">
					<WalletMultiButton className="bg-[#1253fa]" />
				</div>
				<div className="grid grid-cols-2">
					<div className="">
						<div>
							<div className="flex flex-col w-1/2 mx-auto justify-center">
								<div className="flex items-center w-full">
									<div className="relative w-[20%] flex justify-center">
										<Link href="/dashboard/active" className="w-full p-4">
											<Image
												src={"/icons/back-btn.svg"}
												width={40}
												height={20}
												alt="back-btn"
												className="back-btn"
											/>
										</Link>
									</div>
									<p className="text-3xl my-3 ">Create an Event</p>
								</div>

								<div className="my-3 ">
									<p className="text-xl ">Upload a file</p>
									<p className="text-white opacity-40">
										Upload or choose your file to upload
									</p>
								</div>
								<label className={`flex justify-center mx-auto w-[120%] border-2 bg-[rgb(30,30,30)] bg-opacity-75 border-[#E0E0E0] border-opacity-40 border-dashed  rounded-md  cursor-pointer ${formInput.cover ? "py-8 px-8" : "py-44 px-0"} `}>
									<span className="flex items-center ">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className={`w-6 h-6 text-gray ${formInput.cover ? "hidden" : "flex"} `}
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
											/>
										</svg>
									</span>
									{imgLoading ? (
										<div>Uploading to IPFS..</div>
									) : formInput.cover == "" ? (
										<div>
											<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
												<span className="font-semibold">Click to upload</span>{" "}
												or drag and drop
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">
												SVG, PNG, JPG or GIF (MAX. 800x400px)
											</p>
										</div>
									) : (
										<div>
											<img
												src={formInput.cover}
												//   alt="uploaded-cover"
												className="rounded-lg h-[350px] w-full"
											/>
										</div>
									)}
									<input
										type="file"
										name="file_upload"
										className="hidden"
										onChange={() => { }}
										disabled={imgLoading}
									/>
								</label>
								<div className="flex justify-center mt-4 gap-4 items-center">
									<Image
										src={"/cattt.jpeg"}
										width={60}
										height={60}
										alt="cat"
										className="rounded-lg"
									/>
									<Image
										src={"/dash-1.jpg"}
										width={60}
										height={60}
										alt="cat"
										className="rounded-lg"
									/>
									<Image
										src={"/dash-2.jpg"}
										width={60}
										height={60}
										alt="cat"
										className="rounded-lg"
									/>
									<Image
										src={"/dash-3.jpg"}
										width={60}
										height={60}
										alt="cat"
										className="rounded-lg"
									/>
									<Image
										src={"/dash-4.jpg"}
										width={60}
										height={60}
										alt="cat"
										className="rounded-lg"
									/>
									{/* <p className="text-white opacity-40">default cover image</p> */}
								</div>
							</div>
						</div>
					</div>
					<div className="py-16">
						<div className="flex flex-col w-3/4 mx-auto  ">
							<div className="py-4 flex justify-between">
								<div className="w-full flex justify-between">
									<div>
										<h3 className="text-xl">Private Event</h3>
										<p className="opacity-40">
											Community Cohesion in Private Spaces
										</p>
									</div>
									<div className={`flex items-center cursor-pointer`}>
										<div
											className={`w-12 h-6 bg-[#1E1E1E] rounded-full p-1 duration-300 ease-in-out ${formInput.isShortlistEnabled
												? "bg-green-500"
												: "bg-[#1E1E1E]"
												}`}
											onClick={toggleSwitch}
										>
											<div
												className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${formInput.isShortlistEnabled ? "translate-x-6" : ""
													}`}
											></div>
										</div>
										{/* <span className="ml-2 text-sm">{isShortlistEnabled ? 'ON' : 'OFF'}</span> */}
									</div>
								</div>
								{/* https://gdowens.github.io/react-toggle-button/ to use toggle in the actual code */}
								{/* <ToggleButton value={false} /> */}
							</div>
							<label className="pb-2">Event Name</label>
							<input
								type="text"
								id="event-name"
								placeholder="eg. name of the event"
								className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
								onChange={(e) => {
									setFormInput({
										...formInput,
										name: e.target.value,
									});
								}}
								disabled={imgLoading}
							/>

						</div>
						<div className="flex flex-col w-3/4 mx-auto my-4">
							<label className="pb-2">Event ID</label>
							<input
								type="text"
								id="event-id"
								placeholder="eg. name of the event"
								className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
								onChange={(e) => {
									setFormInput({
										...formInput,
										event_id: e.target.value,
									});
								}}
								disabled={imgLoading}
							/>
						</div>
						{!formInput.isShortlistEnabled &&
							<div className="flex flex-col w-3/4 mx-auto my-4">
								<label className="pb-2">Claim Code To Claim NFTs</label>
								<input
									type="text"
									id="event-id"
									placeholder="eg. name of the event"
									className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
									onChange={(e) => {
										setFormInput({
											...formInput,
											claim_code: e.target.value,
										});
									}}
									disabled={imgLoading}
								/>
							</div>}
						<div className="flex flex-col w-3/4 mx-auto my-4">
							<label className="pb-2">Description</label>
							<textarea
								placeholder="Description here"
								className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg resize-none p-2"
								onChange={(e) => {
									setFormInput({
										...formInput,
										description: e.target.value,
									});
									handleChange(e);
								}}
								disabled={imgLoading}
								//   change this if scroll bar is appearing
								rows={4}
							></textarea>
							<p className="right-0 text-gray-400"> {val.length}/1000</p>
						</div>

						<div className=" flex w-3/4 mx-auto  ">
							<div className="flex flex-col w-3/4 mx-auto my-4 mr-6 ">
								<label className="pb-2">Supply</label>
								<input
									type="text"
									id="event-name"
									placeholder="2000"
									className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 w-full rounded-lg p-2 "
									onChange={(e) => {
										setFormInput({
											...formInput,
											supply: e.target.value,
											max_supply: e.target.value
										})
									}

									}
									disabled={imgLoading}
								/>
							</div>
							<div className="flex flex-col w-3/4 mx-auto my-4">
								<label className="pb-2">Venue</label>
								<input
									type="text"
									id="event-name"
									placeholder="Example Text"
									className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
									onChange={(e) =>
										setFormInput({
											...formInput,
											venue: e.target.value,
										})
									}
								// disabled={imgLoading}
								/>
							</div>
						</div>
						<div className="flex flex-col w-3/4 mx-auto my-4 ">
							<label className="pb-2">Date</label>
							<input
								type="date"
								id="event-name"
								className="bg-[#E1E1E1] text-black invert bg-opacity-75 border border-[#676767] border-opacity-30  rounded-lg p-2"
								onChange={(e) =>
									setFormInput({
										...formInput,
										date: e.target.value,
									})
								}
							// disabled={imgLoading}
							/>
						</div>
						{/*  */}

						{/* <div className="flex flex-col w-3/4 mx-auto my-4 ">
              <label>Stake price</label>
              <div className="">
                <input
                  type="text"
                  id="event-name"
                  placeholder="0.01ETH"
                  className="bg-[#1E1e1ea6] rounded-lg  relative p-2"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      stakePrice: e.target.value,
                    })
                  }
                />
              </div>
            </div> */}

						{/*  */}

						<div className="w-3/4 mx-auto flex justify-evenly my-6">
							{/* <button className="px-4 py-2 border rounded-lg">
                            Preview
                        </button> */}
							<button className="px-4 py-2 border rounded-lg" onClick={formInput.isShortlistEnabled ? handleCreatePrivateEvent : handleCreatePublicEvent}>
								Create New {formInput.isShortlistEnabled ? `Private ` : `Public `}Event
							</button>

						</div>
					</div>
				</div>

				<ToastContainer
					position="top-center"
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
				{popUpVisible ? <PopUp /> : <></>}

				<FooterSection />
			</div>
		</>
	);
};

export default Create;
