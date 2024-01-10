import { useRouter } from 'next/router'
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'

export default function Page() {
  const router = useRouter()
  const { address } = useAccount();

  return <div>
    <p>Post: {router.query.slug}</p>
    <div>{address}</div>
    </div>
}