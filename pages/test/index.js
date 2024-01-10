import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Files from "@/components/Files";
import { useNetwork, useSwitchNetwork, useAccount, useContractWrite } from 'wagmi'
import { useContractRead } from 'wagmi'
import { Web3Button, useWeb3Modal } from '@web3modal/react';
import { contract } from '../../constant/address'
import contractABI from '../../constant/abi.json'

export default function InputForm() {
    const { chain } = useNetwork();
    const { switchNetwork } = useSwitchNetwork();
    const { address } = useAccount();
    const { open, close } = useWeb3Modal()
    const [isClient, setIsClient] = useState(false)
    const [selectProduct, setSelectProduct] = useState()

    useEffect(() => {
        if (chain) {
            if (chain.id !== 97) {
                switchNetwork?.(97);
            }
        }
    }, [chain?.id, address, switchNetwork]);
    useEffect(() => {
        setIsClient(true)
    }, [])

    const [file, setFile] = useState("");
    const [cid, setCid] = useState("");
    const [cid2, setCid2] = useState("");
    const [cid3, setCid3] = useState("");
    const [cid4, setCid4] = useState("");
    const [cid5, setCid5] = useState("");

    const [uploading, setUploading] = useState(false);

    const inputFile = [useRef(null),useRef(null),useRef(null),useRef(null),useRef(null)]

    const uploadFile = async (fileToUpload, index) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", fileToUpload, { filename: fileToUpload.name });
            const res = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });
            const ipfsHash = await res.text();
            if(index == 1){
                setCid(ipfsHash);
                handleFileChange(0,ipfsHash)
            }else if(index == 2){
                setCid2(ipfsHash);
                handleFileChange(1,ipfsHash)
            }else if(index == 3){
                setCid3(ipfsHash);
                handleFileChange(2,ipfsHash)
            }else if(index == 4){
                setCid4(ipfsHash);
                handleFileChange(3,ipfsHash)
            }else if(index == 5){
                setCid5(ipfsHash);
                handleFileChange(4,ipfsHash)
            }
            setUploading(false);
        } catch (e) {
            console.log(e);
            setUploading(false);
            alert("Trouble uploading file");
        }
    };

    const handleChange = (e) => {
        setFile(e.target.files[0]);
        uploadFile(e.target.files[0], 1);
    };
    const handleChange2 = (e) => {
        setFile(e.target.files[0]);
        uploadFile(e.target.files[0], 2);
    };
    const handleChange3 = (e) => {
        setFile(e.target.files[0]);
        uploadFile(e.target.files[0], 3);
    };
    const handleChange4 = (e) => {
        setFile(e.target.files[0]);
        uploadFile(e.target.files[0], 4);
    };
    const handleChange5 = (e) => {
        setFile(e.target.files[0]);
        uploadFile(e.target.files[0], 5);
    };

    const loadRecent = async () => {
        try {
            const res = await fetch("/api/files");
            const json = await res.json();
            setCid(json.ipfs_pin_hash);
        } catch (e) {
            console.log(e);
            alert("trouble loading files");
        }
    };

    const [inputs, setInputs] = useState([{ title: null, uploader: address, description: null,timestamp: Date.now(), file: null }]);

    const handleAddInput = () => {
        if (inputs.length < 5) {
            const newInputs = [...inputs, { title: null, uploader: address, description: null,timestamp: Date.now() , file: null }];
            setInputs(newInputs);
        }
    };

    const handleRemoveInput = (index) => {
        if (inputs.length > 1) {
            const newInputs = [...inputs];
            newInputs.splice(index, 1);
            setInputs(newInputs);
        }
    };
    // console.log(inputs)

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputs = [...inputs];
        newInputs[index][name] = value;
        setInputs(newInputs);
    };

    const handleFileChange = (index,Cid) => {
        const newInputs = [...inputs];
        newInputs[index]["file"] = Cid;
        setInputs(newInputs);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
    };

    const { data: productFetch } = useContractRead({
        address: contract,
        abi: contractABI,
        functionName: 'viewProductList',
        watch: true,
    })

    const { data: whiteList } = useContractRead({
        address: contract,
        abi: contractABI,
        functionName: 'viewIsWhiteList',
        watch: true,
        args: [selectProduct, address]
    })

    const { data , isLoading: loading, write: storeData, error } = useContractWrite({
        address: contract,
        abi: contractABI,
        functionName: 'addProduct',
        args: [selectProduct, inputs],
    })
    useEffect(()=>{
        console.log("Error: ",error)
    },[error])

    const [productList, setProductList] = useState([])
    useEffect(() => {
        setProductList(productFetch)
    }, [productFetch])

    return (
        <div>
            {isClient ? <div>
                <Head>
                    <title>Demo</title>
                    <meta name="description" content="Generated with create-pinata-app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/mainLogo1.png" />
                </Head>
                <div className="flex justify-end mt-[16px] font-style: normal;">
                    {!address && <button className='px-4 py-2 w-[12rem] mr-3 bg-blue-600' style={{ borderRadius: "12px" }}
                        onClick={() => open()}>
                        <p className='text-white'>Connect Wallet</p>
                    </button>}
                    {address && <button className='px-4 py-2 w-[8rem] mr-3 bg-blue-600' style={{ borderRadius: "12px" }}
                        onClick={() => open()}>
                        <p className='text-white'>{address.slice(0, 4)}...{address.slice(address.length - 4, address.length)}</p>
                    </button>}
                </div>
                {!selectProduct && productList &&
                    <div className="flex flex-col items-center justify-center h-screen space-y-4 font-style: normal;">
                        {productList.map((button, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectProduct(button)}
                                className="bg-blue-500 md:w-[50%] w-[90%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                {button}
                            </button>
                        ))}
                    </div>}
                {selectProduct && productList &&
                    (whiteList ? <div>
                        <div className="font-style: normal;">
                            <button
                                className="rounded-xl bg-blue-500 py-2 px-6 text-white ml-2 mb-4"
                                onClick={() => setSelectProduct()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </button>
                        </div>
                        <div className='text-5xl font-semibold text-center mt-4 font-style: normal;'>Write Diary of "{selectProduct}"</div>
                        <div onSubmit={handleSubmit} className='md:w-[70%] w-[90%] mx-auto mt-11'>
                            {inputs.map((input, index) => (
                                <div key={index} className="flex flex-col gap-4 p-4 border-t-2 border-indigo-300">
                                    <input
                                        className='p-2 px-6 rounded-xl'
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={input.title}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                    <textarea
                                        className='p-2 px-6 rounded-xl'
                                        name="description"
                                        placeholder="Description"
                                        value={input.description}
                                        onChange={(event) => handleInputChange(index, event)}
                                        rows={3}
                                    />
                                    <div className='flex flex-col'>
                                        <div className="">
                                            <input type="file"
                                                id="file"
                                                ref={inputFile[index]}
                                                onChange={index == 0?handleChange: index == 1?handleChange2:
                                                index==2?handleChange3:index==3?handleChange4:handleChange5}
                                                style={{ display: "none" }} />
                                        </div>
                                        <button className="w-[50%] mt-3 rounded-xl bg-white p-2 mb-2" type="submit"
                                            disabled={uploading}
                                            onClick={() => inputFile[index].current.click()}>
                                            {uploading ? "Uploading..." : "Upload"}
                                        </button>
                                        {index == 0?(cid && (
                                            <Files cid={cid} />
                                        )):
                                        index == 1?(cid2 && (
                                            <Files cid={cid2} />
                                        )):
                                        index == 3?(cid4 && (
                                            <Files cid={cid4} />
                                        )):
                                        index == 4?(cid5 && (
                                            <Files cid={cid5} />
                                        )):(cid3 && (
                                            <Files cid={cid3} />
                                        ))
                                        }
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="mt-4 ml-8 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"
                                                onClick={() => handleRemoveInput(index)}
                                            >
                                                -
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className='border-t-2 border-indigo-300'></div>
                            {inputs.length < 5 && (
                                <div className='flex justify-center mt-4'>
                                    <button
                                        type="button"
                                        className="text-4xl w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center"
                                        onClick={handleAddInput}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                            <button type="button"
                            onClick={storeData}
                            className='w-full my-4 rounded-lg py-2 bg-slate-400 hover:bg-slate-500 text-lg text-white'>Submit</button>
                        </div>
                    </div>
                        :
                        (<div>
                            <div className="font-style: normal;">
                                <button
                                    className="rounded-xl bg-blue-500 py-2 px-6 text-white ml-2 mb-4"
                                    onClick={() => setSelectProduct()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-col items-center justify-center h-screen space-y-4 font-style: normal;">
                                <button
                                    className="bg-blue-500 md:w-[50%] w-[90%] text-3xl text-white font-bold py-2 px-4 rounded"
                                >
                                    You are not in whitelist to write diary!
                                </button>
                            </div>
                        </div>
                        )
                    )
                }
            </div> : <div>"Waiting..."</div>}
        </div>
    );
}
