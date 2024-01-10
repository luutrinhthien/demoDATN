import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Files from "@/components/Files";
// import { Form } from "@/components/form";
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'
import { useContractRead } from 'wagmi'
import { Web3Button, useWeb3Modal } from '@web3modal/react';

export default function Home() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { open, close } = useWeb3Modal()
  const [isClient, setIsClient] = useState(false)

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
  const [uploading, setUploading] = useState(false);

  const inputFile = useRef(null);

  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", fileToUpload, { filename: fileToUpload.name });
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const ipfsHash = await res.text();
      setCid(ipfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
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

  return (
    <div>
      {isClient ? <div>
        <Head>
          <title>Demo</title>
          <base href="/test/"></base>
          <meta name="description" content="Generated with create-pinata-app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/mainLogo1.png" />
        </Head>
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
          <a className="text-3xl underline font-medium text-blue-400" href="/test/">See demo</a>
        </div>
      </div> : <div>"Waiting..."</div>}
    </div>
  );
}
// export default function Home() {
//   const { chain } = useNetwork();
//   const { switchNetwork } = useSwitchNetwork();
//   const { address } = useAccount();
//   const { open, close } = useWeb3Modal()
//   const [isClient, setIsClient] = useState(false)

//   useEffect(() => {
//     if (chain) {
//       if (chain.id !== 97) {
//         switchNetwork?.(97);
//       }
//     }
//   }, [chain?.id, address, switchNetwork]);
//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   const [file, setFile] = useState("");
//   const [cid, setCid] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const inputFile = useRef(null);

//   const uploadFile = async (fileToUpload) => {
//     try {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append("file", fileToUpload, { filename: fileToUpload.name });
//       const res = await fetch("/api/files", {
//         method: "POST",
//         body: formData,
//       });
//       const ipfsHash = await res.text();
//       setCid(ipfsHash);
//       setUploading(false);
//     } catch (e) {
//       console.log(e);
//       setUploading(false);
//       alert("Trouble uploading file");
//     }
//   };

//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//     uploadFile(e.target.files[0]);
//   };

//   const loadRecent = async () => {
//     try {
//       const res = await fetch("/api/files");
//       const json = await res.json();
//       setCid(json.ipfs_pin_hash);
//     } catch (e) {
//       console.log(e);
//       alert("trouble loading files");
//     }
//   };

//   return (
//     <div>
//       {isClient ? <div>
//         <Head>
//           <title>Demo</title>
//           <meta name="description" content="Generated with create-pinata-app" />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <link rel="icon" href="/mainLogo1.png" />
//         </Head>
//         <div className="flex justify-end mt-[16px]">
//           {!address && <button className='px-4 py-1 w-[12rem] mr-3' style={{ backgroundColor: "#ABF20D", borderRadius: "12px" }}
//             onClick={() => open()}>
//             <p className='text-black'>Connect Wallet</p>
//           </button>}
//           {address && <button className='px-4 py-1 w-[8rem] mr-3' style={{ backgroundColor: "#ABF20D", borderRadius: "12px" }}
//             onClick={() => open()}>
//             <p className='text-black'>{address.slice(0, 4)}...{address.slice(address.length - 4, address.length)}</p>
//           </button>}
//         </div>
//         <main className="w-full min-h-screen flex flex-col justify-center mt-[-16px]">
//           {/* <div className="w-1/2 flex flex-col gap-6">
//           <input
//             type="file"
//             id="file"
//             ref={inputFile}
//             onChange={handleChange}
//             style={{ display: "none" }}
//           />
//           <div>
//             <button onClick={loadRecent} className="mr-10 w-[150px] bg-light text-secondary border-2 border-secondary rounded-3xl py-2 px-4 hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out">
//               Load recent
//             </button>
//             <button
//               disabled={uploading}
//               onClick={() => inputFile.current.click()}
//               className="w-[150px] bg-secondary text-light rounded-3xl py-2 px-4 hover:bg-accent hover:text-light transition-all duration-300 ease-in-out"
//             >
//               {uploading ? "Uploading..." : "Upload"}
//             </button>
//           </div>
//           {cid && (
//             <Files cid={cid} />
//           )}
//         </div> */}
//           <main
//             className="w-full max-w-lg mx-auto mt-10 px-4 py-8 rounded-xl bg-gradient-to-r from-green-300 from-10% via-green-200 via-30% to-green-100 to-90%">
//             <h1 className="text-2xl font-bold text-center mb-4">UPDATE DIARY</h1>
//             <div className="space-y-2 flex items-center">
//               <div htmlFor="title" className="font-medium text-lg">Title</div>
//               <input className="p-2 px-6 rounded-lg ml-4 w-[50%]" id="title" placeholder="Your title" />
//             </div>
//             <div className="space-y-2 mt-8">
//               <div htmlFor="description" className="font-medium text-lg">Description</div>
//               <Textarea
//                 className="min-h-[100px] p-2 px-6 rounded-xl text-md"
//                 id="description"
//                 placeholder="Your description" />
//             </div>
//             <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
//               <label htmlFor="file" className="font-medium text-lg">Upload image</label>
//               <input type="file"
//                 id="file"
//                 ref={inputFile}
//                 onChange={handleChange}
//                 style={{ display: "none" }} />
//             </div>
//             <button className="w-full rounded-xl bg-white p-2" type="submit"
//               disabled={uploading}
//               onClick={() => inputFile.current.click()}>
//               {uploading ? "Uploading..." : "Upload"}
//             </button>
//             {cid && (
//               <Files cid={cid} />
//             )}
//           </main>
//         </main>
//       </div> : <div>"Waiting..."</div>}
//     </div>
//   );
// }
