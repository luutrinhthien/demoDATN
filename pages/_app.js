import '@/styles/globals.css'
import Head from 'next/head'
import { WagmiConfig, createConfig, mainnet, configureChains } from 'wagmi'
import { bscTestnet, bsc, polygonMumbai } from '@wagmi/core/chains'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { useWeb3ModalTheme, Web3Modal } from '@web3modal/react';
import { useEffect } from 'react'

const projectId = 'ef102092ea8faa1bd4d0209a1246a6b8';

const chains = [bscTestnet];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})

const ethereumClient = new EthereumClient(config, chains);

export default function App({ Component, pageProps }) {

  const { setTheme } = useWeb3ModalTheme();
  useEffect(() => {
    setTheme({
      themeMode: 'dark',
      themeVariables: {
        '--w3m-background-image-url': '#ABF20D',
        '--w3m-background-color': '#ABF20D',
        '--w3m-accent-color': '#ABF20D',
        '--w3m-accent-fill-color': 'black',
      },
    });
  }, []);

  return (
    <WagmiConfig config={config}>
      <Head>
        <title>MCB</title>
      </Head>
      <Component {...pageProps} />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient}
        walletImages={{
          ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18:
            'https://explorer-api.walletconnect.com/v3/logo/lg/73f6f52f-7862-49e7-bb85-ba93ab72cc00?projectId=2f05ae7f1116030fde2d36508f472bfb',
        }} />
    </WagmiConfig>
  )
}
