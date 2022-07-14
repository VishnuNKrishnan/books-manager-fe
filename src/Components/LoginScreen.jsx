import React from 'react'
import './LoginScreen.css'
import './commonAnimations.css'
import './commonCSS.css'
import booksLogo from '../uiAssets/books.png'
import { useState, useContext } from 'react'
import { UserContext } from '../UserContext'
import CircularLoader from './Loaders/CircularLoader'

function LoginScreen(props) {
  //Context Values from App.js
  const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useContext(UserContext)

  setIsLoggedIn(false)

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

    const data = { username: givenUsername, password: givenPassword }
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
    const serverResponse = await fetch(
      `${process.env.REACT_APP_API_SERVER_BASE_URL}/api/authenticateUser`,
      // `http://127.0.0.1:3001/api/authenticateUser`,
      options,
    ).catch((err) => console.log(err))
    const serverResponseData = await serverResponse.json()
    console.log(serverResponseData)

    if (serverResponseData.authenticated === true) {
      setIsLoggedIn(true)
      setIsLoading(false)
    } else {
      setAuthStatusMessage('Login failed. Please try again')
      setIsLoading(false)
    }
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
