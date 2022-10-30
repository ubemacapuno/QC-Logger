import supabase from "../config/supabaseClient"
import { useState } from 'react'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    async function signIn(){
        if (!email) return //form validation if no email provided . . . returns nothing.
        const { error, data } = await supabase.auth.signInWithOtp({
            email
        })
        if(error){
            console.log({error})
        } else {
            setSubmitted(true) //state change!
        }
    }

    //condition for when submitted is true
    if (submitted){
        return (
            <div className="something">
                <h1>Check your email to Sign in. MAGIC.</h1>
            </div>
        )
    }
    //If not submitted, just return the User Interface:
    return (
        <div className="something">
            <main>
                <h1>
                    Sign In
                </h1>
                <input 
                    onChange={e => setEmail(e.target.value)} //update setEmail to the value of form input (e.target.value)
                    style={{ margin: 10}}
                />
                <button onClick={() => signIn()}>Sign In</button>
            </main>
        </div>
    )
}


// const Login = () => {
  
//   return (
//     <div className="login">
//         <h1>Login Page</h1>
//     </div>
//   )
// }

// export default Login