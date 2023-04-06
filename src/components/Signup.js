import React, { useState, useContext } from 'react'
import NoteContext from '../context/noteContext'

export default function Signup(props) {
  const handleToSignUp = () => {
    setShowSignIn(true)
  }

  const context = useContext(NoteContext)
  const { signUp, setShowSignIn, setLoading } = context

  const [enteredData, setEnteredData] = useState({
    "Name": "",
    "EmailSignUp": "",
    "PasswordSignUp": ""
  })
  const handleChange = (e) => {
    setEnteredData({ ...enteredData, [e.target.name]: e.target.value })
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    if (enteredData.EmailSignUp !== "" && enteredData.name !== "" && enteredData.PasswordSignUp !== "") {
      setLoading(true)
      await signUp(enteredData.Name, enteredData.EmailSignUp, enteredData.PasswordSignUp)
    }
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
       <form onSubmit={handleSignUp}>
       <div className="inputs">
          <div className="name">
            <label htmlFor="name" className="name-label">
              Full Name
            </label><br />
            <input name='Name' type="text" className="name-input" id="name-sign-up" onChange={handleChange} required min={5}/><br />
          </div>
          <div className="username">
            <label htmlFor="email" className="email-label">
              E-mail
            </label><br />
            <input name='EmailSignUp' type="email" className="email-input" id="email-sign-up" onChange={handleChange} required/><br />
          </div>
          <div className="password">
            <label htmlFor='Password' className="password-label">Password</label><br />
            <input name='PasswordSignUp' type="password" className="password-input" id="password-sign-up" onChange={handleChange} required/>
          </div>
        </div>
        <div className="auth-btn">
          <button className="login-btn">
            Sign Up
          </button>
          <p className='newUser'>Already a user? <span className='newUserSpan' onClick={handleToSignUp}>Sign In</span></p>
        </div>
       </form>
      </div>
    </>
  )
}
