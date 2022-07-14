function textReduce(text, allowedLength) {
  let returnValue = ''

  for (var i = 0; i < allowedLength; i++) {
    if (text[i]) {
      returnValue += text[i]
    } else {
      break
    }
  }

  if (allowedLength < text.length) {
    returnValue += '...'
  }
  return returnValue
}

export { textReduce }

async function isAuthenticated() {
  if (localStorage.getItem('authObject') === null) {
    return false
  }

  if (localStorage.getItem('authObject')) {
    const authObject = JSON.parse(localStorage.getItem('authObject'))
    return authObject.loggedIn
  }
}

export { isAuthenticated }

async function authenticate(username) {
  const authObject = {
    username: username,
    loggedIn: true,
  }

  localStorage.setItem('authObject', JSON.stringify(authObject))
}

export { authenticate }

async function unAuthenticate() {
  if (localStorage.getItem('authObject') === null) {
    return
  }

  if (localStorage.getItem('authObject')) {
    localStorage.removeItem('authObject')
  }
}

export { unAuthenticate }
