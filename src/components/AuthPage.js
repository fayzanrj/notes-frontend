import React, {useContext} from 'react'
import SignIn from './SignIn'
import SignUp from './Signup'
import './styles/SignIn.css'
import NoteContext from '../context/noteContext'

export default function AuthPage() {
  const context = useContext(NoteContext)
  const {signPageStatus ,showSignIn , setShowSignIn , theme} = context
  return (
    <>
      <div className={`auth-page ${theme}`}>
        <div className={`res ${signPageStatus.status}`}>
          <div className="msg">
            {signPageStatus.msg}
          </div>
        </div>
        {showSignIn ? <SignIn setShowSignIn={setShowSignIn} /> : <SignUp setShowSignIn={setShowSignIn} />}
      </div>
    </>
  )
}
