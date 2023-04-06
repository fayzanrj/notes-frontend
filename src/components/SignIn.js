import React, { useState, useContext } from 'react'
import './styles/SignIn.css'
import NoteContext from '../context/noteContext'


export default function SignIn() {
  const context = useContext(NoteContext)
  const { logIn, setShowSignIn, setLoading } = context

  const [enteredData, setEnteredData] = useState({
    "EmailSignIn": "",
    "PasswordSignIn": ""
  })
  const handleChange = (e) => {
    setEnteredData({ ...enteredData, [e.target.name]: e.target.value })
  }

  const handleSignIn = (event) => {
    event.preventDefault()
    if (enteredData.EmailSignIn !== "" && enteredData.PasswordSignIn !== "") {
      setLoading(true)
      logIn(enteredData.EmailSignIn, enteredData.PasswordSignIn)
    }
  }

  const handletoSignUp = () => {
    setShowSignIn(false)

  }
  return (
    <>
      <div className="log-in-box">
        <div className="heading">
          <div className="circles">
            <div className="circle red"></div>
            <div className="circle yellow"></div>
            <div className="circle green"></div>
          </div>
          <h3>Log in</h3>
        </div>
        <form onSubmit={handleSignIn} >
        <div className="inputs">
          <div className="username">
            <label htmlFor="email" className="email-label">
              E-mail
            </label><br />
            <input name='EmailSignIn' type="email" className="email-input" id="email-sign-in" onChange={handleChange} required/><br />
          </div>
          <div className="password">
            <label htmlFor='Password' className="password-label">Password</label><br />
            <input name="PasswordSignIn" type="password" className="password-input" id="password-sign-in" onChange={handleChange} required/>
          </div>
        </div>
        <div className="auth-btn">
          <button className="" >
            Sign In
          </button>
          <p className=''>New user? <span className='pSpan' onClick={handletoSignUp}>Sign Up</span></p>
        </div>
        </form>
      </div>
    </>
  )
}
