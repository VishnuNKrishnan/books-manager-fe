import BG from './uiAssets/appBG.jpeg'
import './App.css'
import { UserContext } from './UserContext'
import LoginScreen from './Components/LoginScreen'
import { useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //State variable containing object with details of logged in user
  const [currentUser, setCurrentUser] = useState({
    userID: false,
    userName: false,
  })

  // ================ COMPONENT BEGINS ==================
  return (
    <div className="App">
      <UserContext.Provider value={(isLoggedIn, setIsLoggedIn)}>
        <div
          className="appWrapper" //Wraps the entire app
          style={{
            backgroundImage: `url(${BG})`,
          }}
        >
          <LoginScreen />
        </div>
      </UserContext.Provider>
    </div>
  )
}

export default App
