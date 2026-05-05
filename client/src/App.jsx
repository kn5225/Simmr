import { useState} from 'react'

function App(){
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [cart,setCart] = useState([]);
  function handleSearch(){
    if (query.trim().length===0){return}
    setLoading(true)
    fetch(`/api/recipes?query=${query}`)
    .then(rec => rec.json())
    .then(rec => setRecipes(rec.message.results))
    .then(() => setLoading(false))
    .then(() => setSearched(true))
  }
  function handleAddToCart(recipeId){
    fetch(`/api/recipe/${recipeId}`)
    .then(rec => rec.json())
    .then(rec => setCart([...cart,...rec.message]))
  }
  return(
  <div> 
    <input value={query} onChange={(e) => {setQuery(e.target.value)}}/>
    <button onClick={handleSearch}>Submit</button>
    {loading && <p>Loading...</p>}
    {recipes.map(e => (
        <div key = {e.id}>
          <h3>{e.title}</h3> 
          <img src = {e.image} alt = {e.title}/>
          <button onClick={() => handleAddToCart(e.id)}>Add to Cart</button>
        </div>
      ))}
    {cart.map(ingredient => (
          <p key={ingredient.id}>{ingredient.original}</p> 
    ))}
    {searched && !loading && (recipes.length === 0) && <p>no items found</p>}
  </div>
      )}

export default App