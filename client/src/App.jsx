import { useState, useEffect } from 'react'

function App(){
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
    .then(mes => mes.json())
    .then(mes => setMessage(mes.message))

  }, [])
  return(
  <div> 
    <p>{message}</p>
  </div>
  )
}

export default App