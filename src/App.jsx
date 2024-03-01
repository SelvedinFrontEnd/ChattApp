import { useState, useRef } from 'react'
import Auth from './Auth'
import Chat from "./Chat"
import Cookies from "universal-cookie"
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase';
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)
  
  const roomInputRef = useRef(null)

  async function signUserOut() {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  if(!isAuth) {
      return (
      <>
        <Auth setIsAuth={setIsAuth}/>
      </>
    );
  }
  
  return(
    <div className='enter'>
      {room ? (
      <Chat room={room} /> ) : (
        <div className='enter-room'>
          <label className='label'>Enter Room Name</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
      </div>
)}
    <div className='sign-out'>
      <button className='sign-out-button' onClick={signUserOut}>Sign Out</button>
    </div>
    </div>
  )
}

export default App
