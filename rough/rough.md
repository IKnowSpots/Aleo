"use client";
import { create_private_event } from "@/src/workers/helper"

import Image from "next/image";
import { useState, useEffect } from "react";
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
import { uploadToIPFS } from "@/utils";

const Create = () => {
  const [formInput, setFormInput] = useState({
    event_id: 1,
    max_supply: 100 ,
    status: "1u32",
    is_shortlist_enabled: true,
    shortlisted_accounts: [],
    cover: "",
    uri: ""
  });

  const toggleSwitch = () => {
    if (formInput.is_shortlist_enabled == true) {
      setFormInput({ ...formInput, is_shortlist_enabled: false });
      // console.log("private event")
    } else {
      setFormInput({ ...formInput, is_shortlist_enabled: true });
    }
  };

  // console.log(formInput);

  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [enableInput, setEnableInput] = useState(true);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const toggleInput = () => {
    setEnableInput(!enableInput);
  };

  const [val, setVal] = useState("");
  const [word, setWord] = useState(0);
  // localStorage.setItem("some_key","10");
  // localStorage.getItem("some_key");


  async function formURI() {
    let { event_id, max_supply, status, is_shortlist_enabled, shortlisted_accounts,cover } = formInput;
    if (!event_id || !max_supply || !status || !is_shortlist_enabled || !shortlisted_accounts) return;
    console.log(cover);
    if (cover == "") {
      cover =
        "https://ipfs.io/ipfs/bafybeiheek47zlbg5kklzdz572mm7pu7men2xo5pra3cslbqplkda2qphq/cat.jpeg";
    }
    const data = JSON.stringify({ event_id,  status, max_supply, is_shortlist_enabled, shortlisted_accounts,cover });
    const files = [new File([data], "data.json")];
    const metaCID = await uploadToIPFS(files);
    const url = `https://ipfs.io/ipfs/${metaCID}/data.json`;
    setFormInput({ ...formInput, uri: url });
    console.log(url);
    return url;
  }

  async function changeImage(e: any) {
    setImgLoading(true);
    const inputFile = e.target.files[0];
    const inputFileName = e.target.files[0].name;
    const files = [new File([inputFile], inputFileName)];
    const metaCID = await uploadToIPFS(files);
    const url = `https://ipfs.io/ipfs/${metaCID}/${inputFileName}`;
    console.log(url);
    setFormInput({ ...formInput, cover: url });
    setImgLoading(false);
  }

  async function publish() {
    // try {
    // setLoading(true);

    // const event_details_uri = await formURI();
    let event_id = (formInput.event_id).toString();
    let max_supply = (formInput.max_supply).toString();
    // let floatNumber = parseFloat(formInput.stakePrice);

    const createPrivateEvent = await create_private_event(event_id,max_supply);
    // console.log("Publish ",createPrivateEvent);

  }

  // function callPublish()

  return (
    <>
      {/* // <LoadingModal visible={loading} /> */}
      <div className="bg-createEvent text-white  px-8">
        <CreateNav />
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
                <label className={`flex justify-center mx-auto w-[120%] border-2 bg-[rgb(30,30,30)] bg-opacity-75 border-[#E0E0E0] border-opacity-40 border-dashed  rounded-md  cursor-pointer ${formInput.cover ? "py-8 px-8" : "py-44 px-0" } `}>
                  <span className="flex items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-6 h-6 text-gray ${formInput.cover ? "hidden" : "flex" } `}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                    onChange={changeImage}
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
                  <p className="text-white opacity-40">default cover image</p>
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
                      Display this on feature section of landing page.
                    </p>
                  </div>
                  <div className={`flex items-center cursor-pointer`}>
                    <div
                      className={`w-12 h-6 bg-[#1E1E1E] rounded-full p-1 duration-300 ease-in-out ${
                        formInput.is_shortlist_enabled
                          ? "bg-green-500"
                          : "bg-[#1E1E1E]"
                      }`}
                      onClick={toggleSwitch}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                          formInput.is_shortlist_enabled ? "translate-x-6" : ""
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
                placeholder="event id"
                className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
                onChange={(e) => {
                  setFormInput({
                    ...formInput,
                    event_id: parseInt(e.target.value)
                  });
                }}
                disabled={imgLoading}
              />
            </div>

            <div className=" flex w-3/4 mx-auto  ">
              <div className="flex flex-col w-3/4 mx-auto my-4 mr-6 ">
                <label className="pb-2">Supply</label>
                <input
                  type="text"
                  id="event-name"
                  placeholder="2000"
                  className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 w-full rounded-lg p-2 "
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      max_supply: parseInt(e.target.value),
                    })
                  }
                  disabled={imgLoading}
                />
              </div>
            </div>

            <div className="w-3/4 mx-auto flex justify-evenly my-6">
              {/* <button className="px-4 py-2 border rounded-lg">
                            Preview
                        </button> */}
              <button className="px-4 py-2 border rounded-lg" onClick={publish}>
                Create An Event
              </button>
              {/* <PopUp/> */}
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






------

program iknowspots_2.aleo {

    struct AddressStruct{
        addr0:address,
        addr1:address,
        addr2:address,
        addr3:address
    }

  	struct EventStruct{
        is_private: bool,
        event_owner: address,
        event_id: field,
        status: u8,
        max_supply: u32,
        claim_code_hash: field,
    }

    record Event{
        owner: address,
        event_id:field,
        status:u8,
        max_supply: u32,
        shortlisted: AddressStruct
    }

    record EventPass{
        owner: address,
        event_id: field,
        max_supply:u32
    }

    record EventNFT{
        owner: address,
        event_id: field,
        max_supply:u32,
        is_private_event: bool
    }

    mapping event_id_to_event_struct : field => EventStruct;
    mapping event_id_to_claim_count : field => u32;
    mapping hoho_event_id_plus_self_caller : address => bool;

	// --------------------------------------------------
  	// Helper function
  	// --------------------------------------------------
    function hash_of_two_into_address(event_id_hash: field, caller_public_key: address ) -> address{}

  	// --------------------------------------------------
  	// Event Creation functions
  	// --------------------------------------------------
    transition create_private_event(event_id: field,max_supply:u32)-> Event{}
    finalize create_private_event (event_id: field,hash_of_event_id_hash_and_owner_public_address_hash: address){}

    transition create_public_event(event_id: field,max_supply:u32, claim_code : field)->bool{}
    finalize create_public_event(public_event: EventStruct){}

  	// --------------------------------------------------
  	// Event Status Toggle functions
  	// --------------------------------------------------
    transition toggle_private_event(event: Event,toggle_value:u8) -> Event{}

    transition toggle_public_event(event_id: field,toggle_value: u8)-> public bool{}
    finalize toggle_public_event(event_id: field,toggle_value : u8,caller_public_key: address){}

    // --------------------------------------------------
  	// Shortlist function
  	// --------------------------------------------------
    transition set_shortlist(event: Event, addr0: address,addr1: address,addr2: address,addr3: address) -> (Event, EventPass,EventPass,EventPass,EventPass){}

	// --------------------------------------------------
  	// Claim NFT functions
  	// --------------------------------------------------
    transition claim_private_event(event_pass: EventPass)-> EventNFT{}

    transition claim_public_event(event_id: field,claim_code: field)-> bool{}
    finalize claim_public_event (event_id: field, hash_of_hash_of_event_id_self_caller:address,claim_code_hash:field){}

}
