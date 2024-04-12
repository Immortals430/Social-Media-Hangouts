import { useRef, useState } from 'react'
import welcome from '../../assets/welcome.jpg'
import "./Auth.css"
import { useDispatch, useSelector } from 'react-redux'
import { changePassword, googleLogin, sendOtp, signin, signup } from '../../redux/reducers/user_reducer'
import { MoonLoader } from 'react-spinners'
import { START_LOADING, STOP_LOADING, navigateSelector } from '../../redux/reducers/navigation_reducer'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react'



export default function Auth() {

  const dispatch = useDispatch()

  const [page, setPage] = useState("signin")
  const { loading } = useSelector(navigateSelector)
  const email = useRef()
  const otp = useRef()
  const pass = useRef()
  const confirmPass = useRef()
  const resetBtn = useRef()


  // reset form
  useEffect(() => {
    document.querySelector("form").reset()
  }, [page])
  
  // signup
  async function callSignin(e){
    e.preventDefault()
    dispatch(START_LOADING('submit'))
    const email = e.target.email.value
    const password = e.target.password.value
    await dispatch(signin({ email, password }))
    dispatch(STOP_LOADING('submit'))
  }

  // signup
  async function callSignup(e){
    e.preventDefault()
    dispatch(START_LOADING('submit'))
    const username = e.target.username.value
    const email = e.target.email.value
    const password = e.target.password.value
    await dispatch(signup({ username, email, password }))
    dispatch(STOP_LOADING('submit'))
    setPage("signin")
  }

  // google login
  function googleAuthenticate(data){
    dispatch(googleLogin({credential: data.credential}))
  }


  // send otp
  async function callSendOtp(){
    if(email.current.value){
      dispatch(START_LOADING('otp'))
      pass.current.type = "text"
      confirmPass.current.type = "text"
      otp.current.type = "text"
      resetBtn.current.type = "submit"
      await dispatch(sendOtp(email.current.value))
      dispatch(STOP_LOADING('otp'))
    }
    else alert("Enter email address")

  }

  // reset pass
  async function resetPass(e){
    e.preventDefault()
    dispatch(START_LOADING('reset'))
    const password = pass.current.value
    const confirm = confirmPass.current.value
    if(password == confirm){
      await dispatch(changePassword({ 
        email: email.current.value,
        password,
        otp: otp.current.value
      }))
      dispatch(STOP_LOADING('reset'))
      setPage("signin")
    }
    else alert("password mismatch")
  }


  return (
    <main className="flex v-center h-center" style={{backgroundImage: `url(${welcome})`}}>
      {
        page == "signup" ?

        <section className='auth-cont'>
          <h1>Sign Up</h1>
          <form onSubmit={callSignup}>
            <input type="text" name="username" placeholder='Username' id='signup' required defaultValue=""/>
            <input type="email" name="email" placeholder='Email' required/>
            <input type="password" name="password" placeholder="Password" required />
         
            { loading.includes("submit") ?
                <div className='submit-btn signup-color flex h-center disabled'><MoonLoader size={20} color='white' /></div> : 
                <button type="submit" className='submit-btn signup-color'>Sign Up</button>
              }
          </form>
          <p>Already have an account?</p>
          <button className="toggle-btn signin-color" onClick={() => setPage("signin")} >Sign In</button>
        </section>

        : page == "reset" ? 

        <section className='auth-cont'>
          <h1>Reset Password</h1>
          <form onSubmit={resetPass}>  
          <input type="email" name="email" placeholder='Email' required defaultValue="" ref={email}/>
          <div >
            <input type='text' name="otp" id='otp-input' ref={otp} placeholder='XXXX'/>
            { loading.includes("otp") ?
                <span className='otp-color submit-btn flex h-center disabled'><MoonLoader size={15} color='white' /></span> : 
                <button id='get-otp-btn' onClick={callSendOtp} type='button'>Get otp</button>  
            } 
          </div>
          <input type="hidden" name="password" ref={pass} required placeholder='New Password'/>
          <input type="hidden" name="confirmPass" ref={confirmPass} required placeholder='Confirm Password'/>
          { loading.includes("reset") ?
                <div className='reset-color submit-btn flex h-center disabled'><MoonLoader size={20} color='white' /></div> : 
                <input type="submit" ref={resetBtn} id='reset-submit-btn'/>
          }     
          </form>
        </section>

        : 

        <section className='auth-cont'>
          <h1>Sign In</h1>
          <form onSubmit={callSignin}>
            <input type="email" name="email" placeholder='Email' required defaultValue=""/>
            <input type="password" name="password" placeholder="Password" required />     
            <p onClick={() => setPage("reset")}>Forgot password?</p>
              { loading.includes("submit") ?
                <div className='signin-color submit-btn flex h-center disabled'><MoonLoader size={20} color='white' /></div> : 
                <button type="submit" className='submit-btn signin-color'>Sign In</button>
              }
          </form> 
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID} >
            <GoogleLogin 
              onSuccess={data => googleAuthenticate(data)}
              onError={() => alert('Login Failed')}
            />
          </GoogleOAuthProvider>  
          <p>Don't have an account?</p>
          <button className='toggle-btn signup-color' onClick={() => setPage("signup")}>Sign Up</button>
        </section> 
      }
    </main>
  )
}
