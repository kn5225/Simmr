import {Routes, Route, Link} from 'react-router-dom'
import Success from './Success.jsx'
import Cancel from './Cancel.jsx'
import Home from './Home.jsx'

function App(){
  
  return(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      )}

export default App