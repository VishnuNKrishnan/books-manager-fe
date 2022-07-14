import React from 'react'
import './LoginScreen.css'
import './commonAnimations.css'
import './commonCSS.css'
import booksLogo from '../uiAssets/books.png'
import { useState, useContext } from 'react'
import { UserContext } from '../UserContext'
import CircularLoader from './Loaders/CircularLoader'

function LoginScreen() {
  //Context Values from App.js
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)

  //State Variables for user provided inputs
  const [givenUsername, setGivenUserName] = useState('')
  const [givenPassword, setGivenPassword] = useState('')

  //TRUE if an API call is in progress
  const [isLoading, setIsLoading] = useState(false)

  //State variable for submit button text
  const [submitBtnLabel, setSubmitBtnLabel] = useState('SUBMIT')

  //State variable for Authentication Status Message
  const [authStatusMessage, setAuthStatusMessage] = useState(' ')

  //Form Handler Function. Triggered by submit button
  const authenticationFormHandler = async (e) => {
    e.preventDefault()
    //Reject blank fields...
    if (givenUsername === '' || givenPassword === '') {
      setAuthStatusMessage('Please fill in all the fields.')
      return
    }

    setIsLoading(true)
  }

  // ============ COMPONENT BEGINS =================

  return (
    <div className="loginScreenWrapper">
      <div className="loginFormHolder">
        <form
          action=""
          className="loginForm"
          onSubmit={authenticationFormHandler}
        >
          <div className="headingHolder">
            <h2>Login</h2>
            <img src={booksLogo} alt="Logo" />
          </div>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            value={givenUsername}
            onChange={(e) => {
              setAuthStatusMessage('')
              setGivenUserName(e.target.value)
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={givenPassword}
            onChange={(e) => {
              setAuthStatusMessage('')
              setGivenPassword(e.target.value)
            }}
          />
          <div className="CTAsHolder">
            <p className="tirtiaryCTA">Forgot Password</p>
            {isLoading ? (
              <CircularLoader />
            ) : (
              <button type="submit" className="primaryCTA">
                {submitBtnLabel}
              </button>
            )}
          </div>

          <p className="statusMessage">{authStatusMessage}</p>
        </form>
      </div>
    </div>
  )
}

export default LoginScreen
