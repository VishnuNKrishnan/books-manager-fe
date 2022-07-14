import BG from './uiAssets/appBG.jpeg'
import './App.css'
import { UserContext } from './UserContext'
import LoginScreen from './Components/LoginScreen'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeScreenWrapper from './Components/HomeScreenWrapper'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //State variable containing object with details of logged in user
  const [currentUser, setCurrentUser] = useState({
    userID: false,
    userName: false,
  })

  //State Variable that keeps track of all books. Helps to reduce frequent API calls to server.
  const [booksInStoreArray, setBooksInStoreArray] = useState([])

  //Collect all books data from DB via API

  async function fetchAllBooksData() {
    setBooksInStoreArray([])

    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }

    const serverResponse = await fetch(
      `${process.env.REACT_APP_API_SERVER_BASE_URL}/api/getAllBooks`,
      // `http://127.0.0.1:3001/api/getAllBooks`,
      options,
    ).catch((err) => console.log(err))
    const serverResponseData = await serverResponse.json()
    setBooksInStoreArray(serverResponseData)
  }
  useEffect(() => {
    fetchAllBooksData()
  }, [])

  // ================ COMPONENT BEGINS ==================
  return (
    <Router>
      <div className="App">
        <UserContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            booksInStoreArray,
            setBooksInStoreArray,
            currentUser,
            setCurrentUser,
            fetchAllBooksData,
          }}
        >
          <div
            className="appWrapper" //Wraps the entire app
            style={{
              backgroundImage: `url(${BG})`,
            }}
          >
            <Switch>
              <Route exact path="/">
                {isLoggedIn ? (
                  <HomeScreenWrapper page={'library'} />
                ) : (
                  <LoginScreen />
                )}
              </Route>
            </Switch>

            <Switch>
              <Route exact path="/library">
                {isLoggedIn ? (
                  <HomeScreenWrapper page={'library'} />
                ) : (
                  <LoginScreen />
                )}
              </Route>
            </Switch>

            <Switch>
              <Route exact path="/create">
                {isLoggedIn ? (
                  <HomeScreenWrapper page={'create'} />
                ) : (
                  <LoginScreen />
                )}
              </Route>
            </Switch>

            <Switch>
              <Route exact path="/edit">
                {isLoggedIn ? (
                  <HomeScreenWrapper page={'edit'} />
                ) : (
                  <LoginScreen />
                )}
              </Route>
            </Switch>
          </div>
        </UserContext.Provider>
      </div>
    </Router>
  )
}

export default App
