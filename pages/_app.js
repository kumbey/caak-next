import '../styles/globals.css'
import { WrapperProvider } from "../src/context/wrapperContext"
import { UserProvider } from "../src/context/userContext"
import Amplify from '@aws-amplify/core'
import awsExports from "../src/aws-exports"
import NavBar from "../src/components/navigation/NavBar"
import Modals from '../src/components/modals'
import { useRouter } from 'next/router'

Amplify.configure({...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {

  const route = useRouter()

  return (
    <WrapperProvider>
      <UserProvider>
        <NavBar />
        <Component {...pageProps} />
        <Modals/>
      </UserProvider>
    </WrapperProvider>
  )
}

export default MyApp
