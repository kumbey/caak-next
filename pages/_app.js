import '../styles/globals.css'
import { WrapperProvider } from "../src/context/wrapperContext"
import { UserProvider } from "../src/context/userContext"
import Amplify from '@aws-amplify/core'
import awsExports from "../src/aws-exports"
import WithAuth from "../src/components/auth/WithAuth"
import NavBar from "../src/components/navigation/NavBar"
import { useRouter } from 'next/router'


Amplify.configure({...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const { signInUp } = router.query

  return (
    <WrapperProvider>
      <UserProvider>
        <WithAuth />
        <NavBar />
        <Component {...pageProps} />
      </UserProvider>
    </WrapperProvider>
  )
}

export default MyApp
