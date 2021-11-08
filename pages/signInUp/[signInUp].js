import { useRouter } from "next/router"
import SignInUp from "../../src/components/signInUp"


const SignInUpPage = ({ type, ...props }) => {

  const router = useRouter()
  const { signInUp } = router.query

  return (
      <SignInUp type={signInUp}/>
  )
}

export default SignInUpPage
