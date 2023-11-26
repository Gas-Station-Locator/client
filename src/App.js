import React, { useState, useEffect } from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    /** 
        /api instead of 'http://localhost:5000' 
        relative route defined by proxy in package.json
    **/
    fetch("/api")
      .then((res) => res.json())
      .then((data) => { setBackendData(data) })
  }, [])

  return (
    <div>
      {(typeof backendData.users === "undefined") ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
    </div>
  )
}

export default App