import {Routes, Route, Link} from 'react-router-dom'
import Success from './Success.jsx'
import Cancel from './Cancel.jsx'
import Home from './Home.jsx'
import Cook from './Cook.jsx'
function App(){
  
  return(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/cook/:id" element = {<Cook />}  />
      </Routes>
      )}

export default App