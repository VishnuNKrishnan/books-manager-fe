import React, { useContext } from 'react'
import { UserContext } from '../../UserContext'
import './SingleBookCard.css'
import OpenBookSymbol from '../../uiAssets/open-book.png'

//Custom Functon to reduce the length of long strings
import { textReduce } from '../../utilities'
import { Link } from 'react-router-dom'

function SingleBookCard(props) {
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

  //Handling errors and missing fields
  const posterURL = props.posterURL ? props.posterURL : OpenBookSymbol
  const title = props.title ? textReduce(props.title, 20) : 'Title Unavailable'
  const author = props.author
    ? `By ${textReduce(props.author, 30)}`
    : 'Author Unknown'
  const pages = props.pages ? `${props.pages} Pages` : 'Total Pages: Unknown'
  const currency = props.price ? 'AED' : 'Contact Us for Price'
  const price = props.price ? props.price : ''

  //Delete Book Function - API Call
  async function deleteBook() {
    console.log(`${props.bookId}`)
    const data = { bookId: props.bookId }
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
      `${process.env.REACT_APP_API_SERVER_BASE_URL}/api/deleteBook`,
      // `http://127.0.0.1:3001/api/deleteBook`,
      options,
    ).catch((err) => console.log(err))
    const serverResponseData = await serverResponse.json()
    console.log(serverResponseData)
    fetchAllBooksData()
  }

  return (
    <div className="singleBookCard">
      <div
        className="poster"
        style={{
          backgroundImage: `url(${posterURL})`,
        }}
      ></div>
      <div className="details">
        <h3 className="bookTitle">{title}</h3>
        <p className="bookDetails">{author}</p>
        <p className="bookDetails">{pages}</p>
        <div className="actionsHolder">
          <Link to={`/edit?bookId=${props.bookId}`}>
            <div className="editBtn">
              <p>Edit</p>
            </div>
          </Link>
          <div className="deleteBtn" onClick={deleteBook}>
            <p>Delete</p>
          </div>
        </div>
      </div>
      <div className="priceHolder">
        <p className="currency">{currency}</p>
        <p className="price">{price}</p>
      </div>
    </div>
  )
}

export default SingleBookCard
