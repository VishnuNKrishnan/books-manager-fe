import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext'
import './BooksLibrary.css'
import '../commonCSS.css'
import backSymbol from '../../uiAssets/back.svg'
import homeSymbol from '../../uiAssets/home.svg'
import SingleBookCard from './SingleBookCard'

function BooksLibrary() {
  //Context Values from App.js
  const {
    isLoggedIn,
    setIsLoggedIn,
    currentPage,
    setCurrentPage,
    booksInStoreArray,
    setBooksInStoreArray,
  } = useContext(UserContext)

  const [searchQuery, setSearchQuery] = useState('')
  return (
    <>
      <div className="topBar">
        <div
          className="backBtn"
          style={{
            backgroundImage: `url(${backSymbol})`,
          }}
        ></div>
        <div className="sectionHeading">
          <h2>Library</h2>
        </div>
        <div
          className="homeBtn"
          style={{
            backgroundImage: `url(${homeSymbol})`,
          }}
        ></div>
      </div>
      <div className="bookCardsHolder">
        <div className={'searchBarHolder searchBarActive'}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
          />
        </div>
        {searchQuery === ''
          ? booksInStoreArray.map((obj, index) => {
              return (
                <SingleBookCard
                  key={index}
                  bookId={obj.bookId}
                  title={obj.title}
                  price={obj.price}
                  author={obj.author}
                  pages={obj.pages}
                  posterURL={obj.posterUrl}
                />
              )
            })
          : booksInStoreArray.map((obj, index) => {
              if (obj.title.includes(searchQuery)) {
                return (
                  <SingleBookCard
                    key={index}
                    title={obj.title}
                    price={obj.price}
                    author={obj.author}
                    pages={obj.pages}
                    posterURL={obj.posterUrl}
                  />
                )
              }
            })}
      </div>
    </>
  )
}

export default BooksLibrary
