import { useState} from 'react'

function App(){
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false)
  function handleSearch(){
    setLoading(true)
    fetch(`/api/recipes?query=${query}`)
    .then(rec => rec.json())
    .then(rec => setRecipes(rec.message.results))
    .then(() => setLoading(false))
    .then(() => setSearched(true))
  }
  return(
  <div> 
    <input value={query} onChange={(e) => {setQuery(e.target.value)}}/>
    <button onClick={handleSearch}>Submit</button>
    {loading && <p>Loading...</p>}
    {recipes.map(e => (
        <div key = {e.id}>
          <h3 >{e.title}</h3> 
          <img src = {e.image} alt = {e.title}/>
        </div>
      ))}
    {searched && !loading && (recipes.length === 0) && <p>no items found</p>}
  </div>
      )}

export default App