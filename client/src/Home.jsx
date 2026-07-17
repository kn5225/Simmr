import { useState} from 'react'
function Home(){
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [cart,setCart] = useState([]);
  const [addedRecipes,setAddedRecipes] = useState([]);
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
    .then(rec => setCart([...cart,...rec.message.map(e => ({...e, recipeId: recipeId}))]))
    setAddedRecipes([...addedRecipes, recipeId])
  }
  function handleRemoveFromCart(recipeId){
    setCart(cart.filter(ingredient => ingredient.recipeId!=recipeId))
    setAddedRecipes(addedRecipes.filter(recipe => recipe!=recipeId))

  }

  async function handleCheckout(){
    const url = `/api/checkout`
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cart: cart})
    })

    const result = await data.json();
    console.log('Success!!')
    window.location.href = result.url}




return(
<div> 
    <input value={query} onChange={(e) => {setQuery(e.target.value)}}/>
    <button onClick={handleSearch}>Submit</button>
    {loading && <p>Loading...</p>}
    {recipes.map(e => (
        <div key = {e.id}>
          <h3>{e.title}</h3> 
          <img src = {e.image} alt = {e.title}/>
          <button onClick={() => handleAddToCart(e.id)} disabled = 
          {addedRecipes.includes(e.id)}>Add to Cart</button>
          <button onClick={() => handleRemoveFromCart(e.id)} disabled = 
          {!addedRecipes.includes(e.id)}>Remove from Cart</button>

        </div>
      ))}
    {cart.map(ingredient => (
          <p key={ingredient.id}>{ingredient.original}</p> 
    ))}
    {searched && !loading && (recipes.length === 0) && <p>no items found</p>}
    {cart.length>0 && <button onClick= {handleCheckout} >Checkout</button>}
  </div>)}

  export default Home