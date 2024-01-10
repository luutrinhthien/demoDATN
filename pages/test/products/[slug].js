import { useRouter } from 'next/router'
import { useContractRead, useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { contract } from '../../../constant/address'
import contractABI from '../../../constant/abi.json'
import Head from "next/head";

export default function Page() {
    const router = useRouter()
    const { address } = useAccount();
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const { data: product } = useContractRead({
        address: contract,
        abi: contractABI,
        functionName: 'getProducts',
        watch: true,
        args: [router.query.slug]
    })

    const [productList, setProductList] = useState()
    useEffect(() => {
        setProductList(product)
    }, [product])

    console.log(product)

    const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL
        ? process.env.NEXT_PUBLIC_GATEWAY_URL
        : "https://gateway.pinata.cloud";

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${hours}:${minutes} - ${day}/${month}/${year}`;
    }

    return (
        <div>
            <Head>
                <title>Demo</title>
                <meta name="description" content="Generated with create-pinata-app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/mainLogo1.png" />
            </Head>
            {isClient ? <div className=''>
                <p className='text-center font-bold text-4xl mt-4 font-style: normal;'>{router.query.slug}</p>
                {/* <div>{address}</div> */}
                {productList &&
                    <div>{productList.map(
                        (item, index) => (
                            <div className='my-4 bg-slate-300 md:w-[50%] w-[90%] px-4 py-2 rounded-md mx-auto'>
                                <div className='flex justify-center'>
                                    <span className='text-lg font-semibold'>Uploader:</span>
                                    &nbsp;
                                    <a href={`https://testnet.bscscan.com/address/${item.uploader}`} className="border-b-2 border-solid border-accent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-animategradient mt-[3px]">
                                        {item.uploader.slice(0, 4)}....{item.uploader.slice(item.uploader.length - 4, item.uploader.length)}
                                    </a>
                                </div>
                                <div>
                                    <span className='text-lg font-semibold'>Step:</span>
                                    &nbsp; {item.title}
                                </div>
                                <div><span className='text-lg font-semibold'>Description:</span>
                                    &nbsp; {item.description}</div>
                                <div><span className='text-lg font-semibold'>Date update:</span>
                                    &nbsp; {formatDate(Number(item.timestamp))}</div>
                                <div>
                                    <span className='text-lg font-semibold'>Image:</span>
                                    &nbsp;&nbsp;
                                    {item.file !== 'null' && <a
                                        href={`${GATEWAY_URL}/ipfs/${item.file}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_TOKEN}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="border-b-2 border-solid border-accent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-animategradient"
                                    >
                                        {/* {item.file.slice(0, 4)}....{item.file.slice(item.file.length - 4, item.file.length)} */}
                                        View
                                    </a>}
                                    {item.file === 'null' &&
                                        <span>null</span>
                                    }
                                </div>
                            </div>
                        )
                    )}
                    </div>}
            </div> :
                <div>Waiting...</div>
            }
        </div>
    )
}