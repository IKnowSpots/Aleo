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
    // const toggleInput = () => {
    //   setEnableInput(!enableInput);
    // };
    // const handleBothClicks = () => {
    //   setIsButtonClicked(!isButtonClicked);
    //   setIsFieldDisabled((prev) => !prev);
    // };

    // const enableButton = () => {
    //   setEnableInput(true);
    //   setFormInput({ ...formInput, isStakingEnabled: true });
    // };

    // const disableButton = () => {
    //   setEnableInput(false);
    //   setFormInput({ ...formInput, isStakingEnabled: false, stakePrice: "0" });
    // };

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





    async function fetchDataUntilAvailable(aleo_api_url: string, maxAttempts = 10, delay = 10000) {
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

    /* const getClient = (apiUrl: string) => {
      const client = new JSONRPCClient((jsonRPCRequest: any) =>
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ ...jsonRPCRequest })
        }).then((response: any) => {
          if (response.status === 200) {
            // Use client.receive when you received a JSON-RPC response.
            return response.json().then((jsonRPCResponse: any) => client.receive(jsonRPCResponse));
          } else if (jsonRPCRequest.id !== undefined) {
            return Promise.reject(new Error(response.statusText));
          }
        })
      );
      return client;
    }; */

    /*  async function getTransactionsForProgram(programId: string, functionName: string, apiUrl: string): Promise<any> {
       const client = getClient(apiUrl);
       const transaction = await client.request('transactionsForProgram', {
         programId,
         functionName,
         "page": 0,
         "maxTransactions": 1000
       });
       return transaction;
     }

     async function getTransaction(apiUrl: string, transactionId: string): Promise<any> {
       const transactionUrl = `${apiUrl}/transaction`;
       const response = await fetch(`${transactionUrl}/${transactionId}`);
       if (!response.ok) {
         throw new Error('Transaction not found');
       }
       const transaction = await response.json();
       return transaction;
     } */

    // export async const handleSubmit(event: MouseEventHandler<HTMLButtonElement>) => {
    /* const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      setLoading(true);
      // event.preventDefault();
      if (!publicKey) throw new WalletNotConnectedError();
      const program = `
       program iknowspots_2.aleo;

       struct AddressStruct:
           addr0 as address;
           addr1 as address;
           addr2 as address;
           addr3 as address;

       record Event:
           owner as address.private;
           event_id as field.private;
           status as u8.private;
           max_supply as u32.private;
           shortlisted as AddressStruct.private;

       struct EventStruct:
           is_private as boolean;
           event_owner as address;
           event_id as field;
           status as u8;
           max_supply as u32;
           claim_code_hash as field;

       record NFT:
           owner as address.private;
           event_id as field.private;

       record EventPass:
           owner as address.private;
           event_id as field.private;
           max_supply as u32.private;

       record EventNFT:
           owner as address.private;
           event_id as field.private;
           max_supply as u32.private;


       mapping event_id_hash_to_event_struct:
         key as field.public;
         value as EventStruct.public;


       mapping event_id_hash_to_claim_count:
         key as field.public;
         value as u32.public;


       mapping hoho_event_plus_id_self_caller:
         key as address.public;
         value as boolean.public;

       closure hash_of_two_into_address:
           input r0 as field;
           input r1 as address;
           cast r1 into r2 as field;
           add r0 r2 into r3;
           hash.bhp256 r3 into r4 as address;
           output r4 as address;


       function create_private_event:
           input r0 as field.private;
           input r1 as u32.private;
           cast aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9 aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp into r2 as AddressStruct;
           hash.bhp256 r0 into r3 as field;
           call hash_of_two_into_address r3 self.caller into r4;
           cast self.caller r3 0u8 r1 r2 into r5 as Event.record;
           async create_private_event r3 r4 into r6;
           output r5 as Event.record;
           output r6 as iknowspots_2.aleo/create_private_event.future;

       finalize create_private_event:
           input r0 as field.public;
           input r1 as address.public;
           contains event_id_hash_to_event_struct[r0] into r2;
           not r2 into r3;
           assert.eq r3 true;
           cast true r1 r0 3u8 0u32 0field into r4 as EventStruct;
           set r4 into event_id_hash_to_event_struct[r0];


       function create_public_event:
           input r0 as field.private;
           input r1 as u32.private;
           input r2 as field.private;
           hash.bhp256 r0 into r3 as field;
           hash.bhp256 r2 into r4 as field;
           cast false self.caller r3 1u8 r1 r4 into r5 as EventStruct;
           async create_public_event r5 into r6;
           output true as boolean.private;
           output r6 as iknowspots_2.aleo/create_public_event.future;

       finalize create_public_event:
           input r0 as EventStruct.public;
           contains event_id_hash_to_event_struct[r0.event_id] into r1;
           not r1 into r2;
           assert.eq r2 true;
           set r0 into event_id_hash_to_event_struct[r0.event_id];
           set 0u32 into event_id_hash_to_claim_count[r0.event_id];


       function toggle_private_event:
           input r0 as Event.record;
           input r1 as u8.private;
           assert.eq r0.owner self.caller;
           lt r0.status 2u8 into r2;
           assert.eq r2 true;
           cast self.caller r0.event_id r1 r0.max_supply r0.shortlisted into r3 as Event.record;
           output r3 as Event.record;


       function toggle_public_event:
           input r0 as field.private;
           input r1 as u8.private;
           async toggle_public_event r0 r1 self.caller into r2;
           output true as boolean.private;
           output r2 as iknowspots_2.aleo/toggle_public_event.future;

       finalize toggle_public_event:
           input r0 as field.public;
           input r1 as u8.public;
           input r2 as address.public;
           contains event_id_hash_to_event_struct[r0] into r3;
           assert.eq r3 true;
           get event_id_hash_to_event_struct[r0] into r4;
           lt r4.status 2u8 into r5;
           assert.eq r5 true;
           assert.eq r4.event_owner r2;
           cast false r4.event_owner r4.event_id r1 r4.max_supply r4.claim_code_hash into r6 as EventStruct;
           set r6 into event_id_hash_to_event_struct[r0];


       function set_shortlist:
           input r0 as Event.record;
           input r1 as address.private;
           input r2 as address.private;
           input r3 as address.private;
           input r4 as address.private;
           assert.neq r1 r2;
           assert.neq r1 r3;
           assert.neq r1 r4;
           assert.neq r2 r3;
           assert.neq r2 r4;
           assert.neq r3 r4;
           assert.eq self.signer r0.owner;
           cast r1 r2 r3 r4 into r5 as AddressStruct;
           cast r1 r0.event_id r0.max_supply into r6 as EventPass.record;
           cast r2 r0.event_id r0.max_supply into r7 as EventPass.record;
           cast r3 r0.event_id r0.max_supply into r8 as EventPass.record;
           cast r4 r0.event_id r0.max_supply into r9 as EventPass.record;
           cast r0.owner r0.event_id r0.status r0.max_supply r5 into r10 as Event.record;
           output r10 as Event.record;
           output r6 as EventPass.record;
           output r7 as EventPass.record;
           output r8 as EventPass.record;
           output r9 as EventPass.record;


       function claim_private_event:
           input r0 as EventPass.record;
           assert.eq r0.owner self.caller;
           cast self.caller r0.event_id r0.max_supply into r1 as EventNFT.record;
           output r1 as EventNFT.record;


       function claim_public_event:
           input r0 as field.private;
           input r1 as field.private;
           call hash_of_two_into_address r0 self.caller into r2;
           hash.bhp256 r1 into r3 as field;
           async claim_public_event r0 r2 r3 into r4;
           output true as boolean.private;
           output r4 as iknowspots_2.aleo/claim_public_event.future;

       finalize claim_public_event:
           input r0 as field.public;
           input r1 as address.public;
           input r2 as field.public;
           contains event_id_hash_to_event_struct[r0] into r3;
           assert.eq r3 true;
           get event_id_hash_to_event_struct[r0] into r4;
           lt r4.status 2u8 into r5;
           assert.eq r5 true;
           contains hoho_event_plus_id_self_caller[r1] into r6;
           not r6 into r7;
           assert.eq r7 true;
           get event_id_hash_to_claim_count[r0] into r8;
           get event_id_hash_to_event_struct[r0] into r9;
           lt r8 r9.max_supply into r10;
           assert.eq r10 true;
           get event_id_hash_to_event_struct[r0] into r11;
           assert.eq r2 r11.claim_code_hash;
           set true into hoho_event_plus_id_self_caller[r1];
           add r8 1u32 into r12;
           set r12 into event_id_hash_to_claim_count[r0];
       `;

      const aleoDeployment = new Deployment(
        publicKey,
        WalletAdapterNetwork.Testnet,
        program,
        20000000,
      );
      let txId;
      const deploy = async () => {
        txId =
          (await (wallet?.adapter as LeoWalletAdapter).requestDeploy(
            aleoDeployment
          )) || '';
      }
      deploy().finally(() => {
        setLoading(false);
      })

      // const
      // setTransactionId(txId);
      console.log("txId => ", txId);
      // setLoading(false);
    }; */
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        setLoading(true);
        const program = `
        program helloworld_3x20drq.aleo;



        function main:
            input r0 as u32.public;
            input r1 as u32.private;
            add r0 r1 into r2;
            output r2 as u32.private;`

        if (!publicKey) throw new WalletNotConnectedError();

        const aleoDeployment = new Deployment(
            publicKey,
            WalletAdapterNetwork.Testnet,
            program,
            Math.floor(parseFloat(fee) * 1_000_000),
            false
        );

        /* const functionOutput = new Transition(
          program,
          "main",
          ["1u32", "2u32"]
        ) */

        console.log("aleoDeployment =>", aleoDeployment);

        const txId =
            (await (wallet?.adapter as LeoWalletAdapter).requestDeploy(
                aleoDeployment
            )) || '';
        // setTransactionId(txId);
        console.log("txId => ", txId);
        setLoading(true);
    };

    async function getTransactionDetails(deployTxId: string): Promise<any> {
        // const response = await fetch(`${ALEO_URL}find/transactionID/deployment/${programId}`);
        // const deployTxId = await response.json();
        const txResponse = await fetch(`${ALEO_URL}transaction/${deployTxId}`);
        const tx = await txResponse.json();
        return tx;
    }

    const decryptCipher = async (ciphertext: any) => {
        // const ciphertext = "your-ciphertext-here";
        const password = "";

        if (!publicKey) throw new WalletNotConnectedError();

        if (decrypt) {
            const decryptedPayload = await decrypt(ciphertext, password);
            alert("Decrypted payload: " + decryptedPayload);
        }
    };

    const handleCallFunctions: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        // const handleCallFunctions = async (event: MouseEventHandler<HTMLButtonElement>) => {
        if (!publicKey) throw new WalletNotConnectedError();
        const transactionUrl = `${ALEO_URL}/transaction`;
        const tx_id = "at1xmvflek0k2mqhmpck68gk69lx3cd6xr34wqsy0h6p4eg0a9ve5zq3w3aj6";
        const completeURL = (`${transactionUrl}/${tx_id}`);
        console.log("completeURL =>", completeURL);
        const data = await fetchDataUntilAvailable(completeURL);
        console.log("data fetched =>", data);
        // const tx_details = await getTransactionDetails("at1dv9x8tcjpweudg6dwe2f32mmlswykfruxxxjac7asayu68747qgqhengq6");
        // console.log("tx_details => ", tx_details);

        let owner = await data.owner;

        console.log("owner => ", owner);
        // Convert to JSON string
        const jsonString = JSON.stringify(data);
        console.log("JSON String:", jsonString);

        // Convert back to an object
        const jsonObject = JSON.parse(jsonString);
        console.log("JSON Object:", jsonObject);
        const _dummy = jsonObject.execution.transitions[0].inputs[1].value;
        console.log("Specific field =>", _dummy);

        console.log("decryptCipher => ", await decryptCipher(_dummy));
        // console.log("tx_details => ", tx_details);

        // const all_records = (await (wallet?.adapter as LeoWalletAdapter).requestRecordPlaintexts(
        //   "helloworld_3x20drp.aleo"
        // )) || '';
        // console.log("all_records ", all_records);
        // /*
        //     const transactionUrl = "http://localhost:3030/testnet3/transaction/" + tx_id;
        //     console.log("transactionUrl => ", transactionUrl)
        //     const data = await fetchDataUntilAvailable(transactionUrl);
        //     const record = data.execution.transitions[0].outputs[0].value;
        //     console.log("record ", record);
        //     const decryptedRecord = await aleoWorker.decrypt_record(record);
        //  */
        // // console.log("all  records ", all_records);
        // // const tx_details = await getTransaction("https://testnet3.aleorpc.com", txId);
        // // console.log("tx_details => ", tx_details);
        // const decryptPermission = (wallet?.adapter as LeoWalletAdapter).decryptPermission
        //   || '';
        // // setTransactionId(txId);
        // console.log("decryptPermission => ", decryptPermission);

    }


    async function localProgramExecution() {
        // const programManager = new ProgramManager();

        // Create a temporary account for the execution of the program
        // const account = new Account();
        // static executeFunctionOffline(private_key: PrivateKey, program: string, _function: string, inputs: Array<any>, prove_execution: boolean, cache: boolean, imports?: object, proving_key?: ProvingKey, verifying_key?: VerifyingKey, url?: string, offline_query?: OfflineQuery): Promise<ExecutionResponse>;

        // const privateKey = PrivateKey.from_string("APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc");

        const _program = `
    program helloworld_3x20drq.aleo;



    function main:
        input r0 as u32.public;
        input r1 as u32.private;
        add r0 r1 into r2;
        output r2 as u32.private;`

        const executionResponse = await ProgramManager.executeFunctionOffline(
            PrivateKey.from_string("APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc"),
            _program,
            "main",
            ["1u32", "2u32"],
            false,
            true,
        )

        // console.log()
        //   program,
        //   aleoFunction,
        //   inputs,
        //   false,
        // );
        // console.log(executionResponse.getOutputs());
    }

    const handleCallFunction2: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        /* setLoading(true);
        if (!publicKey) throw new WalletNotConnectedError();
        // const handleCallFunctions = async (event: MouseEventHandler<HTMLButtonElement>) => {
        try {
          console.log("Reaching till here")
          const local_execution_result = await call_hello_world(1, 2);
          console.log("local_execution_result => ", local_execution_result);
        } catch (error) {
          console.log("Error in  handleCallFunction2 => ", error);
        }
        // console.log("inside handleCallFunction2")
        setLoading(false); */

        const aleoWorker = AleoWorker();

        console.log("aleoWorker => ", aleoWorker);
        try {
            const hello_world_program = `
        program helloworld_3x20drq.aleo;
        function main:
          input r0 as u32.public;
          input r1 as u32.private;
          add r0 r1 into r2;
          output r2 as u32.private;`
            const input1 = "2u32";
            const input2 = "3u32";
            console.log("Starting local work");
            const result = await aleoWorker.executeOffline(hello_world_program, "main", [input1, input2]);
            console.log("fetched result ", result);
            console.log("fetched result[0]", result[0]);

            return result[0];
        } catch (error) {
            console.error("Error in call_hello_world:", error);
            // You can throw the error again or handle it as needed
            throw error;
        }
    }

    // const { publicKey, decrypt } = useWallet();

    const decrypt_record = async (cipherText: string) => {
        // const cipherText = "record....";
        if (!publicKey) throw new WalletNotConnectedError();
        if (decrypt) {
            const decryptedPayload = await decrypt(cipherText);

            alert("Decrypted payload: " + decryptedPayload);
            return decryptedPayload;

        }
        return null
    };





    /*  async function formURI() {
       let { event_id, shortlisted_accounts, name, description, venue, date, supply, cover } = formInput;
       if (event_id || shortlisted_accounts || !name || !description || !venue || !date || !supply) return;
       console.log(cover);
       if (cover == "") {
         cover =
           "https://ipfs.io/ipfs/bafybeiheek47zlbg5kklzdz572mm7pu7men2xo5pra3cslbqplkda2qphq/cat.jpeg";
       }
       const data = JSON.stringify({ event_id, shortlisted_accounts, name, description, venue, date, cover });
       const files = [new File([data], "data.json")];
       const metaCID = await uploadToIPFS(files);
       const url = `https://ipfs.io/ipfs/${metaCID}/data.json`;
       setFormInput({ ...formInput, uri: url });
       console.log(url);
       // return url;
     } */

    async function changeImage(e: any) {
        setImgLoading(true);
        const inputFile = e.target.files[0];
        const inputFileName = e.target.files[0].name;
        const files = [new File([inputFile], inputFileName)];
        console.log(inputFile)
        const metaCID = await uploadToIPFS(files);
        const url = `https://ipfs.io/ipfs/${metaCID}/${inputFileName}`;
        console.log(url);
        setFormInput({ ...formInput, cover: url });
        setImgLoading(false);
    }


    // async function call_create_private_event() {
    //   // try {
    //   setLoading(true);

    //   // const event_details_uri = await formURI();
    //   let event_id = (formInput.event_id);
    //   let max_supply = (formInput.supply);
    //   // let floatNumber = parseFloat(formInput.stakePrice);

    //   const createPrivateEvent = await create_private_event(event_id, max_supply);
    //   let event_to_push = {
    //     event_id: createPrivateEvent.event_id,
    //     status: "0u32",
    //     supply: createPrivateEvent.max_supply,
    //     isShortlistEnabled: true,
    //     shortlisted_accounts: createPrivateEvent.shortlisted,
    //     cover: "",
    //     uri: "",
    //     name: "",
    //     description: "",
    //     venue: "",
    //     date: "",
    //     isStakingEnabled: false,
    //     stakePrice: "0",
    //     eventPrice: "0",
    //   }

    //   console.log("createPrivateEvent => ", getValueOfField(createPrivateEvent, "shortlisted"));
    //   console.log("createPrivateEvent.shortlisted_accounts => ", createPrivateEvent.shortlisted);
    //   // console.log("Publish ",createPrivateEvent);
    //   setLoading(false);
    //   // return createPrivateEvent;
    // }

    /* async function call_create_public_event() {
      // try {
      setLoading(true);

      // const event_details_uri = await formURI();
      let event_id = (formInput.event_id);
      let max_supply = (formInput.supply);
      // let floatNumber = parseFloat(formInput.stakePrice);

      const createPublicEvent = await create_public_event(event_id, max_supply);
      console.log("createPublicEvent => ", createPublicEvent);
      // console.log("Publish ",createPrivateEvent);
      setLoading(false);
    } */
    // const getLayout = Component.getLayout ?? ((page) => page);


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
                            <button className="px-4 py-2 border rounded-lg" onClick={handleSubmit}>
                                "CallButton"
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
