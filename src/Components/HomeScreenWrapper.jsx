import React, { useState, useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
import './HomeScreenWrapper.css'
import './commonAnimations.css'
import BooksLibrary from './HomeScreenWrapperChildren/BooksLibrary'
import SearchSymbol from '../uiAssets/search.svg'
import AddSymbol from '../uiAssets/add.svg'
import LogoutSymbol from '../uiAssets/logout.svg'
import LibrarySymbol from '../uiAssets/library.svg'
import CreateBook from './HomeScreenWrapperChildren/CreateBook'
import EditBook from './HomeScreenWrapperChildren/EditBook'

function HomeScreenWrapper(props) {
  //Context Values from App.js
  const { isLoggedIn, setIsLoggedIn, currentPage, setCurrentPage } = useContext(
    UserContext,
  )
  return (
    <div className="homeScreenWrapper">
      <div className="navbar_WideScreen">
        <div className="itemCardsHolder">
          <Link to="/library">
            <div className="itemCard">
              <img src={LibrarySymbol} alt="" />
              <h2 className="itemCardTitle">Library</h2>
              <p className="itemCardDescription">
                View our massive collection of books
              </p>
            </div>
          </Link>

          <Link to="/create">
            <div className="itemCard">
              <img src={AddSymbol} alt="" />
              <h2 className="itemCardTitle">New Entry</h2>
              <p className="itemCardDescription">
                Add a new book to the database
              </p>
            </div>
          </Link>

          <div
            className="itemCard"
            onClick={() => {
              setIsLoggedIn(false)
            }}
          >
            <img src={LogoutSymbol} alt="" />
            <h2 className="itemCardTitle">Logout</h2>
            <p className="itemCardDescription">
              Remove user data and end session
            </p>
          </div>
        </div>
      </div>
      <div className="navbar_Mobile">
        <div className="actionCard">
          <Link to="/library">
            <img src={LibrarySymbol} alt="" />
          </Link>
        </div>
        <div className="actionCard">
          <Link to="/create">
            <img src={AddSymbol} alt="" />
          </Link>
        </div>

        <div
          className="actionCard"
          onClick={() => {
            setIsLoggedIn(false)
          }}
        >
          <img src={LogoutSymbol} alt="" />
        </div>
      </div>

      <div className="homeScreenContent">
        {props.page === 'library' && <BooksLibrary />}
        {props.page === 'create' && <CreateBook />}
        {props.page === 'edit' && <EditBook />}
      </div>
    </div>
  )
}

export default HomeScreenWrapper
