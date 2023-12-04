"use client";
import { create_private_event, create_public_event, getValueOfField, call_hello_world } from "@/src/workers/helper"
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
const ALEO_URL = 'https://api.explorer.aleo.org/v1/testnet3';

const Create = () => {

  const [formInput, setFormInput] = useState({
    event_id: "",
    status: "1u32",
    supply: "",
    isShortlistEnabled: true,
    shortlisted_accounts: [],
    cover: "",
    uri: "",
    name: "",
    description: "",
    venue: "",
    date: "",
    isStakingEnabled: false,
    stakePrice: "0",
    eventPrice: "0",
  });
  const { wallet, publicKey, decrypt } = useWallet();
  console.log("Wallet => ", wallet);
  // useEffect(() => {
  //   console.log("publicKey => ", publicKey);
  // }, [publicKey]);



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

  async function localProgramExecution() {
    const aleoWorker = AleoWorker();
    const _program = `
    program helloworld_3x20drq.aleo;



    function main:
        input r0 as u32.public;
        input r1 as u32.private;
        add r0 r1 into r2;
        output r2 as u32.private;`
    console.log("point 1");
    let executionResponse: any;
    async function getResponse() {
      executionResponse = await aleoWorker.localProgramExecution(
        _program,
        "main",
        ["2u32", "3u32"],
        false,
        true,
      )
    }
    getResponse();

    setTimeout(() => {
      console.log("point 7.1")
      if (!executionResponse) {
        getResponse();
        console.log("point 7.2");
      }
    }, 800)
    console.log("point 7.3");
    console.log("executionResponse => ", executionResponse);
  }

  const handleDeployment: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setLoading(true);
    // event.preventDefault();
    if (!publicKey) throw new WalletNotConnectedError();
    const program = `program iknowspots_1.aleo;

    struct TokenId:
        data1 as u128;
        data2 as u128;

    struct BaseURI:
        data0 as u128;
        data1 as u128;
        data2 as u128;
        data3 as u128;

    struct SymbolBits:
        data as u128;

    record NFT:
        owner as address.private;
        data as TokenId.private;
        edition as scalar.private;

    record NFT_mint:
        owner as address.private;
        amount as u8.private;

    record NFT_claim:
        owner as address.private;
        claim as field.private;

    record NFT_ownership:
        owner as address.private;
        nft_owner as address.private;
        data as TokenId.private;
        edition as scalar.private;


    mapping nft_owners:
      key as field.public;
      value as address.public;


    mapping general_settings:
      key as u8.public;
      value as u128.public;


    mapping nfts_to_mint:
      key as u128.public;
      value as field.public;


    mapping claims_to_nfts:
      key as field.public;
      value as field.public;


    mapping toggle_settings:
      key as u8.public;
      value as u32.public;

    function initialize_collection:
        input r0 as u128.public;
        input r1 as u128.public;
        input r2 as BaseURI.public;
        assert.eq self.caller aleo1gy3d0s00s2k7rmgqznnx2q8htmjm2p5rk8q40u5yklqhe44utvys0dmzdy;
        async initialize_collection r0 r1 r2 into r3;
        output r3 as iknowspots_1.aleo/initialize_collection.future;

    finalize initialize_collection:
        input r0 as u128.public;
        input r1 as u128.public;
        input r2 as BaseURI.public;
        get.or_use toggle_settings[0u8] 0u32 into r3;
        and r3 1u32 into r4;
        assert.eq r4 0u32;
        set 0u128 into general_settings[0u8];
        set r0 into general_settings[1u8];
        set r1 into general_settings[2u8];
        set r2.data0 into general_settings[3u8];
        set r2.data1 into general_settings[4u8];
        set r2.data2 into general_settings[5u8];
        set r2.data3 into general_settings[6u8];
        set 5u32 into toggle_settings[0u8];
        set 0u32 into toggle_settings[1u8];


    function add_nft:
        input r0 as TokenId.public;
        input r1 as scalar.public;
        assert.eq self.caller aleo1gy3d0s00s2k7rmgqznnx2q8htmjm2p5rk8q40u5yklqhe44utvys0dmzdy;
        hash.bhp256 r0 into r2 as field;
        commit.bhp256 r2 r1 into r3 as field;
        async add_nft r3 into r4;
        output r4 as iknowspots_1.aleo/add_nft.future;

    finalize add_nft:
        input r0 as field.public;
        get toggle_settings[0u8] into r1;
        and r1 9u32 into r2;
        assert.eq r2 1u32;
        get general_settings[1u8] into r3;
        sub r3 1u128 into r4;
        set r4 into general_settings[1u8];
        get general_settings[0u8] into r5;
        set r0 into nfts_to_mint[r5];
        add r5 1u128 into r6;
        set r6 into general_settings[0u8];


    function add_minter:
        input r0 as address.private;
        input r1 as u8.public;
        assert.eq self.caller aleo1gy3d0s00s2k7rmgqznnx2q8htmjm2p5rk8q40u5yklqhe44utvys0dmzdy;
        cast r0 r1 into r2 as NFT_mint.record;
        async add_minter into r3;
        output r2 as NFT_mint.record;
        output r3 as iknowspots_1.aleo/add_minter.future;

    finalize add_minter:
        get toggle_settings[0u8] into r0;
        and r0 9u32 into r1;
        assert.eq r1 1u32;


    function update_toggle_settings:
        input r0 as u32.public;
        assert.eq self.caller aleo1gy3d0s00s2k7rmgqznnx2q8htmjm2p5rk8q40u5yklqhe44utvys0dmzdy;
        async update_toggle_settings r0 into r1;
        output r1 as iknowspots_1.aleo/update_toggle_settings.future;

    finalize update_toggle_settings:
        input r0 as u32.public;
        get toggle_settings[0u8] into r1;
        and r1 9u32 into r2;
        assert.eq r2 1u32;
        and r0 1u32 into r3;
        assert.eq r3 1u32;
        set r0 into toggle_settings[0u8];


    function set_mint_block:
        input r0 as u32.public;
        assert.eq self.caller aleo1gy3d0s00s2k7rmgqznnx2q8htmjm2p5rk8q40u5yklqhe44utvys0dmzdy;
        async set_mint_block r0 into r1;
        output r1 as iknowspots_1.aleo/set_mint_block.future;

    finalize set_mint_block:
        input r0 as u32.public;
        get toggle_settings[0u8] into r1;
        and r1 9u32 into r2;
        assert.eq r2 1u32;
        set r0 into toggle_settings[1u8];


    function update_symbol:
        input r0 as u128.public;
        assert.eq self.caller aleo1gy3d0s00s2k7rmgqznnx2q8htmjm2p5rk8q40u5yklqhe44utvys0dmzdy;
        async update_symbol r0 into r1;
        output r1 as iknowspots_1.aleo/update_symbol.future;

    finalize update_symbol:
        input r0 as u128.public;
        get toggle_settings[0u8] into r1;
        and r1 9u32 into r2;
        assert.eq r2 1u32;
        set r0 into general_settings[2u8];


    function update_base_uri:
        input r0 as BaseURI.public;
        assert.eq self.caller aleo1gy3d0s00s2k7rmgqznnx2q8htmjm2p5rk8q40u5yklqhe44utvys0dmzdy;
        async update_base_uri r0 into r1;
        output r1 as iknowspots_1.aleo/update_base_uri.future;

    finalize update_base_uri:
        input r0 as BaseURI.public;
        get toggle_settings[0u8] into r1;
        and r1 9u32 into r2;
        assert.eq r2 1u32;
        set r0.data0 into general_settings[3u8];
        set r0.data1 into general_settings[4u8];
        set r0.data2 into general_settings[5u8];
        set r0.data3 into general_settings[6u8];


    function open_mint:
        input r0 as scalar.private;
        hash.bhp256 self.caller into r1 as field;
        commit.bhp256 r1 r0 into r2 as field;
        cast self.caller r2 into r3 as NFT_claim.record;
        async open_mint r2 into r4;
        output r3 as NFT_claim.record;
        output r4 as iknowspots_1.aleo/open_mint.future;

    finalize open_mint:
        input r0 as field.public;
        get toggle_settings[1u8] into r1;
        lte r1 block.height into r2;
        assert.eq r2 true;
        get toggle_settings[0u8] into r3;
        and r3 15u32 into r4;
        assert.eq r4 3u32;
        get.or_use claims_to_nfts[r0] 0field into r5;
        assert.eq r5 0field;
        rand.chacha into r6 as u128;
        get.or_use general_settings[0u8] 0u128 into r7;
        rem r6 r7 into r8;
        get nfts_to_mint[r8] into r9;
        set r9 into claims_to_nfts[r0];
        sub r7 1u128 into r10;
        set r10 into general_settings[0u8];
        get nfts_to_mint[r10] into r11;
        set r11 into nfts_to_mint[r8];


    function mint:
        input r0 as NFT_mint.record;
        input r1 as scalar.private;
        hash.bhp256 self.caller into r2 as field;
        commit.bhp256 r2 r1 into r3 as field;
        sub r0.amount 1u8 into r4;
        cast r0.owner r4 into r5 as NFT_mint.record;
        cast r0.owner r3 into r6 as NFT_claim.record;
        async mint r3 into r7;
        output r5 as NFT_mint.record;
        output r6 as NFT_claim.record;
        output r7 as iknowspots_1.aleo/mint.future;

    finalize mint:
        input r0 as field.public;
        get toggle_settings[1u8] into r1;
        lte r1 block.height into r2;
        assert.eq r2 true;
        get toggle_settings[0u8] into r3;
        and r3 11u32 into r4;
        assert.eq r4 3u32;
        get.or_use claims_to_nfts[r0] 0field into r5;
        assert.eq r5 0field;
        rand.chacha into r6 as u128;
        get.or_use general_settings[0u8] 0u128 into r7;
        rem r6 r7 into r8;
        get nfts_to_mint[r8] into r9;
        set r9 into claims_to_nfts[r0];
        sub r7 1u128 into r10;
        set r10 into general_settings[0u8];
        get nfts_to_mint[r10] into r11;
        set r11 into nfts_to_mint[r8];


    function claim_nft:
        input r0 as NFT_claim.record;
        input r1 as TokenId.private;
        input r2 as scalar.private;
        hash.bhp256 r1 into r3 as field;
        commit.bhp256 r3 r2 into r4 as field;
        cast r0.owner r1 r2 into r5 as NFT.record;
        async claim_nft r0.claim r4 into r6;
        output r5 as NFT.record;
        output r6 as iknowspots_1.aleo/claim_nft.future;

    finalize claim_nft:
        input r0 as field.public;
        input r1 as field.public;
        get claims_to_nfts[r0] into r2;
        assert.eq r2 r1;
        set 0field into claims_to_nfts[r0];


    function authorize:
        input r0 as NFT.record;
        input r1 as u64.public;
        async authorize into r2;
        output r2 as iknowspots_1.aleo/authorize.future;

    finalize authorize:
        assert.eq 0u8 1u8;


    function transfer_private:
        input r0 as NFT.record;
        input r1 as address.private;
        cast r1 r0.data r0.edition into r2 as NFT.record;
        output r2 as NFT.record;


    function transfer_public:
        input r0 as address.private;
        input r1 as TokenId.private;
        input r2 as scalar.private;
        hash.bhp256 r1 into r3 as field;
        commit.bhp256 r3 r2 into r4 as field;
        async transfer_public r0 r4 self.caller into r5;
        output r5 as iknowspots_1.aleo/transfer_public.future;

    finalize transfer_public:
        input r0 as address.public;
        input r1 as field.public;
        input r2 as address.public;
        get nft_owners[r1] into r3;
        assert.eq r2 r3;
        set r0 into nft_owners[r1];


    function convert_private_to_public:
        input r0 as NFT.record;
        hash.bhp256 r0.data into r1 as field;
        commit.bhp256 r1 r0.edition into r2 as field;
        async convert_private_to_public r0.owner r2 into r3;
        output r3 as iknowspots_1.aleo/convert_private_to_public.future;

    finalize convert_private_to_public:
        input r0 as address.public;
        input r1 as field.public;
        set r0 into nft_owners[r1];


    function convert_public_to_private:
        input r0 as address.private;
        input r1 as TokenId.private;
        input r2 as scalar.private;
        assert.eq r0 self.caller;
        hash.bhp256 r1 into r3 as field;
        commit.bhp256 r3 r2 into r4 as field;
        cast r0 r1 r2 into r5 as NFT.record;
        async convert_public_to_private r0 r4 into r6;
        output r5 as NFT.record;
        output r6 as iknowspots_1.aleo/convert_public_to_private.future;

    finalize convert_public_to_private:
        input r0 as address.public;
        input r1 as field.public;
        get nft_owners[r1] into r2;
        assert.eq r0 r2;
        set aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc into nft_owners[r1];`

    const aleoDeployment = new Deployment(
      publicKey,
      WalletAdapterNetwork.Testnet,
      program,
      8000000,
      false
    );
    let txId: any;
    const deploy = async () => {
      txId =
        (await (wallet?.adapter as LeoWalletAdapter).requestDeploy(
          aleoDeployment
        )) || '';
    }
    deploy().finally(() => {
      console.log("Deployed with transaction id => ", txId);
      setLoading(false);
    })

    console.log("txId => ", txId);
    setLoading(false);
  };



  async function fetchDataUntilAvailable(aleo_api_url: string, maxAttempts = 20, delay = 5000) {
    try {
      const response = await fetch(aleo_api_url);
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

    return fetchDataUntilAvailable(aleo_api_url, maxAttempts - 1, delay);
  }

  const handleCreatePrivateEvent: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setLoading(true);
    if (!publicKey) throw new WalletNotConnectedError();
    const program_name = "iknowspots_1.aleo";

    // const wallet =
    const event_id = formInput.event_id + "u32";
    const max_supply = formInput.supply + "u32";


    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      program_name,
      'create_private_event',
      [event_id, max_supply],
      Math.floor(parseFloat(fee) * 1_000_000),
    );
    //     static createTransaction(address: string, chainId: string, program: string, functionName: string, inputs: any[], fee: number, feePrivate?: boolean): Transaction;


    let txId: any;
    const deploy = async () => {
      txId =
        (await (wallet?.adapter as LeoWalletAdapter).requestTransaction(
          aleoTransaction
        )) || '';
    }
    deploy().finally(() => {
      console.log("Event Creation successfully with transaction id => ", txId);
      setLoading(false);
    })

    console.log("txId => ", txId);
    setLoading(false);
  };


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
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      supply: e.target.value,
                    })
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
              {/* <button className="px-4 py-2 border rounded-lg" onClick={formInput.isShortlistEnabled ? call_create_private_event : call_create_public_event}>
                Mint
              </button> */}
              <button className="px-4 py-2 border rounded-lg" onClick={handleDeployment}>
                "handleCallFunctions"
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
