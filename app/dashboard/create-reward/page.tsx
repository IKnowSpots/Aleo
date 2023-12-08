/* eslint-disable @next/next/no-img-element */
"use client";
import { uploadToIPFS, mintReward } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import CreateNav from "@/components/dashboard/CreateNav";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterSection from "@/components/landing/FooterSection";
import CreateRewardPopup from "@/components/CreateRewardPopup";
import Select from "react-select";
import { redirect } from "next/navigation";
import { text } from "stream/consumers";
import ValueType from "react-select";

interface Option {
  value: string;
  imageUrl: string;
}

const Create = () => {
  const options: Option[] = [
    { value: "Matic", imageUrl: "/matic.png" },
    { value: "Ethereum", imageUrl: "/ethereum.png" },
    // { value: "Option 3", imageUrl: "/rewardmockup.png" },
  ];

  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      background: "#1E1E1E",
      border: "1px solid rgba(152, 152, 152, 0.3) ",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 1px #1E1E1E" : "none",
      cursor: "pointer",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      color: "black",
      cursor: "pointer",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      color: "white", // Set the text color
    }),
  };

  const handleOp = (option: any) => {
    if (option && !Array.isArray(option)) {
      setSelectedOption(option);
    }
  };

  const [formInput, setFormInput] = useState({
    supply: "",
    name: "",
    isCryptoBound: false,
    price: "0",
    cover: "",
    // uri: "",
  });

  console.log(formInput);

  const [isInputEnabled, setIsInputEnabled] = useState(false);

  // const handleToggle = () => {
  //     setIsInputEnabled(!isInputEnabled);
  // };

  const handleToggle = () => {
    if (formInput.isCryptoBound == true) {
      setFormInput({ ...formInput, isCryptoBound: true });
    } else {
      setFormInput({ ...formInput, isCryptoBound: false });
    }
  };

  // console.log(formInput);

  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [enableInput, setEnableInput] = useState(true);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const toggleInput = () => {
    setEnableInput(!enableInput);
  };

  const [val, setVal] = useState("");
  const [word, setWord] = useState(0);

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

  async function formURI() {
    // console.log("1")
    let { supply, name, isCryptoBound, price, cover } = formInput;
    // console.log("2")
    if (!supply || !name) return;
    // console.log("3")
    if (cover == "") {
      console.log("4");
      cover =
        "https://ipfs.io/ipfs/bafybeiheek47zlbg5kklzdz572mm7pu7men2xo5pra3cslbqplkda2qphq/cat.jpeg";
    }
    // console.log("5")
    const data = JSON.stringify({ supply, name, isCryptoBound, cover });
    // console.log("6")
    const files = [new File([data], "data.json")];
    // console.log("7")
    console.log("files", files);
    const metaCID = await uploadToIPFS(files);
    // console.log("8")
    console.log(metaCID, "cid");
    const url = `https://ipfs.io/ipfs/${metaCID}/data.json`;
    console.log("inside here");
    // setFormInput({ ...formInput, uri: url });
    console.log(url, "here is URL");
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
    setLoading(true);
    const NftURI = await formURI();
    console.log(NftURI, "here is URI");
    let floatNumber = parseFloat(formInput.price);
    const isMinted = await mintReward(
      formInput.supply,
      NftURI,
      formInput.isCryptoBound,
      floatNumber.toString()
    );

    if (isMinted == true) {
      toast.success("Reward Created!", {
        position: "bottom-left",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setPopUpVisible(true);
    }

    setLoading(false);
    // } catch (error) {
    //     toast.warn("Error occurred, try again in a while!", {
    //         position: "top-center",
    //         autoClose: false,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //     });
    // }
  }

  return (
    <div className="bg-createEvent text-white  px-8">
      <CreateNav />
      <div className="grid grid-cols-2 mb-20">
        <div className="">
          <div>
            <div className="flex flex-col w-1/2 mx-auto justify-center">
              <div className="flex items-center w-full">
                <div className="relative w-[20%] flex justify-center">
                  <Link href="/dashboard/rewards" className="w-full p-4">
                    <Image
                      src={"/icons/back-btn.svg"}
                      width={30}
                      height={20}
                      alt="back-btn"
                      className="back-btn"
                    />
                  </Link>
                </div>
                <p className="text-3xl my-3 ">Create a Reward</p>
              </div>
              <div className="my-3 ">
                <p className="text-xl ">Upload a file</p>
                <p className="text-white opacity-40">
                  Upload or choose your file to upload
                </p>
              </div>
              <label
                className={`flex justify-center mx-auto w-[120%] border-2 bg-[rgb(30,30,30)] bg-opacity-75 border-[#E0E0E0] border-opacity-40 border-dashed  rounded-md  cursor-pointer ${formInput.cover ? "py-8 px-8" : "py-36 px-0"
                  } `}
              >
                <span className="flex items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 text-gray ${formInput.cover ? "hidden" : "flex"
                      } `}
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
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
            <div className="pt-4 flex justify-between">
              <div className="w-full flex justify-between items-baseline">
                <div className={`w-full flex flex-col min-h-[6rem]`}>
                  <label className="pb-2 text-lg font-semibold">
                    Crypto Bound
                  </label>
                  <input
                    type="text"
                    className={`bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2 mb-6 ${!isInputEnabled ? "hidden" : ""
                      }`}
                    placeholder="Dropping some tokens along makes it more engaging :)"
                    disabled={!isInputEnabled}
                  />
                </div>
                <div className={`flex items-center justify-end cursor-pointer`}>
                  <div
                    className={`w-12 h-6 bg-[#1E1E1E] rounded-full p-1 duration-300 ease-in-out ${isInputEnabled ? "bg-green-500" : "bg-[#1E1E1E]"
                      }`}
                    onClick={handleToggle}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isInputEnabled ? "translate-x-6" : ""
                        }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <label className="pb-2 w-[90%] text-lg font-semibold">
              Reward Name
            </label>
            <input
              type="text"
              id="reward-name"
              placeholder="eg. Discord Trivia 23rd Oct"
              className="bg-[#1E1E1E] w-[90%] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2 mb-6"
              onChange={(e) => {
                setFormInput({
                  ...formInput,
                  name: e.target.value,
                });
              }}
              disabled={imgLoading}
            />

            {/* <label className="pb-2 w-[90%] text-lg font-semibold">Description</label>
                        <textarea
                            placeholder="Description here"
                            className="bg-[#1E1E1E] w-[90%] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg resize-none p-2 mb-6"
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
                        ></textarea> */}

            <label className="pb-2 w-[90%] text-lg font-semibold">Supply</label>
            <input
              type="text"
              id="c"
              placeholder="5"
              className="bg-[#1E1E1E] w-[90%] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2 mb-6"
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  supply: e.target.value,
                })
              }
              disabled={imgLoading}
            />

            {/* comment out this section when price functionality is toh be used and integrated */}

            <div className=" flex justify-between w-[90%]">
              <div className="flex flex-col w-[60%] my-4">
                <label className="pb-2 text-lg font-semibold">Price</label>
                <input
                  type="text"
                  id="event-name"
                  placeholder="0.01"
                  className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 w-full rounded-lg p-2 "
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      price: e.target.value,
                    })
                  }
                  disabled={imgLoading}
                />
              </div>
              <div className="flex flex-col w-[35%] my-4 cursor-pointer">
                <label className="text-center pb-2 text-lg font-semibold">
                  Token
                </label>
                <Select
                  options={options}
                  value={selectedOption}
                  onChange={handleOp}
                  getOptionLabel={(option) =>
                    (
                      <div>
                        {option.imageUrl && (
                          <img
                            src={option.imageUrl}
                            alt={option.value}
                            className="inline-block h-6 w-6 mr-2"
                          />
                        )}
                        {option.value}
                      </div>
                    ) as unknown as string
                  }
                  getOptionValue={(option) => option.value}
                  styles={customStyles}
                />
              </div>
            </div>

            <div className="flex justify-center items-center w-[90%] mt-4">
              <button
                className="px-4 py-2 w-[6rem] border rounded-lg flex justify-center items-center"
                onClick={publish}
              >
                Publish
              </button>
            </div>
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
      {popUpVisible ? <CreateRewardPopup /> : <></>}
      <FooterSection />
    </div>
  );
};

export default Create;
