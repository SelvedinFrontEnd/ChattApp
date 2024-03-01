import { auth, provider } from "./config/firebase"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"
const cookies = new Cookies()

export default function Auth({setIsAuth}) {

    async function signInWithGoogle(){
        try{
        const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken)
        setIsAuth(true)
    } catch (err) {
            console.error(err)
        }
    };
    

    return(
        <div className="auth">
            <p>Sign in with <span className="google">Google</span> to continue!</p>
            <button onClick={signInWithGoogle}>Sing In With Google</button>
        </div>
    )
}