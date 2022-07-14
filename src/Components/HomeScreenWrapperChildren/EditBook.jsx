import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import './CreateBook.css'
import '../commonCSS.css'
import bookSymbol from '../../uiAssets/books.png'
import backSymbol from '../../uiAssets/back.svg'
import homeSymbol from '../../uiAssets/home.svg'
import { Link } from 'react-router-dom'
import CircularLoader from '../Loaders/CircularLoader'

function EditBook() {
  //Context Values from App.js
  const {
    isLoggedIn,
    setIsLoggedIn,
    currentPage,
    setCurrentPage,
    booksInStoreArray,
    setBooksInStoreArray,
    fetchAllBooksData,
  } = useContext(UserContext)

  //State Variable for Image URL for live poster preview and uploading details
  const [posterURL, setPosterURL] = useState(bookSymbol)

  //Other State variables for inputs provided by user
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState(null)
  const [price, setPrice] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const URLParams = new URLSearchParams(window.location.search)
  const bookId = URLParams.get('bookId')

  useEffect(() => {
    async function fetchBookDetails() {
      const data = { bookId: bookId }
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
        `${process.env.REACT_APP_API_SERVER_BASE_URL}/api/getBookDetails`,
        // `http://127.0.0.1:3001/api/getBookDetails`,
        options,
      ).catch((err) => console.log(err))
      const serverResponseData = await serverResponse.json()
      console.log(serverResponseData)

      setTitle(serverResponseData.title)
      setAuthor(serverResponseData.author)
      setPosterURL(serverResponseData.posterUrl)
      setPages(serverResponseData.pages)
      setPrice(serverResponseData.price)
    }
    fetchBookDetails()
  }, [])

  const uploadBookDetails = async () => {
    var newBookDetails = {
      bookId: bookId,
      title: title,
      author: author,
      pages: pages,
      price: price,
      posterUrl: posterURL,
    }

    async function editBookDetails() {
      //Reject blank fields
      if (
        title === '' ||
        author === '' ||
        pages === null ||
        pages === '' ||
        price === null ||
        price === '' ||
        posterURL === ''
      ) {
        setStatusMessage('Please fill in all the fields.')
        return
      }
      setIsLoading(true)
      const data = newBookDetails
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
        `${process.env.REACT_APP_API_SERVER_BASE_URL}/api/editBookDetails`,
        // `http://127.0.0.1:3001/api/editBookDetails`,
        options,
      ).catch((err) => console.log(err))
      const serverResponseData = await serverResponse.json()
      console.log(serverResponseData)

      newBookDetails.bookId = serverResponseData.bookId
      setStatusMessage(serverResponseData.message)

      if (serverResponseData.success === true) {
        setTitle('')
        setAuthor('')
        setPages('')
        setPosterURL('')
        setPrice('')
      }

      fetchAllBooksData()
      setIsLoading(false)
    }
    editBookDetails()
  }
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
          <h2>Edit Book Details</h2>
        </div>
        <div
          className="homeBtn"
          style={{
            backgroundImage: `url(${homeSymbol})`,
          }}
        ></div>
      </div>
      <div className="newEntryFormHolder">
        <div
          className="posterPreview"
          style={{
            backgroundImage: `url(${posterURL})`,
          }}
        ></div>
        <div className="detailsInputHolder">
          <label htmlFor="bookTitleInput">Title</label>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            value={title}
          />

          <label htmlFor="authorInput">Author</label>
          <input
            type="text"
            onChange={(e) => {
              setAuthor(e.target.value)
            }}
            value={author}
          />

          <label htmlFor="pagesInput">Pages</label>
          <input
            type="number"
            onChange={(e) => {
              setPages(e.target.value)
            }}
            value={pages}
          />

          <label htmlFor="imageUrlInput">Image URL</label>
          <input
            type="text"
            onChange={(e) => {
              setPosterURL(e.target.value)
            }}
            value={posterURL}
          />

          <label htmlFor="priceInput">Price</label>
          <input
            type="number"
            onChange={(e) => {
              setPrice(e.target.value)
            }}
            value={price}
          />

          <div className="CTAsHolder">
            {isLoading ? (
              <CircularLoader />
            ) : (
              <button className="primaryCTA" onClick={uploadBookDetails}>
                EDIT
              </button>
            )}

            <Link to="library">
              <button className="secondaryCTA">Cancel</button>
            </Link>
          </div>
          <p className="statusMessage">{statusMessage}</p>
        </div>
      </div>
    </>
  )
}

export default EditBook
